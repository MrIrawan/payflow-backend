import { supabase } from "../../../lib/supabase.js";

export const getUserInfoService = async (identifier) => {
    const userEmail = String(identifier);

    const userProfile = await supabase
        .from("data_guru")
        .select("*")
        .eq("email_address", userEmail)
        .single();

    const userName = userProfile.data.full_name;

    const userAttendance = await supabase
        .from("absensi")
        .select("*")
        .eq("teacher_name", userName).single();

    return { userProfile, userAttendance };
}