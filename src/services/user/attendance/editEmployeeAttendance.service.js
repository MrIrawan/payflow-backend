import { supabase } from "../../../lib/supabase.js";
import { formatTime } from "../../../utils/formatTime.js";

export const editEmployeeAttendance = async (identifier, data) => {
    const teacherName = String(identifier).toLocaleLowerCase();
    const updateData = data;

    try {
        const isTeacherExist = await supabase
            .from("data_guru")
            .select("full_name")
            .eq("full_name", teacherName);

        if (isTeacherExist.data.length === 0) {
            return {
                success: false,
                message: "Gagal edit absensi, guru tidak terdaftar."
            };
        }

        if (updateData.checkin_time && updateData.checkout_time) {
            updateData.checkin_time = formatTime(updateData.checkin_time);
            updateData.checkout_time = formatTime(updateData.checkout_time);
        } else {
            delete updateData.checkin_time;
            delete updateData.checkout_time
        };

        const response = await supabase
            .from("absensi")
            .update(updateData)
            .eq("teacher_name", teacherName);

        return { isTeacherExist, response };
    } catch (error) {
        const fetchError = error;
        return fetchError;
    }
}