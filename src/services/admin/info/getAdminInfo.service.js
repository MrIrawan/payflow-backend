import { supabase } from "../../../lib/supabase.js";
import { supabaseAdmin } from "../../../lib/supabaseAdmin.js";

export async function getAdminInfoService() {
    // fetch all users
    const { data: teachersData, error: teachersError } = await supabaseAdmin.from("employees").select("*");

    // fetch all attendance users
    const { data: attendancesData, error: attendancesError } = await supabaseAdmin.from("attendances").select("*");

    // fetch payslips history

    return {
        teachersData,
        attendancesData,
        teachersError,
        attendancesError
    }
}