import { supabase } from "../../lib/supabase.js";

export const updateTeacherDataService = async (data, identifier) => {
  const updateData = data;
  const userId = identifier;
  if (!updateData | !userId)
    throw new Error("update data object or data id is required.");

  try {
    const response = await supabase
      .from("data_guru")
      .update(updateData)
      .eq("guru_id", userId)
      .select();

    return response;
  } catch (error) {
    console.error("update user service error:", error?.message || error);
    throw error;
  }
};
