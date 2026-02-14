import { supabase } from "../../../lib/supabase.js";

// Helper untuk menghitung hari kerja (Senin-Jumat) dalam bulan ini
const getWorkingDaysInMonth = (year, month) => {
    let day = new Date(year, month - 1, 1);
    const lastDay = new Date(year, month, 0);
    let days = 0;
    while (day <= lastDay) {
        const dayOfWeek = day.getDay();
        if (dayOfWeek !== 0 && dayOfWeek !== 6) days++; // Skip Minggu (0) & Sabtu (6)
        day.setDate(day.getDate() + 1);
    }
    return days;
};

export const getUserProfileService = async (teacherEmail) => {
    const now = new Date();
    const month = now.getMonth() + 1;
    const year = now.getFullYear();

    /* =============================
       1. GET PROFILE (SAFE MODE)
    ============================= */
    // Menggunakan limit(1) dan single() dengan handling error manual
    const { data: profileList, error: profileError } = await supabase
        .from("data_guru")
        .select("*")
        .eq("email_address", teacherEmail)
        .limit(1);

    if (profileError) throw new Error(`Database error: ${profileError.message}`);

    // Jika user tidak ditemukan di tabel data_guru
    if (!profileList || profileList.length === 0) {
        throw new Error("User profile not found. Please contact admin.");
    }

    const profile = profileList[0];
    const teacherName = profile.full_name;

    /* =============================
       2. GET ATTENDANCE (MONTHLY)
    ============================= */
    // Format tanggal ISO string untuk filter
    const startOfMonth = new Date(year, month - 1, 1).toISOString();
    // Akhir bulan (hari terakhir jam 23:59:59)
    const endOfMonth = new Date(year, month, 0, 23, 59, 59).toISOString();

    const { data: attendanceData, error: attendanceError } = await supabase
        .from("absensi")
        .select("status, attendance_date") // Pastikan nama kolom 'status' benar
        .eq("teacher_name", teacherName)
        .gte("attendance_date", startOfMonth)
        .lte("attendance_date", endOfMonth);

    if (attendanceError) throw new Error(`Attendance error: ${attendanceError.message}`);

    let present = 0;
    let absent = 0;
    let onLeave = 0; // Izin/Sakit

    if (attendanceData) {
        attendanceData.forEach((a) => {
            // Normalisasi status (lowercase biar aman)
            const status = a.status?.toLowerCase();
            if (status === "present" || status === "hadir") present++;
            else if (status === "absent" || status === "alpa") absent++;
            else if (status === "onleave" || status === "izin" || status === "sakit") onLeave++;
        });
    }

    /* =============================
       3. ATTENDANCE CHART (YEARLY)
    ============================= */
    const chart = Array.from({ length: 12 }, (_, i) => ({
        month: i + 1,
        present: 0,
        absent: 0,
        onLeave: 0,
    }));

    // Awal tahun dan akhir tahun ini
    const startOfYear = new Date(year, 0, 1).toISOString();
    const endOfYear = new Date(year, 11, 31, 23, 59, 59).toISOString();

    const { data: yearlyAttendance } = await supabase
        .from("absensi")
        .select("status, attendance_date")
        .eq("teacher_name", teacherName)
        .gte("attendance_date", startOfYear)
        .lte("attendance_date", endOfYear);

    if (yearlyAttendance) {
        yearlyAttendance.forEach((row) => {
            const dateObj = new Date(row.attendance_date);
            const m = dateObj.getMonth(); // 0-11
            const status = row.status?.toLowerCase();

            if (status === "present" || status === "hadir") chart[m].present++;
            else if (status === "absent" || status === "alpa") chart[m].absent++;
            else if (status === "onleave" || status === "izin" || status === "sakit") chart[m].onLeave++;
        });
    }

    /* =============================
       4. REAL-TIME SALARY CALCULATION
    ============================= */
    // Ambil Gaji Pokok dari Database. Jika null, default ke 0 atau nilai standar
    const BASE_SALARY = Number(profile.base_salary) || 0;

    // Hitung hari kerja efektif bulan ini
    const totalWorkingDays = getWorkingDaysInMonth(year, month);

    // Rate Harian = Gaji Pokok / Total Hari Kerja
    // Cegah pembagian dengan 0
    const dailyRate = totalWorkingDays > 0 ? Math.round(BASE_SALARY / totalWorkingDays) : 0;

    // Gaji saat ini (Real-time) = Rate Harian * Jumlah Hadir
    const currentSalary = dailyRate * present;

    // Estimasi Gaji Akhir Bulan (Jika masuk terus sisanya)
    // Sisa hari kerja = Total Hari Kerja - (Hadir + Absen + Izin)
    // Tapi biasanya estimasi gaji itu Gaji Pokok - Potongan.
    // Kita pakai logic: Gaji Pokok dikurangi ketidakhadiran (jika ada kebijakan potong gaji)
    // Atau logic simple: Gaji Pokok + Tunjangan Kehadiran (jika ada).

    // Mari kita pakai logic: Akumulasi Kehadiran (Sesuai request 'Real Time')
    const calculatedSalary = currentSalary;

    return {
        profile,
        attendanceSummary: {
            month,
            year,
            present,
            absent,
            onLeave,
            total_working_days: totalWorkingDays
        },
        attendanceChart: chart,
        salary: {
            base_salary: BASE_SALARY,
            daily_rate: dailyRate,
            current_realtime_salary: calculatedSalary, // Ini yang ditampilkan "Rp..."
            currency: "IDR"
        },
    };
};