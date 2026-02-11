import * as z from "zod";

export const calculatePayrollSchema = z.object({
    teacherId: z.string(),
    totalWeeklyHours: z.number(),
    month: z.number(),
    year: z.number(),
});