import { getSupabaseWithAuth } from "../../../lib/supabaseWithAuth.js";

export async function getAllEMployeesOnCompanyService(accessToken, companyId) {
    if (!accessToken || !companyId) {

    }

    const supabase = getSupabaseWithAuth(accessToken);

    try {
        const getAllEmployeesQuery = await supabase
            .from("employees")
            .select("*")
            .eq("company_id", companyId);

        if (getAllEmployeesQuery.error) {
            console.error(getAllEmployeesQuery.error.message);
        }

        return getAllEmployeesQuery;
    } catch (error) {
        console.error("Error in getAllEmployeesOnCompany: ", error);
        throw error;
    }
}