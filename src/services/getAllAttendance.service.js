import { supabase } from "../lib/supabase.js";

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
