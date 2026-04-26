import { supabase } from "../../../lib/supabase.js";

export async function getOwnCompanyService(identifier) {
    if (!identifier) {
        console.error("Identifier is required to get own company.");
        throw new Error("Identifier is required to get own company.");
    };

    try {
        const companyQuery = await supabase.from("companies").select("*").eq("owner_id", identifier).single();

        if (companyQuery.error) {
            console.error("Error fetching own company:", companyQuery.error);
            throw new Error("Error fetching own company.");
        }

        return companyQuery;
    } catch (error) {
        console.error("Error fetching own company:", error);
        throw new Error("Error fetching own company.");
    }
}