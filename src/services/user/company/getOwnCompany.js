import { supabase } from "../../../lib/supabase.js";

export async function getOwnCompanyService(identifier) {
    if (!identifier) {
        console.error("Identifier is required to get own company.");
        throw new Error("Identifier is required to get own company.");
    };

    try {
        const getCompanyQuery = await supabase.from("companies").select("*").eq("owner_id", identifier).single();

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