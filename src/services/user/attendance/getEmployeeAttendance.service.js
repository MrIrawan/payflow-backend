import { supabase } from "../../../lib/supabase.js";

export const getEmployeeAttendance = async (identifier) => {
    if (!identifier) {
        throw new Error("Identifier is required");
    }

    try {
        const getEmployeeIdQuery = await supabase
            .from("employees")
            .select("employee_id")
            .eq("user_id", identifier);

        if (getEmployeeIdQuery.error) {
            console.error("Error fetching employee ID:", getEmployeeIdQuery.error);
            return;
        }

        if (getEmployeeIdQuery.data.length === 0) {
            console.error("No employee found for the given user ID:", identifier);
            return;
        }

        const employeeId = getEmployeeIdQuery.data[0].employee_id;

        const getEmployeeAttendanceQuery = await supabase
            .from("attendances")
            .select("*")
            .eq("employee_id", employeeId);

        if (getEmployeeAttendanceQuery.error) {
            console.error("Error fetching attendance records:", getEmployeeAttendanceQuery.error);
            throw new Error("Failed to fetch attendance records");
        }

        return getEmployeeAttendanceQuery;
    } catch (error) {
        console.error("Error fetching employee attendance:", error);
        throw new Error("Failed to fetch employee attendance");
    }
}