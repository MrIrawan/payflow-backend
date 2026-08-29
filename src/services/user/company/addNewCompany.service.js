import { supabaseAdmin } from "../../../lib/supabaseAdmin.js";

export async function addNewCompanyService(identifier, data, file) {
    let avatarUrl = null;

    if (!data) {
        throw new Error("Data is required");
    }

    if (file) {
        const fileName = `company-avatars/company-avatar-${identifier}-${Date.now()}.webp`;

        const { error: uploadError } = await supabaseAdmin.storage
            .from("payflow-assets")
            .upload(fileName, file.buffer, {
                contentType: "image/webp",
                upsert: false
            });

        if (uploadError) throw uploadError;

        const { data: uploadUrl } = await supabaseAdmin.storage
            .from("payflow-assets")
            .getPublicUrl(fileName);

        avatarUrl = uploadUrl.publicUrl;
    }


    const newCompanyQuery = await supabaseAdmin
        .from("companies")
        .insert({
            owner_id: identifier,
            avatar_url: avatarUrl,
            ...data
        })
        .select()
        .single();

    if (newCompanyQuery.error) {
        console.error("Error adding new company:", newCompanyQuery.error);
        throw new Error("Error adding new company.");
    }

    return newCompanyQuery;
};