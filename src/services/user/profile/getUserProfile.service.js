import { supabase } from "../../../lib/supabase.js";

export const getUserProfileService = async (teacherEmail) => {
    // fetch employee profile data
    const employeeProfile = await supabase
        .from("data_guru")
        .select("*")
        .eq("email_address", teacherEmail);

    return {
        employeeProfile
    }
};