import { supabaseAdmin } from "../../../lib/supabaseAdmin.js";

export async function addNewCompanyService(identifier, data) {
    if (!data) {
        throw new Error("Data is required");
    }

    const newCompanyQuery = await supabaseAdmin
        .from("companies")
        .insert({
            owner_id: identifier,
            ...data
        })
        .select()
        .single();

    return newCompanyQuery;
};