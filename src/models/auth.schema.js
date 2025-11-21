import * as z from "zod";

export const signUpSchema = z.object({
  first_name: z
    .string({ required_error: "first name is required" })
    .min(3, "first name must have 3 digits"),
  last_name: z.string().optional(),
  gender: z.enum(["male", "female"]),
  date_of_birth: z.coerce.date("date of birth is required"),
  email_address: z.string().email({ message: "email address is required" }),
  password_email: z
    .string({ required_error: "password email is required" })
    .min(6, "minimal 6 length"),
});

export const signInWithEmailSchema = z.object({
  email_adress: z.string().email({ message: "email is required" }),
  password_email: z.string("password email is required."),
});
