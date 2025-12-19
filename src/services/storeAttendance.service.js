import { supabase } from "../lib/supabase.js";
import { formatDate } from "../utils/formatDate.js";
import { formatTime } from "../utils/formatTime.js";

export const storeAttendanceService = async (data) => {
  const attendanceData = data;

  if (!attendanceData) {
    throw new Error(
      "error to handle attendance service: attendance data is required"
    );
  }

  try {
    const { data, error } = await supabase
      .from("absensi")
      .insert({
        ...attendanceData,
        attendance_date: formatDate(attendanceData.attendance_date),
        checkin_time: formatTime(attendanceData.checkin_time),
        checkout_time: formatTime(attendanceData.checkout_time),
      })
      .select("*");

    if (error) {
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    console.error("error attendance service", error);
  }
};
