import { supabase } from "../lib/supabase.js";

// Helper: Hitung hari kerja dalam satu bulan (Senin-Jumat)
const getWorkingDaysInMonth = (year, month) => {
    let day = new Date(year, month, 1);
    let days = 0;
    while (day.getMonth() === month) {
        const dayOfWeek = day.getDay();
        if (dayOfWeek !== 0 && dayOfWeek !== 6) days++; // Skip Sabtu Minggu
        day.setDate(day.getDate() + 1);
    }
    return days;
};

export const calculateRealTimeSalary = async (userId) => {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
    const endOfToday = new Date().toISOString();

    // 1. Ambil Data Guru & Gaji Pokok
    const { data: user, error: userError } = await supabase
        .from("users")
        .select("full_name, base_salary, job_title")
        .eq("id", userId)
        .single();

    if (userError || !user) throw new Error("User not found");

    // 2. Hitung Absensi (Hadir dari tgl 1 s/d Sekarang)
    const { count: attendanceCount, error: attError } = await supabase
        .from("attendance")
        .select("*", { count: "exact", head: true })
        .eq("user_id", userId)
        .eq("status", "present")
        .gte("date", startOfMonth)
        .lte("date", endOfToday);

    // 3. Kalkulasi Real-time
    // Asumsi: Gaji Pokok dibagi Total Hari Kerja Bulan Ini, dikali kehadiran saat ini
    const totalWorkingDays = getWorkingDaysInMonth(now.getFullYear(), now.getMonth());
    const dailyRate = user.base_salary / totalWorkingDays;

    // Gaji yang terkumpul saat ini
    const currentSalary = Math.round(dailyRate * (attendanceCount || 0));

    // 4. Cek Status Kesiapan Cetak (Misal: Tanggal > 25)
    const isReadyToPrint = now.getDate() >= 25;

    return {
        user: {
            name: user.full_name,
            role: user.job_title,
        },
        period: {
            month: now.toLocaleString('default', { month: 'long' }),
            year: now.getFullYear()
        },
        calculation: {
            base_salary: user.base_salary,
            daily_rate: Math.round(dailyRate),
            days_worked: attendanceCount || 0,
            total_working_days: totalWorkingDays,
            current_total: currentSalary,
        },
        status: {
            is_ready: isReadyToPrint, // Untuk trigger notifikasi/tombol cetak
            countdown_target: new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString() // Akhir bulan
        }
    };
};