import { getSupabaseWithAuth } from "../../../lib/supabaseWithAuth.js";

import { formatTime } from "../../../utils/formatTime.js";

export const editEmployeeAttendance = async (identifier, data, accessToken) => {

    if (!identifier || !data) {
        console.error("Identifier and data are required to edit employee attendance.");
        return;
    }

    const supabase = getSupabaseWithAuth(accessToken);

    try {
        if (data.checkin_time && data.checkout_time) {
            data.checkin_time = formatTime(data.checkin_time);
            data.checkout_time = formatTime(data.checkout_time);
        } else {
            delete data.checkin_time;
            delete data.checkout_time
        };

        const updateEmployeeAttendancesQuery = await supabase
            .from("attendances")
            .update(data)
            .eq("attendance_id", identifier);

        if (updateEmployeeAttendancesQuery.error) {
            console.error("Error updating employee attendance:", updateEmployeeAttendancesQuery.error);
        }

        return updateEmployeeAttendancesQuery;
    } catch (error) {
        const fetchError = error;
        return fetchError;
    }
}