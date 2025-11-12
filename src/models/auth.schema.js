import * as z from "zod";

export const signUpSchema = z.object({
  first_name: z
    .string("first name is required")
    .min(3, "first name must have 3 digits"),
  last_name: z.string().optional(),
  jenis_kelamin: z.literal(["Laki-laki", "Perempuan"]),
  date_of_birth: z.date("date of birth is required"),
  email_address: z.email("email address is required"),
  password_email: z
    .string("password email is required")
    .min(6, "minimal 6 length"),
});
