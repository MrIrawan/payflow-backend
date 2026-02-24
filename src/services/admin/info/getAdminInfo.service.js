import { supabase } from "../../../lib/supabase.js";

export async function getAdminInfoService() {
    // fetch all users
    const { data: teachersData, error: teachersError } = await supabase.from("data_guru").select("*");

    // fetch all attendance users
    const { data: attendancesData, error: attendancesError } = await supabase.from("absensi").select("*");

    // fetch payslips history

    return {
        teachersData,
        attendancesData,
        teachersError,
        attendancesError
    }
}