import * as z from "zod";

export const attendanceSchema = z.object({
  teacher_id: z.string("teacher id is required"),
  attendance_date: z.coerce.date("attendance date is required."),
  checkin_time: z.number("check in time is required"),
  checkout_time: z.number("check out time is required"),
  attendance_status: z.enum(
    ["hadir", "sakit", "alfa"],
    "attendance status is required, please choose between 'hadir', 'sakit', or 'alfa'"
  ),
});
