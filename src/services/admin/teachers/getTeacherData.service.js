import { supabase } from "../../lib/supabase.js";

export const getTeacherDataService = async () => {
  try {
    const { data, error } = await supabase.from("data_guru").select("*");

    if (error) throw error;

    return data;
  } catch (error) {
    console.error("get teacher data service error:", error?.message || error);
    throw error;
  }
};

export const getTeacherDataByIdService = async (identifier) => {
  const dataId = identifier;
  if (!dataId) {
    throw new Error("data id is required.");
  }

  try {
    const response = await supabase
      .from("data_guru")
      .select("*")
      .eq("guru_id", dataId);

    return response;
  } catch (error) {
    console.error("get teacher data by id error", error?.message || error);
    throw error;
  }
};