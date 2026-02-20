import * as z from "zod";

export const editUserProfileSchema = z.object({
    full_name: z.string().min(3, "full name at least have 3 length.").optional(),
    date_of_birth: z.coerce.date().optional(),
    home_address: z.string().min(5, "home address at least have 5 length.").optional(),
    job_title: z.string().array().optional(),
    company: z.string().optional(),
    subject_name: z.string().array().optional(),
    gender: z.enum(
        ["male", "female"]
    ).optional()
});