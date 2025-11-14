import { supabase } from "../lib/supabase.js";
import { mergeName } from "../utils/mergeName.js";

export const updateTeacherDataService = async (update_data, data_id) => {
  const updateData = update_data;
  const userId = data_id;
  if (!updateData | !userId)
    throw new Error("update data object or data id is required.");

  try {
    const { data, error } = await supabase
      .from("data_guru")
      .update({
        nama_lengkap: mergeName(updateData.first_name, updateData.last_name),
        ...updateData,
      })
      .eq("guru_id", userId)
      .select();

    if (error) throw error;

    return data;
  } catch (error) {
    console.error("update user service error:", error?.message || error);
    throw error;
  }
};
