import { supabase } from "../lib/supabase.js";
import { mergeName } from "../utils/mergeName.js";

export const signUpService = async (data) => {
  const dataObject = data;

  try {
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

    const { data, error: insertError } = await supabase
      .from("data_guru")
      .insert({
        guru_id: signUpData.user.id,
        full_name: mergeName(
          signUpData.user.user_metadata.user_data_object.first_name,
          signUpData.user.user_metadata.user_data_object.last_name
        ),
        date_of_birth:
          signUpData.user.user_metadata.user_data_object.date_of_birth,
        gender:
          signUpData.user.user_metadata.user_data_object.gender,
        email_address: signUpData.user.user_metadata.user_data_object.email_address,
      });

    if (insertError) throw insertError;

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
