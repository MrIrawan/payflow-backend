import * as z from "zod";

export const signUpSchema = z.object({
  first_name: z
    .string({ required_error: "first name is required" })
    .min(3, "first name must have 3 digits"),
  last_name: z.string().optional(),
  jenis_kelamin: z.enum(["Laki-laki", "Perempuan"]),
  date_of_birth: z.date({ required_error: "date of birth is required" }),
  email_address: z.string().email({ message: "email address is required" }),
  password_email: z
    .string({ required_error: "password email is required" })
    .min(6, "minimal 6 length"),
});
