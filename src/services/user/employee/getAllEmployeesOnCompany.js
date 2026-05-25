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

        const getCompanyNameQuery = await supabase
            .from("companies")
            .select("company_name")
            .eq("company_id", companyId)
            .single();

        console.log(getCompanyNameQuery)

        if (getCompanyNameQuery.error) {
            console.error("get company name query error: ", getCompanyNameQuery.error.message);
        }

        return { getAllEmployeesQuery, getCompanyNameQuery };
    } catch (error) {
        console.error("Error in getAllEmployeesOnCompany: ", error);
        throw error;
    }
}