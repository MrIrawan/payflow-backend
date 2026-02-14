import { supabase } from "../../../lib/supabase.js";

export const updateTeacherDataService = async (data, identifier) => {
  const updateData = data;
  const userId = identifier;

  if (!updateData || !userId)
    throw new Error("update data object or data id is required.");

  try {
    // validate user exists
    const validateUser = await supabase.from("data_guru").select("guru_id").eq("guru_id", userId).single();

    if (validateUser.error || !validateUser.data) {
      throw new Error("teacher data not found.");
    }

    const teacherUpdate = await supabase
      .from("data_guru")
      .update(updateData)
      .eq("guru_id", userId)
      .select();

    return { teacherUpdate, validateUser };

  } catch (error) {
    console.error("update user service error:", error?.message || error);
    throw error;
  }
};
