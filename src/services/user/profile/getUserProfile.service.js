import { supabase } from "../../../lib/supabase.js";

export const getUserProfileService = async (teacherEmail) => {
    const now = new Date();
    const month = now.getMonth() + 1;
    const year = now.getFullYear();

    /* =============================
       1. GET PROFILE
    ============================= */
    const { data: profile, error: profileError } = await supabase
        .from("data_guru")
        .select("*")
        .eq("email_address", teacherEmail)
        .single();

    if (profileError) throw profileError;

    /* =============================
       2. GET ATTENDANCE (MONTH)
    ============================= */
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0, 23, 59, 59);
    const teacherName = profile.full_name;

    const { data: attendanceData, error: attendanceError } = await supabase
        .from("absensi")
        .select("attendance_status, attendance_date")
        .eq("teacher_name", teacherName)
        .gte("attendance_date", startDate.toISOString())
        .lte("attendance_date", endDate.toISOString());

    if (attendanceError) throw attendanceError;

    let present = 0;
    let absent = 0;
    let onLeave = 0;

    attendanceData.forEach((a) => {
        if (a.status === "present") present++;
        if (a.status === "absent") absent++;
        if (a.status === "onLeave") onLeave++;
    });

    /* =============================
        3. ATTENDANCE CHART (YEAR)
     ============================= */
    const chart = Array.from({ length: 12 }, (_, i) => ({
        month: i + 1,
        present: 0,
        absent: 0,
        onLeave: 0,
    }));

    const { data: yearlyAttendance } = await supabase
        .from("absensi")
        .select("attendance_status, attendance_date")
        .eq("teacher_name", teacherName)
        .gte("attendance_date", new Date(year, 0, 1).toISOString())
        .lte("attendance_date", new Date(year, 11, 31).toISOString());

    yearlyAttendance?.forEach((row) => {
        const m = new Date(row.attendance_date).getMonth();
        if (row.status === "present") chart[m].present++;
        if (row.status === "absent") chart[m].absent++;
        if (row.status === "onLeave") chart[m].onLeave++;
    });

    /* =============================
        4. SALARY CALCULATION (SERVER)
     ============================= */
    const BASE_SALARY = 3_000_000; // contoh
    const DAILY_RATE = BASE_SALARY / 22;

    const attendanceBonus = present * DAILY_RATE;
    const deduction = absent * DAILY_RATE;

    const estimatedSalary = BASE_SALARY + attendanceBonus - deduction;

    return {
        profile,

        attendanceSummary: {
            month,
            year,
            present,
            absent,
            onLeave,
        },

        attendanceChart: chart,

        salary: {
            base_salary: BASE_SALARY,
            attendance_bonus: attendanceBonus,
            deduction,
            estimated_salary: estimatedSalary,
            last_updated: new Date().toISOString(),
        },
    };
};
