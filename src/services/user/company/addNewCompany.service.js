import { supabaseAdmin } from "../../../lib/supabaseAdmin.js";

export async function addNewCompanyService(data) {
    if (!data) {
        throw new Error("Data is required");
    }

    const newCompany = await supabaseAdmin
        .from("companies")
        .insert({
            owner_id: data.owner_id,
            ...data
        })
        .select()
        .single();

    return newCompany;
};