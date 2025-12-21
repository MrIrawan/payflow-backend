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
      .select("*")
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    console.error("error attendance service", error);
  }
};

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

export const getAllAttendanceService = async () => {
  try {
    const { data, error } = await supabase.from("absensi").select("*");

    if (error) {
      throw new Error("error fetching data: ", error);
    }

    return data;
  } catch (error) {
    console.error("get all attendance error: ", error);
    throw new Error("error message: ", error);
  }
};

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

export const getAttendanceByDateService = async (identifier) => {
  const date = identifier;

  try {
    const response = await supabase
      .from("absensi")
      .select("*")
      .eq("attendance_date", formatDate(date));

    return response;
  } catch (error) {
    console.error("get attendance by date error:", error);
    throw error;
  }
};
