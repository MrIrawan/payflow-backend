import { supabase } from "../../../lib/supabase.js";

export async function editUserProfileService(identifier, data) {
    if (!identifier) {
        throw new Error("User identifier is required.");
    }

    if (!data || Object.keys(data).length === 0) {
        throw new Error("No data provided for update.");
    }

    try {
        const editUserProfileQuery = await supabase
            .from("employees")
            .update(data)
            .eq("user_id", identifier)
            .select("*")
            .single();

        if (editUserProfileQuery.error) {
            throw new Error("Failed to update user profile.");
        }

        return editUserProfileQuery;
    } catch (error) {
        console.error("Error updating user profile:", error);
        throw new Error("Failed to update user profile.");
    }
}