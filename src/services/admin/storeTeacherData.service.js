import { supabase } from "../../lib/supabase.js";
import { mergeName } from "../../utils/mergeName.js";

export const storeTeacherDataService = async (dataObject) => {
    const teacherData = dataObject;

    try {
        const response = await supabase.from("data_guru").insert(teacherData).select();
        return response;
    } catch (error) {
        console.error("store teacher data service error:", error?.message || error);
        throw error;
    }
}