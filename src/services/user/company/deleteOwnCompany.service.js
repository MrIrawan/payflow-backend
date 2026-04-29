import { getSupabaseWithAuth } from "../../../lib/supabaseWithAuth.js";

export async function deleteOwnCompanyService(identifier, accessToken) {
    if (!identifier) {
        console.error("Identifier is required to delete a company.");
        throw new Error("Identifier is required to delete a company.");
    }

    const supabase = getSupabaseWithAuth(accessToken);

    try {
        const deleteCompanyQuery = await supabase
            .from('companies')
            .delete()
            .eq('company_id', identifier);

        if (deleteCompanyQuery.error) {
            throw new Error(deleteCompanyQuery.error.message);
        }

        return deleteCompanyQuery;
    } catch (error) {
        console.error("Error deleting company:", error);
        throw error;
    }

}