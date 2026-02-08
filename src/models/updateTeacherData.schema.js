import * as z from "zod";

export const updateTeacherDataSchema = z.object({
  full_name: z.string().min(3, "Full name must be at least 3 characters long.").optional(),
  date_of_birth: z.coerce.date("Date of birth is required.").optional(),
  home_address: z.string().min(10, "Home address must be at least 10 characters long.").optional().optional(),
  job_title: z.string().min(3, "Job title must be at least 3 characters long.").array().optional(),
  company: z.string().min(3, "Company name must be at least 3 characters long.").optional().optional(),
  gender: z.enum(["male", "female"], "Gender is required, please choose between 'male' or 'female'").optional(),
  subject_name: z.enum([
    "PAI", "Bahasa Arab", "Bahasa Indonesia", "Bahasa Inggris", "Matematika",
    "SKI", "DDPK RPL", "PKK", "KK2 MP", "BPBK", "KK1 RPL", "KK2 RPL", "DDPK MP",
    "SBK", "PJOK", "Fiqih", "Informatika", "IPAS", "KK1 MP", "PKN",
    "Kebekerjaan", "Sejarah", "Bahasa Jepang"
  ]).array().optional(),
});