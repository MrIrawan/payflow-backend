import { supabase } from "../../../lib/supabase.js";

export async function editUserProfileService(identifier, data) {
    const teacherEmail = identifier;
    const updateData = data;

    console.log(data)

    // update teacher service
    const response = await supabase
        .from("data_guru")
        .update(updateData)
        .eq("email_address", teacherEmail)
        .select("*")
        .single();

    return response;
}