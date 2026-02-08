import * as z from "zod";

export const storeTeacherDataSchema = z.object({
    full_name: z.string().min(3, "Full name must be at least 3 characters long."),
    date_of_birth: z.coerce.date("Date of birth is required."),
    home_address: z.string().min(10, "Home address must be at least 10 characters long.").optional(),
    job_title: z.string().min(3, "Job title must be at least 3 characters long.").array(),
    company: z.string().min(3, "Company name must be at least 3 characters long.").optional(),
    gender: z.enum(["male", "female"], "Gender is required, please choose between 'male' or 'female'"),
    subject_name: z.enum([
        "PAI", "Bahasa Arab", "Bahasa Indonesia", "Bahasa Inggris", "Matematika",
        "SKI", "DDPK RPL", "PKK", "KK2 MP", "BPBK", "KK1 RPL", "KK2 RPL", "DDPK MP",
        "SBK", "PJOK", "Fiqih", "Informatika", "IPAS", "KK1 MP", "PKN",
        "Kebekerjaan", "Sejarah", "Bahasa Jepang"
    ]).array(),
    email_address: z.string().email("A valid email address is required."),
    password_email: z.string().min(6, "Password must be at least 6 characters long."),
});