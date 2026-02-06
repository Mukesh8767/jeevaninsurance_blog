//@ts-nocheck
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
    if (req.method === "OPTIONS") {
        return new Response("ok", { headers: corsHeaders });
    }

    try {
        const { full_name, email, phone, service, message } = await req.json();

        // Validate inputs
        if (!email || !full_name) throw new Error("Missing required fields");

        // Initialize Admin Client
        const supabaseAdmin = createClient(
            process.env.SUPABASE_URL ?? "",
            process.env.SUPABASE_SERVICE_ROLE_KEY ?? ""
        );

        // 1. Insert into Database
        const { data, error: dbError } = await supabaseAdmin
            .from("contact_requests")
            .insert({ full_name, email, phone, service, message })
            .select()
            .single();

        if (dbError) throw dbError;

        // 2. Send Emails (Logic placeholder for SendGrid)
        const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
        if (SENDGRID_API_KEY) {
            // Send Admin Notification
            await sendEmail({
                apiKey: SENDGRID_API_KEY,
                to: "[EMAIL_ADDRESS]", // Replace with actual admin email
                subject: `New Callback Request - ${service} - ${full_name}`,
                text: `Name: ${full_name}\nPhone: ${phone}\nService: ${service}\nMessage: ${message}`
            });

            // Send User Confirmation
            await sendEmail({
                apiKey: SENDGRID_API_KEY,
                to: email,
                subject: "JivanSecure - Request Received",
                text: `Dear ${full_name},\n\nThank you for contacting JivanSecure regarding ${service}. A consultant will contact you within 24 hours.\n\nPrivacy Policy: https://jivansecure.com/privacy`
            });
        }

        return new Response(JSON.stringify({ success: true, data }), {
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

async function sendEmail({ apiKey, to, subject, text }: { apiKey: string, to: string, subject: string, text: string }) {
    const res = await fetch("https://api.sendgrid.com/v3/mail/send", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${apiKey}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            personalizations: [{ to: [{ email: to }] }],
            from: { email: "noreply@jivansecure.com" }, // Needs to be verified sender
            subject: subject,
            content: [{ type: "text/plain", value: text }]
        })
    });
    if (!res.ok) {
        console.error("Failed to send email:", await res.text());
    }
}
