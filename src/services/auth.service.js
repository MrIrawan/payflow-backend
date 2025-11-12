import { supabase } from "../lib/supabase.js";

export const signUpService = async (data) => {
  const dataObject = data;

  try {
    const { data, error } = await supabase.auth.signUp({
      email: dataObject.email_address,
      password: dataObject.password_email,
    });

    if (error) return error.message;

    return data;
  } catch (error) {
    console.error(error);
  }
};
