import * as z from "zod";

export const editEmployeeAttendanceSchema = z.object({
    teacher_name: z.string().min(3, "teacher name at least have 3 length").optional(),
    attendance_date: z.coerce.date().optional(),
    checkin_time: z.number().optional(),
    checkout_time: z.number().optional(),
    attendance_status: z.enum([
        "present", "absent", "on leave"
    ]).optional()
});