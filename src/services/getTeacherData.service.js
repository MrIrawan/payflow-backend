import { supabase } from "../lib/supabase.js";

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

export const getTeacherDataByIdService = async (data_id) => {
  const dataId = data_id;
  if (!dataId) {
    throw new Error("data id is required.");
  }

  try {
    const { data, error } = await supabase
      .from("data_guru")
      .select("*")
      .eq("guru_id", dataId)
      .single();

    if (error) throw error;

    return data;
  } catch (error) {
    console.error("get teacher data by id error", error?.message || error);
    throw error;
  }
};

export const getTeacherDataByGenderService = async (genderString) => {
  const gender = genderString;

  if (!gender) {
    throw new Error("gender is required.");
  }

  try {
    const { data, error } = await supabase
      .from("data_guru")
      .select("*")
      .eq("jenis_kelamin", gender);

    if (error) throw error;

    return data;
  } catch (error) {
    console.error(
      "get teacher by gender service error:",
      error?.message || error
    );
    throw error;
  }
};
