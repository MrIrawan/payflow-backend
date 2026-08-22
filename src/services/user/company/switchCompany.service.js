import { getSupabaseWithAuth } from "../../../lib/supabaseWithAuth.js";

export async function switchCompanyService(userId, companyId, token) {

    if (!userId || !companyId || !token) {
        throw new Error("userId, companyId, dan token is required.")
    }

    const supabase = getSupabaseWithAuth(token);

    const { data: roleAndCompanyIdData, error: roleAndCompanyIdError } = await supabase
        .from("company_members")
        .select("role")
        .eq("company_id", companyId)
        .eq("user_id", userId)
        .single();

    if (roleAndCompanyIdError) throw roleAndCompanyIdError;

    if (!roleAndCompanyIdData) {
        throw new Error("User is not a member of this company.");
    };

    return {
        role: roleAndCompanyIdData.role,
        companyid: companyId
    };
}