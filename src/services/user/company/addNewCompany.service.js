import { supabaseAdmin } from "../../../lib/supabaseAdmin.js";
import { mergeName } from "../../../utils/mergeName.js";

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

    if (newCompanyQuery.error) {
        console.error("Error adding new company:", newCompanyQuery.error);
        throw new Error("Error adding new company.");
    }

    return newCompanyQuery;
};