import { getSupabaseWithAuth } from "../../../lib/supabaseWithAuth";

export async function switchCompanyService(userId, companyId, token) {

    if (!userId || !companyId || !token) {
        throw new Error("userId, companyId, dan token is required.")
    }

    const supabase = getSupabaseWithAuth(token);

    const { data: roleAndCompanyIdData, error: roleAndCompanyIdError } = await supabase
        .from("company_members")
        .select("role")
        .or(`company_id.eq.${companyId},user_id.eq.${userId}`);

    if (roleAndCompanyIdError) throw roleAndCompanyIdError;

    if (roleAndCompanyIdData.length === 0) {
        throw new Error("User is not a member of this company.");
    };

    return {
        role: roleAndCompanyIdData.map((item) => item.role),
        companyid: companyId
    };
}