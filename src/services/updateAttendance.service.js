import { supabase } from "../lib/supabase.js";
import { formatTime } from "../utils/formatTime.js";

export const updateAttendanceService = async (updateData, attendanceId) => {
  if (!updateData && attendanceId) {
    throw new Error(
      "unable to access this service, update data and attendance id is required"
    );
  }

  try {
    const { data, error } = await supabase
      .from("absensi")
      .update({
        ...updateData,
        checkin_time: formatTime(updateData.checkin_time),
        checkout_time: formatTime(updateData.checkout_time),
      })
      .eq("attendance_id", attendanceId)
      .select()
      .single();

    if (error) {
      console.error(error.message);
    }

    return data;
  } catch (error) {
    console.error("update attendance error :", error);
  }
};
