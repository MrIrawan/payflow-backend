import { supabase } from "../lib/supabase.js";

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
      .insert(attendanceData)
      .select("*");

    if (error) {
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    console.error("error attendance service", error);
  }
};
