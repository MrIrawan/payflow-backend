import { supabase } from "../../../lib/supabase.js";

import { formatDate } from "../../../utils/formatDate.js";
import { formatTime } from "../../../utils/formatTime.js";

export const storeEmployeeAttendanceService = async (data) => {
    if (!data) {
        console.error("Data is required to store employee attendance.");
        return;
    }

    try {
        const employeeId = String(data.employee_id);

        const isEmployeeExist = await supabase
            .from("employees")
            .select("full_name")
            .eq("employee_id", employeeId);

        if (isEmployeeExist.error) {
            console.error("Error checking employee existence:", isEmployeeExist.error);
            return;
        }

        if (isEmployeeExist.data.length === 0) {
            console.error(`Employee with ID ${employeeId} does not exist.`);
            return;
        }

        const storeEmployeeAttendanceQuery = await supabase
            .from("attendances")
            .insert({
                ...data,
                attendance_date: formatDate(data.attendance_date),
                checkin_time: formatTime(data.checkin_time),
                checkout_time: formatTime(data.checkout_time)
            })
            .select();

        if (storeEmployeeAttendanceQuery.error) {
            console.error("Error storing employee attendance:", storeEmployeeAttendanceQuery.error);
            return;
        }

        return storeEmployeeAttendanceQuery;
    } catch (error) {
        console.error("Unexpected error storing employee attendance:", error);
        throw error;
    }
}