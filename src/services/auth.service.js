import { supabase } from "../lib/supabase.js";

export const signUpService = async (data) => {
  const dataObject = data;

  try {
    // avoid shadowing `data` variable; destructure with a different name
    const { data: signUpData, error } = await supabase.auth.signUp({
      email: dataObject.email_address,
      password: dataObject.password_email,
      options: {
        data: {
          user_data_object: dataObject,
        },
      },
    });

    if (error) throw error;

    return signUpData;
  } catch (error) {
    console.error("signUpService error:", error?.message || error);
    throw error;
  }
};

export const signInWithEmailService = async (emailData, passwordData) => {
  const emailAdress = emailData;
  const passwordEmail = passwordData;

  if (!emailAdress | !passwordEmail)
    throw new Error(`email adress or password email are rquired.`);

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: emailAdress,
      password: passwordEmail,
    });

    if (error) throw error;

    return data;
  } catch (error) {
    console.error("sign in service error:", error?.message || error);
    throw error;
  }
};
