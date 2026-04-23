import { supabase } from '../../../lib/supabase.js';

const DAILY_BASE_SALARY = parseInt(process.env.DAILY_BASE_SALARY || '25000');
const DAILY_TRANSPORT = parseInt(process.env.DAILY_TRANSPORT || '45000');

export const getUserPayrollLiveService = async (teacher_id, month, year) => {
    // STEP 1: Setup rentang tanggal pencarian dalam bulan tersebut
    const startDate = `${year}-${String(month).padStart(2, '0')}-01`;
    const lastDay = new Date(year, month, 0).getDate();
    const endDate = `${year}-${String(month).padStart(2, '0')}-${lastDay}`;

    // STEP 2: Cari profil guru (Termasuk total_weekly_hours untuk rumus baru)
    const { data: teacher, error: errTeacher } = await supabase
        .from('data_guru')
        .select('full_name, total_weekly_hours')
        .eq('guru_id', teacher_id)
        .single();

    if (errTeacher || !teacher) throw new Error("Data guru tidak ditemukan.");

    // STEP 3: Tarik seluruh data absensi milik guru tersebut di bulan ini
    const { data: attendances, error: errAttendances } = await supabase
        .from('absensi')
        .select('attendance_status')
        .eq('teacher_name', teacher.full_name) // Wajib sama dengan nama lengkapnya
        .gte('attendance_date', startDate)
        .lte('attendance_date', endDate);

    if (errAttendances) throw errAttendances;

    // STEP 4: Kalkulasi dengan Rumus Baru
    // 1. Hitung total kehadiran (Hanya yang berstatus 'present')
    const total_hadir = attendances.filter(a => a.attendance_status === 'present').length;

    // 2. Ambil total jam ajar, pastikan berupa angka (fallback 0 jika kosong)
    const total_jam_ajar = Number(teacher.total_weekly_hours) || 0;

    // 3. Eksekusi Rumus
    const teaching_salary = total_jam_ajar * DAILY_BASE_SALARY;
    const transport_salary = total_hadir * DAILY_TRANSPORT;
    const total_salary = teaching_salary + transport_salary;

    // STEP 5: Kembalikan objek data yang sudah dihitung matang ke frontend
    return {
        teacher_id,
        teacher_name: teacher.full_name,
        period_month: parseInt(month),
        period_year: parseInt(year),
        total_weekly_hours: total_jam_ajar,
        total_hadir,
        teaching_salary,
        transport_salary,
        total_salary
    };
};

export const getUserPayrollHistoryService = async (teacher_id, year) => {
    // STEP 1: Tarik arsip data slip gaji khusus untuk ID guru ini pada tahun tertentu
    const { data: history, error } = await supabase
        .from('payroll_history')
        .select('*')
        .eq('teacher_id', teacher_id)
        .eq('period_year', parseInt(year))
        .order('period_month', { ascending: false }); // Urutkan dari bulan terbaru

    if (error) throw error;

    // Kembalikan langsung data history-nya
    return history;
};