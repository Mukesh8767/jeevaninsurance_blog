import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// NOTE: You'll need to install 'resend' via npm and add RESEND_API_KEY to your .env
// npm install resend

export async function POST(req: Request) {
    const apiKey = process.env.RESEND_API_KEY;
    console.log(apiKey);

    if (!apiKey) {
        console.error('RESEND_API_KEY is missing from environment variables');
        return NextResponse.json({ error: 'Mail server configuration missing' }, { status: 500 });
    }

    const resend = new Resend(apiKey);
    try {
        const body = await req.json();
        const { full_name, phone, email, service, message } = body;

        // Validating required fields
        if (!full_name || !email || !phone || !service) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Sending Email via Resend
        const { data, error } = await resend.emails.send({
            from: 'JivanSecure Contact <onboarding@resend.dev>', // You can customize this later with a domain
            to: ['rodeorohit071@gmail.com'],
            subject: `New Contact Request: ${service} - ${full_name}`,
            html: `
                <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
                    <div style="background-color: #001f54; padding: 32px; text-align: center;">
                        <h1 style="color: white; margin: 0; font-size: 24px;">New Consultation Request</h1>
                        <p style="color: #60a5fa; margin: 8px 0 0 0; text-transform: uppercase; letter-spacing: 2px; font-size: 12px; font-weight: bold;">JivanSecure Intelligence Hub</p>
                    </div>
                    
                    <div style="padding: 40px; background-color: white;">
                        <div style="margin-bottom: 24px;">
                            <label style="display: block; font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; color: #94a3b8; margin-bottom: 4px;">Full Name</label>
                            <p style="margin: 0; font-size: 18px; color: #1e293b; font-weight: bold;">${full_name}</p>
                        </div>

                        <div style="display: flex; gap: 40px; margin-bottom: 24px;">
                            <div style="flex: 1;">
                                <label style="display: block; font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; color: #94a3b8; margin-bottom: 4px;">Phone Number</label>
                                <p style="margin: 0; font-size: 16px; color: #1e293b; font-weight: bold;">+91 ${phone}</p>
                            </div>
                            <div style="flex: 1;">
                                <label style="display: block; font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; color: #94a3b8; margin-bottom: 4px;">Email ID</label>
                                <p style="margin: 0; font-size: 16px; color: #1e293b; font-weight: bold;">${email}</p>
                            </div>
                        </div>

                        <div style="margin-bottom: 24px; padding: 16px; background-color: #f8fafc; border-radius: 8px; border-left: 4px solid #00a859;">
                            <label style="display: block; font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; color: #00a859; margin-bottom: 4px;">Area of Interest</label>
                            <p style="margin: 0; font-size: 16px; color: #1e293b; font-weight: bold;">${service}</p>
                        </div>

                        <div>
                            <label style="display: block; font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; color: #94a3b8; margin-bottom: 4px;">Client Message</label>
                            <p style="margin: 0; font-size: 14px; color: #475569; line-height: 1.6; font-style: italic;">
                                "${message || 'No additional message provided.'}"
                            </p>
                        </div>
                    </div>
                    
                    <div style="padding: 24px; background-color: #f1f5f9; text-align: center; border-top: 1px solid #e2e8f0;">
                         <p style="margin: 0; font-size: 11px; color: #94a3b8;">This is an automated notification from JivanSecure website.</p>
                    </div>
                </div>
            `
        });

        if (error) {
            console.error('Email error:', error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ success: true, data }, { status: 200 });
    } catch (err: any) {
        console.error('API Error:', err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
