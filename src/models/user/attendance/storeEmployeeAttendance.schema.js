import * as z from "zod";

export const storeEmployeeAttendanceSchema = z.object({
    teacher_name: z.string("teacher name is required.").min(3, "teacher name at least have 3 length."),
    attendance_date: z.coerce.date("attendance date is required."),
    checkin_time: z.number("checkin time is required."),
    checkout_time: z.number("checkout time is required."),
    attendance_status: z.enum(
        ["present", "absent", "on leave"],
        "attendance status is required, please choose between 'present', 'absent', or 'on leave'."
    )
});