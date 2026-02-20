import { supabase } from "../../../lib/supabase.js";

export const getUserProfileService = async (teacherEmail) => {
    // fetch user profile data
    const userProfile = await supabase
        .from("data_guru")
        .select("*")
        .eq("email_address", teacherEmail)
        .single();

    return userProfile
};