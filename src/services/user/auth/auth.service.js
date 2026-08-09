import { supabase } from "../../../lib/supabase.js";
import { supabaseAdmin } from "../../../lib/supabaseAdmin.js";

import { mergeName } from "../../../utils/mergeName.js";
import { formatDate } from "../../../utils/formatDate.js";

export const signUpService = async (data) => {
  const dataObject = data;

  try {
    const { data: signUpData, error } = await supabase.auth.signUp({
      email: dataObject.email_address,
      password: dataObject.password_email,
      options: {
        data: dataObject
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

    const { data: roleAndCompanyIdData, error: roleAndCompanyIdError } = await supabase
      .from("company_members")
      .select("role, company_id")
      .eq("user_id", data.user.id);

    if (roleAndCompanyIdError) throw roleAndCompanyIdError;

    const userRole = roleAndCompanyIdData.map((data) => data.role);
    const companyId = roleAndCompanyIdData.map((data) => data.company_id);

    return { data, userRole, companyId };
  } catch (error) {
    console.error("sign in service error:", error?.message || error);
    throw error;
  }
};
