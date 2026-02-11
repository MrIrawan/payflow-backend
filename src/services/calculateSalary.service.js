import { supabase } from "../lib/supabase.js"

export const calculateSalaryService = async (identifier, data) => {
    const RATE_PER_JP = 25000;
    const TRANSPORT_PER_DAY = 45000;
    const monthString = String(data.month).padStart(2, '0'); // Format '01', '02', dst.
    const currentDate = new Date().toLocaleDateString().replaceAll("/", "-");

    // 1. Ambil data nama guru dari data_guru
    const { data: teacher, error: tError } = await supabase
        .from('data_guru')
        .select('*')
        .eq('email_address', identifier)
        .single();

    if (tError || !teacher) throw new Error("Guru tidak ditemukan");

    // 2. Hitung total kehadiran dari tabel absensi berdasarkan Nama & Bulan
    const { data: attendance, error: aError, count } = await supabase
        .from('absensi')
        .select('*', { count: 'exact' })
        .eq('teacher_name', teacher.full_name)
        .eq('attendance_status', 'present') // Pastikan case-sensitive sesuai Enum kamu
        .gte('attendance_date', `${data.year}-${monthString}-01`)
        .lte('attendance_date', currentDate);

    if (aError) throw new Error("Gagal mengambil data absensi: " + aError.message);

    // 3. Kalkulasi Rumus
    const teachingSalary = (RATE_PER_JP * data.totalWeeklyHours) * 4;
    const transportSalary = TRANSPORT_PER_DAY * (count || 0);
    const totalSalary = teachingSalary + transportSalary;

    // 4. Simpan ke payroll_history
    const { data: history, error: hError } = await supabase
        .from('payroll_history')
        .insert([{
            teacher_id: teacher.guru_id,
            teacher_name: teacher.full_name,
            total_weekly_hours: data.totalWeeklyHours,
            total_hadir: count || 0,
            teaching_salary: teachingSalary,
            transport_salary: transportSalary,
            total_salary: totalSalary,
            period_month: data.month,
            period_year: data.year
        }]).select().single();

    if (hError) throw new Error("Gagal simpan history: " + hError.message);

    // 5. Simpan/Update ke laporan_penggajian
    await supabase.from('laporan_penggajian').insert([{
        guru_id: teacher.guru_id,
        gaji_pokok: teachingSalary,
        total_tunjangan: transportSalary,
        total_potongan: 0,
        gaji_bersih: totalSalary
    }]);

    return history;
};