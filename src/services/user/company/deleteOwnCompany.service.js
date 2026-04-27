import { supabase } from "../../../lib/supabase.js";

export async function deleteOwnCompanyService(identifier) {
    if (!identifier) {
        console.error("Identifier is required to delete a company.");
        throw new Error("Identifier is required to delete a company.");
    }

    try {
        const deleteCompanyQuery = await supabase
            .from('companies')
            .delete()
            .eq('identifier', identifier);

        if (deleteCompanyQuery.error) {
            throw new Error(deleteCompanyQuery.error.message);
        }

        return deleteCompanyQuery;
    } catch (error) {
        console.error("Error deleting company:", error);
        throw error;
    }

}