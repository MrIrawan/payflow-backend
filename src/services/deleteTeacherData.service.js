import { supabase } from "../lib/supabase.js";

export const deleteTeacherDataService = async (identifier) => {
  const data_id = identifier;
  if (!data_id) throw new Error("data id is required.");

  try {
    const result = await supabase
      .from("data_guru")
      .delete()
      .eq("guru_id", data_id);

    if (result.error != undefined) {
      console.error(result.error.message);
    }

    return result;
  } catch (error) {
    console.error("delete user profile service error", error?.message || error);
    throw error;
  }
};
