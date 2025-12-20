import { supabase } from "../lib/supabase.js";

export const deleteAttendanceService = async (attendanceId) => {
  if (!attendanceId) {
    throw new Error(
      "unable to access delete attendance service, attendance ID is required."
    );
  }

  try {
    const response = await supabase
      .from("absensi")
      .delete()
      .eq("attendance_id", attendanceId);

    if (response.error) {
      console.error(response.error.message);
    }

    return response;
  } catch (error) {
    console.error("error delete attendance service:", error);
    throw error;
  }
};
