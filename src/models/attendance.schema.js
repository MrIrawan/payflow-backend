import * as z from "zod";

export const attendanceSchema = z.object({
  company_id: z.number("company id is required"),
  employee_id: z.string("employee id is required"),
  attendance_date: z.coerce.date("attendance date is required."),
  checkin_time: z.number("check in time is required"),
  checkout_time: z.number("check out time is required"),
  attendance_status: z.enum(
    ["present", "absent", "late", "permit"],
    "attendance status is required, please choose between 'present', 'absent', 'late', or 'permit'."
  ),
});

export const updateAttendanceSchema = z.object({
  company_id: z.number("company id is required").optional(),
  employee_id: z.string("employee id is required").optional(),
  attendance_date: z.coerce.date().optional(),
  checkin_time: z.number().optional(),
  checkout_time: z.number().optional(),
  attendance_status: z.enum(
    ["present", "absent", "late", "permit"],
    "attendance status is required, please choose between 'present', 'absent', 'late', or 'permit'."
  ).optional(),
});
