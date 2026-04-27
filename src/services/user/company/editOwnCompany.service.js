import { supabase } from "../../../lib/supabase.js";

export async function editOwnCompanyService(identifier, data) {
    if (!identifier) {
        console.error("Identifier is required to edit own company.");
        throw new Error("Identifier is required to edit own company.");
    }

    if (!data) {
        console.error("Data is required to edit own company.");
        throw new Error("Data is required to edit own company.");
    }

    try {
        const editCompanyQuery = await supabase
            .from("companies")
            .update(data)
            .eq("owner_id", identifier);

        if (editCompanyQuery.error) {
            console.error("Error editing own company:", editCompanyQuery.error);
            throw new Error("Error editing own company.");
        }

        return editCompanyQuery;
    } catch (error) {
        console.error("Error editing own company:", error);
        throw new Error("Error editing own company.");
    }
}