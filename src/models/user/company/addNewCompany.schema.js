import * as z from "zod";

export const addNewCompanySchema = z.object({
    company_name: z.string().min(1, "Company name is required"),
    company_description: z.string().min(5, "Company description must be at least 5 characters long").optional(),
    company_field: z.array(z.string().min(1, "Each company field is required")).min(1, "At least one company field is required"),
    total_employees: z.number().int().positive("Total employees must be a positive integer"),
    themeConfig: z.json(),
});