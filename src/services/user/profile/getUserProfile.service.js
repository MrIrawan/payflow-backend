import { supabase } from "../../../lib/supabase.js";

export const getUserProfileService = async (identifier) => {
    if (!identifier) {
        throw new Error("Identifier is required");
    }

    try {
        const userProfileQuery = await supabase
            .from("employees")
            .select("*")
            .eq("user_id", identifier);

        if (userProfileQuery.error) {
            console.error("Error fetching user profile:", userProfileQuery.error);
            throw new Error("Failed to fetch user profile");
        }

        return userProfileQuery
    } catch (error) {
        console.error("Error fetching user profile:", error);
        throw new Error("Failed to fetch user profile");
    }
};