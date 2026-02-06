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

        // 2. Perform the creation using Service Role
        const supabaseAdmin = createClient(
            process.env.SUPABASE_URL ?? "",
            process.env.SUPABASE_SERVICE_ROLE_KEY ?? ""
        );

        const { email, password, full_name, role, can_post_direct } = await req.json();

        const { data: newUser, error: createError } = await supabaseAdmin.auth.admin.createUser({
            email,
            password,
            email_confirm: true,
            user_metadata: { full_name },
        });

        if (createError) throw createError;

        // 3. Update the profile with specific roles
        // The profile might have been created by a trigger (if one exists) or we create it here.
        // Our migration doesn't have a trigger, so we must insert/update.
        const { error: profileError } = await supabaseAdmin
            .from("profiles")
            .upsert({
                id: newUser.user.id,
                full_name,
                role: role || 'contributor',
                can_post_direct: can_post_direct || false,
            });

        if (profileError) throw profileError;

        return new Response(JSON.stringify({ user: newUser.user }), {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
            status: 200,
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: error }), {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
            status: 400,
        });
    }
});
