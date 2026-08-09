import { supabase } from "../../../lib/supabase.js";
import jwt from "jsonwebtoken";

export const refreshSessionService = async (oldRefreshToken) => {
    if (!oldRefreshToken) {
        throw new Error("No refresh token provided");
    }

    // Panggil API Supabase untuk menukar Refresh Token
    const { data, error } = await supabase.auth.refreshSession({
        refresh_token: oldRefreshToken,
    });

    // Jika gagal (token hangus, user di-banned, atau error koneksi)
    if (error || !data.session) {
        throw new Error(error?.message || "Failed to refresh session");
    }

    const { data: roleAndCompanyIdData, error: roleAndCompanyIdError } = await supabase
        .from("company_members")
        .select("role, company_id")
        .eq("user_id", data.user.id);

    if (roleAndCompanyIdError) throw roleAndCompanyIdError;

    const userRole = roleAndCompanyIdData[0].role;
    const companyId = roleAndCompanyIdData[0].company_id;

    // Kembalikan session baru (berisi access_token & refresh_token baru)
    return { data: data.session, userRole, companyId };
};