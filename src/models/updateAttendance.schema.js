import * as z from "zod";

export const updateAttendanceSchema = z.object({
  attendance_date: z.coerce.date().optional(),
  checkin_time: z.number().optional(),
  checkout_time: z.number().optional(),
  attendance_status: z.enum(
    ["hadir", "sakit", "alfa"],
    "attendance status is required, please choose between 'hadir', 'sakit', or 'alfa'"
  ),
});
