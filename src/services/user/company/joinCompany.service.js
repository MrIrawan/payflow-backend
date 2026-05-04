import { supabaseAdmin } from "../../../lib/supabaseAdmin.js";

export async function joinCompanyService(companyKey, userId) {

    // Step 1: Cari company berdasarkan company_key
    const { data: company, error: findError } = await supabaseAdmin
        .from("companies")
        .select("company_id, company_name, owner_id")
        .eq("company_key", companyKey.toUpperCase())
        .single();

    if (findError || !company) {
        return {
            status: 404,
            error: {
                message: "Company key tidak ditemukan",
                details: findError?.message ?? null,
            },
        };
    }

    // Step 2: Cegah owner join company miliknya sendiri
    if (company.owner_id === userId) {
        return {
            status: 409,
            error: {
                message: "Kamu adalah owner dari company ini",
                details: null,
            },
        };
    }

    // Step 3: Cek apakah user sudah jadi member
    const { data: existing } = await supabaseAdmin
        .from("company_members")
        .select("id, is_active")
        .eq("company_id", company.company_id)
        .eq("user_id", userId)
        .single();

    if (existing) {
        // Sudah pernah join tapi di-nonaktifkan → reaktivasi
        if (!existing.is_active) {
            const { error: reactivateError } = await supabaseAdmin
                .from("company_members")
                .update({ is_active: true })
                .eq("id", existing.id);

            if (reactivateError) {
                return {
                    status: 500,
                    error: {
                        message: "Gagal reaktivasi membership",
                        details: reactivateError.message,
                    },
                };
            }

            return {
                status: 200,
                data: {
                    company_id: company.company_id,
                    company_name: company.company_name,
                    role: "employee",
                    is_new: false, // reaktivasi, bukan join baru
                },
            };
        }

        // Sudah aktif sebagai member
        return {
            status: 409,
            error: {
                message: "Kamu sudah tergabung di company ini",
                details: null,
            },
        };
    }

    // Step 4: Insert ke company_members sebagai employee
    const { error: joinError } = await supabaseAdmin
        .from("company_members")
        .insert({
            company_id: company.company_id,
            user_id: userId,
            role: "employee", // default role saat join via key
        });

    if (joinError) {
        return {
            status: 500,
            error: {
                message: "Gagal bergabung ke company",
                details: joinError.message,
            },
        };
    }

    return {
        status: 200,
        data: {
            company_id: company.company_id,
            company_name: company.company_name,
            role: "employee",
            is_new: true, // join pertama kali
        },
    };
}