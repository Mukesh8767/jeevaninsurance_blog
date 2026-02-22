// @ts-nocheck

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req: Request) => {
    if (req.method === "OPTIONS") {
        return new Response("ok", { headers: corsHeaders });
    }

    try {
        const supabaseClient = createClient(
            process.env.SUPABASE_URL ?? "",
            process.env.SUPABASE_ANON_KEY ?? "",
            { global: { headers: { Authorization: req.headers.get("Authorization")! } } }
        );

        // 1. Verify the caller is an admin
        const { data: { user }, error: authError } = await supabaseClient.auth.getUser();
        if (authError || !user) {
            throw new Error("Unauthorized");
        }

        // Check profile role
        const { data: profile } = await supabaseClient
            .from("profiles")
            .select("role")
            .eq("id", user.id)
            .single();

        if (!profile || profile.role !== "admin") {
            throw new Error("Forbidden: Admins only");
        }

        // 2. Perform the deletion using Service Role
        const supabaseAdmin = createClient(
            process.env.SUPABASE_URL ?? "",
            process.env.SUPABASE_SERVICE_ROLE_KEY ?? ""
        );

        const { user_id } = await req.json();

        if (user_id === user.id) {
            throw new Error("Cannot delete your own account");
        }

        // Deleting from auth.admin.deleteUser also deletes the profile due to CASCADE
        const { error: deleteError } = await supabaseAdmin.auth.admin.deleteUser(user_id);

        if (deleteError) throw deleteError;

        return new Response(JSON.stringify({ success: true }), {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
            status: 200,
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message || error }), {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
            status: 400,
        });
    }
});
