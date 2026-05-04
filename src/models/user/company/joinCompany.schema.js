import { z } from "zod";

export const joinCompanySchema = z.object({
    company_key: z
        .string()
        .min(1, "Company key is required")
        .length(6, "Company key harus 6 karakter")
        .transform((val) => val.toUpperCase()),
});