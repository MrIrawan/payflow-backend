import { getSupabaseWithAuth } from "../../../lib/supabaseWithAuth.js";

export const getUserInfoService = async (identifier, accessToken) => {
    if (!identifier) {
        throw new Error("User identifier is required to fetch user info.");
    }

    const supabase = getSupabaseWithAuth(accessToken);

    try {
        const userProfileQuery = await supabase
            .from("employees")
            .select("*")
            .eq("user_id", identifier)
            .single();

        if (userProfileQuery.error) {
            console.error("Error fetching user profile:", userProfileQuery.error);
            return;
        }

        const employeeId = userProfileQuery.data?.employee_id;

        if (!employeeId) {
            console.error("Employee ID not found for user:", identifier);
            return;
        }

        const userAttendanceQuery = await supabase
            .from("attendances")
            .select("*")
            .eq("employee_id", employeeId);

        if (userAttendanceQuery.error) {
            console.error("Error fetching user attendance:", userAttendanceQuery.error);
            return;
        }

        return { userProfileQuery, userAttendanceQuery };

    } catch (error) {
        console.error("Error in getUserInfoService:", error);
        throw error;
    }
};