import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error("Missing RESEND_API_KEY environment variable.");
      return NextResponse.json(
        { error: "Email configuration error." },
        { status: 500 }
      );
    }
    const resend = new Resend(apiKey);
    const { name, email, message, budget } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    await resend.emails.send({
      from: "Thecodeguys Contact <onboarding@resend.dev>",
      to: "copra.codes@gmail.com",
      subject: `New message from ${name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #080808; color: #f0f0f0; padding: 32px; border-radius: 12px;">
          <h2 style="color: #a8ff3e; margin-bottom: 24px;">New Contact Form Submission</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr style="border-bottom: 1px solid #1f1f1f;">
              <td style="padding: 12px 0; color: #888; width: 100px;">Name</td>
              <td style="padding: 12px 0; color: #f0f0f0;">${name}</td>
            </tr>
            <tr style="border-bottom: 1px solid #1f1f1f;">
              <td style="padding: 12px 0; color: #888;">Email</td>
              <td style="padding: 12px 0; color: #f0f0f0;">${email}</td>
            </tr>
            <tr style="border-bottom: 1px solid #1f1f1f;">
              <td style="padding: 12px 0; color: #888;">Budget</td>
              <td style="padding: 12px 0; color: #f0f0f0;">${budget || "Not specified"}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; color: #888; vertical-align: top;">Message</td>
              <td style="padding: 12px 0; color: #f0f0f0;">${message}</td>
            </tr>
          </table>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}