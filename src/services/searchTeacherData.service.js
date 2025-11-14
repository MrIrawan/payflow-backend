import { supabase } from "../lib/supabase.js";

export const searchTeacherDataService = async (keywordData) => {
  const searchKeyword = keywordData;

  if (!searchKeyword) {
    throw new Error("search keayword is required.");
  }

  try {
    const { data, error } = await supabase
      .from("data_guru")
      .select("*")
      .ilike("nama_lengkap", searchKeyword);

    if (error) throw error;

    return data;
  } catch (error) {
    console.error(
      "search teacher data service error:",
      error?.message || error
    );
    throw error;
  }
};
