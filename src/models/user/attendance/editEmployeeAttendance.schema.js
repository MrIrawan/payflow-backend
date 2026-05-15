import * as z from "zod";

export const editEmployeeAttendanceSchema = z.object({
    company_id: z.number("company id is required").optional(),
    employee_id: z.string("employee id is required").optional(),
    attendance_date: z.coerce.date().optional(),
    checkin_time: z.number().optional(),
    checkout_time: z.number().optional(),
    status: z.enum(
        ["present", "absent", "late", "permit"],
        "attendance status is required, please choose between 'present', 'absent', 'late', or 'permit'."
    ).optional(),
});