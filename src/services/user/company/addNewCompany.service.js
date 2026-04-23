import { supabase } from "../../../lib/supabase.js";

export async function addNewCompanyService(data) {
    if (!data) {
        throw new Error("Data is required");
    }

    const newCompany = await supabase
        .from("company-list")
        .insert(data)
        .select()
        .single();

    return newCompany;
};