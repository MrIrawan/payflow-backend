import * as z from "zod";

export const storeTeacherDataSchema = z.object({
    full_name: z.string().min(3, "Full name must be at least 3 characters long."),
    date_of_birth: z.coerce.date("Date of birth is required."),
    home_address: z.string().min(10, "Home address must be at least 10 characters long.").optional(),
    job_title: z.string().min(3, "Job title must be at least 3 characters long."),
    company: z.string().min(3, "Company name must be at least 3 characters long."),
    net_salary: z.number("Net salary is required and must be a number."),
    gender: z.enum(["male", "female"], "Gender is required, please choose between 'male' or 'female'"),
    email_address: z.string().email("A valid email address is required."),
});