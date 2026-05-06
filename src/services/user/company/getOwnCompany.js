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

        const getCompanyIdQuery = await supabase
            .from("company_members")
            .select("company_id")
            .eq("user_id", identifier);

        if (getCompanyIdQuery.error) {
            console.error("Error fetching company ID:", getCompanyIdQuery.error);
            return;
        }

        const companyId = getCompanyIdQuery.data[0]?.company_id;

        if (!companyId) {
            console.error("No company found for the user.");
            return;
        }

        const getOwnCompanyQuery = await supabase
            .from("companies")
            .select("*")
            .eq("company_id", companyId);

        if (getOwnCompanyQuery.error) {
            console.error("Error fetching own company:", getOwnCompanyQuery.error);
            return;
        }

        return { getOwnCompanyQuery, companyId };
    } catch (error) {
        console.error("Error fetching own company:", error);
        throw new Error("Error fetching own company.");
    }
}