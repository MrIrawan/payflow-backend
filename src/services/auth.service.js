import { supabase } from "../lib/supabase.js";

export const signUpService = async (data) => {
  const dataObject = data;

  try {
    // avoid shadowing `data` variable; destructure with a different name
    const { data: signUpData, error } = await supabase.auth.signUp({
      email: dataObject.email_address,
      password: dataObject.password_email,
    });

    if (error) throw error;

    return signUpData;
  } catch (error) {
    // rethrow so controller's error handler (or express error middleware) handles it
    console.error("signUpService error:", error?.message || error);
    throw error;
  }
};
