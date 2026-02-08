import { supabase } from "../../../lib/supabase.js";

/**
 * Build attendance chart data for admin
 * @param {Object} params
 * @param {number=} params.month (1-12)
 * @param {number=} params.year
 */
export const getAttendanceChartService = async ({ month, year }) => {
    const now = new Date();

    const targetMonth = month ?? now.getMonth() + 1; // 1-12
    const targetYear = year ?? now.getFullYear();

    // range tanggal
    const startDate = new Date(targetYear, targetMonth - 1, 1);
    const endDate = new Date(targetYear, targetMonth, 0, 23, 59, 59);

    const { data, error } = await supabase
        .from("absensi")
        .select("attendance_status, attendance_date")
        .gte("attendance_date", startDate.toISOString())
        .lte("attendance_date", endDate.toISOString());

    if (error) {
        console.error("getAttendanceChartService error:", error);
        throw error;
    }

    // ============================
    // INIT PAYLOAD (12 BULAN)
    // ============================
    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const chartData = Array.from({ length: 12 }, (_, i) => ({
        month: monthNames[i],
        present: 0,
        absent: 0,
        onLeave: 0
    }));

    // ============================
    // TRANSFORM DATA
    // ============================
    for (const row of data) {
        const date = new Date(row.attendance_date);
        const monthIndex = date.getMonth(); // 0-11

        if (row.attendance_status === "present") chartData[monthIndex].present += 1;
        if (row.attendance_status === "absent") chartData[monthIndex].absent += 1;
        if (row.attendance_status === "onLeave") chartData[monthIndex].onLeave += 1;
    }

    return {
        month: targetMonth,
        year: targetYear,
        data: chartData
    };
};
