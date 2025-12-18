import * as z from "zod";

export const attendanceSchema = z.object({
  teacherId: z
    .string("teacher id is required")
    .minLength(5, "teacher id minimal length must 5"),
  attendanceDate: z.iso.date("attendance date is required"),
  chceckInTime: z.iso.time("check in time is required"),
  checkOutTime: z.iso.time("check out time is required"),
  attendanceStatus: z.enum(
    ["hadir", "sakit", "alfa"],
    "attendance status is required, please choose between 'hadir', 'sakit', or 'alfa'"
  ),
});
