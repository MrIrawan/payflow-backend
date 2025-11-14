import * as z from "zod";

export const updateTeacherDataSchema = z.object({
  nama_lengkap: z
    .string({ required_error: "nama lengkap is required" })
    .min(3, "nama lengkap must have 3 digits")
    .optional(),
  jenis_kelamin: z.enum(["Laki-laki", "Perempuan"]).optional(),
  date_of_birth: z.coerce.date("date of birth is required").optional(),
  job_title: z.string().optional(),
  company: z.string().optional(),
  home_address: z.string().optional(),
  net_salary: z.number().optional(),
});
