import * as z from "zod";

export const storeEmployeeAttendanceSchema = z.object({
    company_id: z.number("company id is required"),
    employee_id: z.string("employee id is required"),
    attendance_date: z.coerce.date("attendance date is required."),
    checkin_time: z.number("check in time is required"),
    checkout_time: z.number("check out time is required"),
    status: z.enum(
        ["present", "absent", "late", "permit"],
        "attendance status is required, please choose between 'present', 'absent', 'late', or 'permit'."
    ),
});