import { supabase } from "../../../lib/supabase.js";

export const getUserInfoService = async (identifier) => {
    if (!identifier) {
        throw new Error("User identifier is required to fetch user info.");
    }

    try {
        const userProfileQuery = await supabase
            .from("employees")
            .select("*")
            .eq("user_id", identifier);

        if (userProfileQuery.error) {
            console.error("Error fetching user profile:", userProfileQuery.error);
            return;
        }

        const employeeId = userProfileQuery.data[0]?.employee_id;

        if (!employeeId) {
            console.error("Employee ID not found for user:", identifier);
            return;
        }

        const userAttendanceQuery = await supabase
            .from("attendances")
            .select("*")
            .eq("user_id", employeeId);

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