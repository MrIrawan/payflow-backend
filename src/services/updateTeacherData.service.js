import { supabase } from "../lib/supabase.js";
import { mergeName } from "../utils/mergeName.js";

export const updateTeacherDataService = async (data, identifier) => {
  const updateData = data;
  const userId = identifier;
  if (!updateData | !userId)
    throw new Error("update data object or data id is required.");

  try {
    const response = await supabase
      .from("data_guru")
      .update({
        nama_lengkap: mergeName(updateData.first_name, updateData.last_name),
        ...updateData,
      })
      .eq("guru_id", userId)
      .select();

    return response;
  } catch (error) {
    console.error("update user service error:", error?.message || error);
    throw error;
  }
};
