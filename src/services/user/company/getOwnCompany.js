import { getSupabaseWithAuth } from "../../../lib/supabaseWithAuth.js";

export async function getOwnCompanyService(identifier, accessToken) {
    if (!identifier) {
        console.error("Identifier is required to get own company.");
        throw new Error("Identifier is required to get own company.");
    };

    if (!accessToken) {
        console.error("Access token is required to get own company.");
        throw new Error("Access token is required to get own company.");
    }

    try {
        const supabase = getSupabaseWithAuth(accessToken);

        const getCompanyQuery = await supabase
            .from("companies")
            .select("*")
            .eq("owner_id", identifier);

        if (getCompanyQuery.error) {
            console.error("Error fetching own company:", getCompanyQuery.error);
            throw new Error("Error fetching own company.");
        }

        return getCompanyQuery;
    } catch (error) {
        console.error("Error fetching own company:", error);
        throw new Error("Error fetching own company.");
    }
}