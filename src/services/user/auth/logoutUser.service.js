import { supabase } from "../../../lib/supabase.js";

export const logoutUserService = async (accessToken) => {
    try {
        if (accessToken) {
            const { error } = await supabase.auth.signOut(accessToken);
            if (error) {
                console.error("Supabase signOut error:", error.message);
            }
        }
        return { success: true };
    } catch (error) {
        console.error("Logout Service Error:", error);
        return { success: false };
    }
};