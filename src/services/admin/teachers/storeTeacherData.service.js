import { supabase } from "../../../lib/supabase.js";
import { supabaseAdmin } from "../../../lib/supabaseAdmin.js";

export const storeTeacherDataService = async (dataObject) => {
    const {
        email_address,
        password_email,
        ...teacherPayload
    } = dataObject;

    try {
        /**
         * 1️⃣ Register guru ke Supabase Auth
         */
        const teacherAuth =
            await supabaseAdmin.auth.admin.createUser({
                email: email_address,
                password: password_email,
                email_confirm: true,
            });

        if (teacherAuth.error) {
            throw new Error(`Auth registration failed: ${teacherAuth.error.message}`);
        }

        /**
         * 2️⃣ Insert data guru ke database
         * password_email DIHAPUS
         */
        const teacherMetadata =
            await supabase
                .from("data_guru")
                .insert({
                    ...teacherPayload,
                    email_address,
                })
                .select()
                .single();

        if (teacherMetadata.error) {
            /**
             * Optional tapi DISARANKAN:
             * rollback auth user jika insert gagal
             */
            await supabaseAdmin.auth.admin.deleteUser(teacherAuth.data.user.id);
            throw new Error(`Insert teacher failed: ${teacherMetadata.error.message}`);
        }

        return {
            teacherAuth,
            teacherMetadata
        };

    } catch (error) {
        console.error("storeTeacherDataService error:", error.message);
        throw error;
    }
};
