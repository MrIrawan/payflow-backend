import { supabase } from "../../../lib/supabase.js";

import { formatDate } from "../../../utils/formatDate.js";
import { formatTime } from "../../../utils/formatTime.js";

export const storeEmployeeAttendanceService = async (data) => {
    const attendanceData = data;

    try {
        const teacherName = String(attendanceData.teacher_name);

        const isTeacherExist = await supabase
            .from("data_guru")
            .select("full_name")
            .eq("full_name", teacherName);

        if (isTeacherExist.data.length === 0) {
            return {
                success: false,
                message: "Gagal membuat absensi, guru tidak di temukan atau tidak terdaftar."
            }
        }

        const attendanceResponse = await supabase
            .from("absensi")
            .insert({
                ...attendanceData,
                attendance_date: formatDate(attendanceData.attendance_date),
                checkin_time: formatTime(attendanceData.checkin_time),
                checkout_time: formatTime(attendanceData.checkout_time)
            })
            .select();

        return {
            attendanceResponse,
            isTeacherExist
        }
    } catch (error) {
        const fetchError = error;
        return fetchError;
    }
}