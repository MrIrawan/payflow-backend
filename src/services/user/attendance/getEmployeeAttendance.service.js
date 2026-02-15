import { supabase } from "../../../lib/supabase.js";

export const getEmployeeAttendance = async (identifier) => {
    const teacherEmail = String(identifier);

    try {
        const isTeacherExist = await supabase
            .from("data_guru")
            .select("full_name")
            .eq("email_address", teacherEmail);

        if (isTeacherExist.data.length === 0) {
            return {
                success: false,
                messagae: "Gagal mendapatkan absensi, guru tidak ada atau tidak terdaftar."
            }
        }

        const teacherName = String(isTeacherExist.data[0].full_name);

        const attendanceResponse = await supabase
            .from("absensi")
            .select("*")
            .eq("teacher_name", teacherName);

        return { isTeacherExist, attendanceResponse };

    } catch (error) {
        const fetchError = error;
        return fetchError;
    }
}