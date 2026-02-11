import * as z from "zod";

export const calculatePayrollSchema = z.object({
    totalWeeklyHours: z.coerce.number("total weekly hours is required."),
    month: z.coerce.number("month is required."),
    year: z.coerce.number("year is required"),
});