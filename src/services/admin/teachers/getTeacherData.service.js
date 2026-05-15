import { supabase } from "../../../lib/supabase.js";
import { supabaseAdmin } from "../../../lib/supabaseAdmin.js";

export const getTeacherDataService = async () => {
  try {
    const { data, error } = await supabaseAdmin.from("employees").select("*");

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
    const response = await supabaseAdmin
      .from("employees")
      .select("*")
      .eq("guru_id", dataId)
      .single();

    return response;
  } catch (error) {
    console.error("get teacher data by id error", error?.message || error);
    throw error;
  }
};