import * as z from "zod";

export const editUserProfileSchema = z.object({
    full_name: z.string().min(3, "full name at least have 3 length.").optional(),
    date_of_birth: z.coerce.date().optional(),
    address: z.string().min(5, "home address at least have 5 length.").optional(),
    job_title: z.string().array().optional(),
    subject_name: z.string().array().optional(),
    gender: z.enum(
        ["male", "female"]
    ).optional(),
    weekly_hours: z.number().min(0, "weekly hours must be greater than or equal to 0.").optional(),
});