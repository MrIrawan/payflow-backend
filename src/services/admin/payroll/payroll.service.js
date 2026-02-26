import { supabase } from '../../../lib/supabase.js';

const DAILY_BASE_SALARY = parseInt(process.env.DAILY_BASE_SALARY || '2500000');
const DAILY_TRANSPORT = parseInt(process.env.DAILY_TRANSPORT || '45000');

export const getPayrollPreviewService = async (month, year) => {
    // STEP 1: Setup rentang tanggal pencarian
    const startDate = `${year}-${String(month).padStart(2, '0')}-01`;
    const lastDay = new Date(year, month, 0).getDate();
    const endDate = `${year}-${String(month).padStart(2, '0')}-${lastDay}`;

    // STEP 2: Tarik data Master Guru
    const { data: teachers, error: errTeachers } = await supabase
        .from('data_guru')
        .select('guru_id, full_name');
    if (errTeachers) throw errTeachers;

    // STEP 3: Tarik data Absensi bulan ini (Tanpa filter status di DB)
    // Kita ambil kolom teacher_name dan attendance_status
    const { data: attendances, error: errAttendances } = await supabase
        .from('absensi')
        .select('teacher_name, attendance_status')
        .gte('attendance_date', startDate)
        .lte('attendance_date', endDate);
    if (errAttendances) throw errAttendances;

    // STEP 4: Kalkulasi Gaji & Filter Ganda
    const payrollPreview = teachers.map((teacher) => {

        // INI BAGIAN PENTINGNYA: Kita filter berdasarkan 2 kondisi
        const total_hadir = attendances.filter(a =>
            a.teacher_name === teacher.full_name &&
            a.attendance_status === 'present' // Cek langsung nilai enum-nya di sini
        ).length;

        // Hitung nominal uang berdasarkan total kehadiran valid
        const teaching_salary = Number(total_hadir) * Number(DAILY_BASE_SALARY);
        const transport_salary = Number(total_hadir) * Number(DAILY_TRANSPORT);
        const total_salary = Number(teaching_salary) + Number(transport_salary);

        return {
            teacher_id: teacher.guru_id,
            teacher_name: teacher.full_name,
            total_hadir,
            teaching_salary,
            transport_salary,
            total_salary
        };
    });

    // STEP 5: Sembunyikan guru yang kehadirannya 0 (Opsional agar tabel bersih)
    return payrollPreview.filter(p => p.total_hadir > 0);
};

export const generatePayrollService = async (month, year) => {
    // 1. Validasi: Cek apakah bulan dan tahun ini sudah di-generate sebelumnya
    // Menggunakan period_month dan period_year sesuai skema database kamu
    const { data: existing } = await supabase
        .from('payroll_history')
        .select('payroll_id')
        .eq('period_month', parseInt(month))
        .eq('period_year', parseInt(year))
        .limit(1)
        .single();

    if (existing) {
        throw new Error("Gagal: Penggajian untuk bulan ini sudah pernah dikunci!");
    }

    // 2. Ambil data kalkulasi berjalan dari fungsi preview yang sudah fix tadi
    const payrollData = await getPayrollPreviewService(month, year);

    if (payrollData.length === 0) {
        throw new Error("Tidak ada data kehadiran yang valid untuk di-generate bulan ini.");
    }

    // 3. Mapping data agar sesuai dengan persis kolom tabel payroll_history kamu
    const insertData = payrollData.map(data => ({
        teacher_id: data.teacher_id,
        teacher_name: data.teacher_name,
        total_weekly_hours: 0, // Fallback angka 0 krn di DB tipe numeric
        total_hadir: data.total_hadir,
        bonus_tambahan: 0,     // Fallback angka 0
        teaching_salary: data.teaching_salary,
        transport_salary: data.transport_salary,
        total_salary: data.total_salary,
        period_month: parseInt(month),
        period_year: parseInt(year)
    }));

    // 4. Eksekusi simpan (kunci) ke database secara massal (Bulk Insert)
    const { error: errInsert } = await supabase
        .from('payroll_history')
        .insert(insertData);

    if (errInsert) throw errInsert;

    return { message: "Slip gaji berhasil di-generate dan dikunci ke database!" };
};

// Fungsi tambahan untuk mengambil Arsip / History
export const getPayrollHistoryService = async (month, year) => {
    const { data: history, error } = await supabase
        .from('payroll_history')
        .select('*')
        .eq('period_month', parseInt(month))
        .eq('period_year', parseInt(year))
        .order('teacher_name', { ascending: true }); // Urutkan berdasarkan nama

    if (error) throw error;

    return history;
};