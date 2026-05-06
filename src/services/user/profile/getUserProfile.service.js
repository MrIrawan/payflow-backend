import { getSupabaseWithAuth } from "../../../lib/supabaseWithAuth.js";

export const getUserProfileService = async (identifier, accessToken, companyId) => {
    if (!identifier) {
        throw new Error("Identifier is required");
    }

    const supabase = getSupabaseWithAuth(accessToken);

    try {
        const userProfileQuery = await supabase
            .from("employees")
            .select("*")
            .eq("user_id", identifier)
            .single();

        console.log("userProfileQuery:", userProfileQuery);

        if (userProfileQuery.error) {
            console.error("Error fetching user profile:", userProfileQuery.error);
            throw new Error("Failed to fetch user profile");
        }

        const getOwnCompanyQuery = await supabase
            .from("companies")
            .select("company_name")
            .eq("company_id", companyId)
            .single();

        console.log("getOwnCompanyQuery:", getOwnCompanyQuery);

        if (getOwnCompanyQuery.error) {
            console.error("Error fetching company name:", getOwnCompanyQuery.error);
            throw new Error("Failed to fetch company name");
        }

        return { userProfileQuery, getOwnCompanyQuery };
    } catch (error) {
        console.error("Error fetching user profile:", error);
        throw new Error("Failed to fetch user profile");
    }
};