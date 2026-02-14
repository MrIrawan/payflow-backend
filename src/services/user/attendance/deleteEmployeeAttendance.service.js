import { supabase } from "../../../lib/supabase.js";

export const deleteEmployeeAttendance = async (identifier) => {
    const attendanceId = identifier;

    try {
        const response = await supabase
            .from("absensi")
            .delete()
            .eq("attendance_id", attendanceId);

        return response;
    } catch (error) {
        const fetchError = error;
        return fetchError;
    }
};