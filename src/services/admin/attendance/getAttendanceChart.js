import { supabase } from "../../../lib/supabase.js";

/**
 * Build attendance chart data for admin
 * @param {Object} params
 * @param {number=} params.month (1-12)
 * @param {number=} params.year
 */
export const getAttendanceChartService = async ({ month, year }) => {
    const now = new Date();
    const currentMonth = now.getMonth() + 1; // 1-12
    const currentYear = now.getFullYear();

    const targetMonth = month ?? null;
    const targetYear = year ?? currentYear;

    let startDate;
    let endDate;
    let chartMode; // "monthly" | "yearly"

    /* ============================
       DETERMINE MODE
    ============================ */
    if (targetMonth && year) {
        // bulan + tahun → 1 bulan
        chartMode = "monthly";
        startDate = new Date(targetYear, targetMonth - 1, 1);
        endDate = new Date(targetYear, targetMonth, 0, 23, 59, 59);

    } else if (targetMonth && !year) {
        // bulan saja → 1 bulan tahun sekarang
        chartMode = "monthly";
        startDate = new Date(currentYear, targetMonth - 1, 1);
        endDate = new Date(currentYear, targetMonth, 0, 23, 59, 59);

    } else {
        // tidak ada bulan ATAU hanya tahun → 12 bulan
        chartMode = "yearly";
        startDate = new Date(targetYear, 0, 1);
        endDate = new Date(targetYear, 11, 31, 23, 59, 59);
    }

    /* ============================
       FETCH RAW DATA
    ============================ */
    const { data, error } = await supabase
        .from("absensi")
        .select("attendance_status, attendance_date")
        .gte("attendance_date", startDate.toISOString())
        .lte("attendance_date", endDate.toISOString());

    if (error) throw error;

    /* ============================
       BUILD CHART PAYLOAD
    ============================ */
    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    let chartData;

    if (chartMode === "monthly") {
        chartData = [{
            month: monthNames[(targetMonth ?? currentMonth) - 1],
            present: 0,
            absent: 0,
            onLeave: 0
        }];
    } else {
        chartData = Array.from({ length: 12 }, (_, i) => ({
            month: monthNames[i],
            present: 0,
            absent: 0,
            onLeave: 0
        }));
    }

    /* ============================
       TRANSFORM DATA
    ============================ */
    for (const row of data) {
        const date = new Date(row.attendance_date);
        const monthIndex = date.getMonth();

        if (chartMode === "monthly") {
            if (row.attendance_status === "present") chartData[0].present++;
            if (row.attendance_status === "absent") chartData[0].absent++;
            if (row.attendance_status === "onLeave") chartData[0].onLeave++;
        } else {
            if (row.attendance_status === "present") chartData[monthIndex].present++;
            if (row.attendance_status === "absent") chartData[monthIndex].absent++;
            if (row.attendance_status === "onLeave") chartData[monthIndex].onLeave++;
        }
    }

    return {
        mode: chartMode,
        month: chartMode === "monthly" ? (targetMonth ?? currentMonth) : null,
        year: targetYear,
        data: chartData
    };
};
