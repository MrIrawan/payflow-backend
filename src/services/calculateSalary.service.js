import { supabase } from "../lib/supabase.js"

export const calculateSalaryService = async (identifier) => {
    const RATE_PER_JP = 25000;
    const TRANSPORT_PER_DAY = 45000;
    const monthString = String(identifier.month).padStart(2, '0'); // Format '01', '02', dst.
    const currentDate = new Date().toLocaleDateString().replaceAll("/", "-");

    // 1. Ambil data nama guru dari data_guru
    const { data: teacher, error: tError } = await supabase
        .from('data_guru')
        .select('full_name')
        .eq('guru_id', identifier.teacherId)
        .single();

    if (tError || !teacher) throw new Error("Guru tidak ditemukan");

    // 2. Hitung total kehadiran dari tabel absensi berdasarkan Nama & Bulan
    const { data: attendance, error: aError, count } = await supabase
        .from('absensi')
        .select('*', { count: 'exact' })
        .eq('teacher_name', teacher.full_name)
        .eq('attendance_status', 'present') // Pastikan case-sensitive sesuai Enum kamu
        .gte('attendance_date', `${identifier.year}-${monthString}-01`)
        .lte('attendance_date', currentDate);

    if (aError) throw new Error("Gagal mengambil data absensi: " + aError.message);

    // 3. Kalkulasi Rumus
    const teachingSalary = (RATE_PER_JP * identifier.totalWeeklyHours) * 4;
    const transportSalary = TRANSPORT_PER_DAY * (count || 0);
    const totalSalary = teachingSalary + transportSalary;

    // 4. Simpan ke payroll_history
    const { data: history, error: hError } = await supabase
        .from('payroll_history')
        .insert([{
            teacher_id: identifier.teacherId,
            teacher_name: teacher.full_name,
            total_weekly_hours: identifier.totalWeeklyHours,
            total_hadir: count || 0,
            teaching_salary: teachingSalary,
            transport_salary: transportSalary,
            total_salary: totalSalary,
            period_month: identifier.month,
            period_year: identifier.year
        }]).select().single();

    if (hError) throw new Error("Gagal simpan history: " + hError.message);

    // 5. Simpan/Update ke laporan_penggajian
    await supabase.from('laporan_penggajian').insert([{
        guru_id: identifier.teacherId,
        gaji_pokok: teachingSalary,
        total_tunjangan: transportSalary,
        total_potongan: 0,
        gaji_bersih: totalSalary
    }]);

    return history;
};