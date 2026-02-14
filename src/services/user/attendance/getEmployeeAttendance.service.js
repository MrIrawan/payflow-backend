import { supabase } from "../../../lib/supabase.js";

export const getEmployeeAttendance = async (identifier) => {
    const teacherName = String(identifier).toLocaleLowerCase();

    try {
        const response = await supabase
            .from("absensi")
            .select("*")
            .eq("teacher_name", teacherName);

        return response;
    } catch (error) {
        const fetchError = error;
        return fetchError;
    }
}