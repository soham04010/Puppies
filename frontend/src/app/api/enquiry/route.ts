import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import contactPuppies from "@/data/contact_puppies.json";

const RECIPIENT_EMAIL = process.env.NOTIFICATION_EMAIL || "chaudharisoham041@gmail.com";

interface PuppyRef {
  id: string;
  label: string;
}

function resolvePuppyName(puppyId?: string): string {
  if (!puppyId) return "Any puppy (not sure yet)";
  const found = (contactPuppies as PuppyRef[]).find((p) => p.id === puppyId);
  return found ? found.label : puppyId;
}

function createHtmlEmail({
  name,
  phone,
  email,
  area,
  puppyLabel,
  message,
  source,
}: {
  name: string;
  phone: string;
  email?: string;
  area?: string;
  puppyLabel: string;
  message?: string;
  source?: string;
}) {
  const cleanPhone = phone.replace(/[^0-9]/g, "");
  const waUrl = cleanPhone ? `https://wa.me/${cleanPhone}` : "https://wa.me/971541676733";

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Puppy Enquiry - TeddyPups</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #fffdf8; color: #4a3728; margin: 0; padding: 24px 16px; }
    .card { max-width: 580px; margin: 0 auto; background: #ffffff; border: 3px solid #ebd9c3; border-radius: 20px; overflow: hidden; box-shadow: 0 10px 30px rgba(74, 55, 40, 0.08); }
    .header { background: linear-gradient(135deg, #a95e32 0%, #4a3728 100%); color: #ffffff; padding: 28px 24px; text-align: center; }
    .header h1 { margin: 0; font-size: 24px; font-weight: 700; letter-spacing: -0.5px; }
    .header p { margin: 6px 0 0; opacity: 0.9; font-size: 14px; }
    .content { padding: 28px 24px; }
    .field { margin-bottom: 20px; }
    .label { font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #a24a1a; font-weight: 700; margin-bottom: 4px; }
    .value { font-size: 16px; font-weight: 600; color: #2a170e; word-break: break-word; }
    .message-box { background: #fdf8f0; border-left: 4px solid #c2622b; padding: 14px 18px; border-radius: 8px; font-size: 15px; line-height: 1.6; color: #4a3728; margin-top: 6px; }
    .actions { margin-top: 32px; display: flex; flex-wrap: wrap; gap: 12px; }
    .btn-wa { display: inline-block; background: #25D366; color: #ffffff !important; text-decoration: none; padding: 12px 22px; border-radius: 9999px; font-weight: 700; font-size: 14px; }
    .btn-mail { display: inline-block; background: #4a3728; color: #ffffff !important; text-decoration: none; padding: 12px 22px; border-radius: 9999px; font-weight: 700; font-size: 14px; }
    .footer { background: #fbf0d8; padding: 16px 24px; text-align: center; font-size: 12px; color: #6a5340; border-top: 1px solid #ebd9c3; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <h1>🐾 New TeddyPups Enquiry</h1>
      <p>Submitted via ${source === "puppy-detail" ? "Puppy Profile Storybook" : "Visit & Contact Letterform"}</p>
    </div>
    <div class="content">
      <div class="field">
        <div class="label">Prospective Puppy Parent</div>
        <div class="value">${name}</div>
      </div>
      <div class="field">
        <div class="label">Phone / WhatsApp Number</div>
        <div class="value">${phone}</div>
      </div>
      ${email ? `<div class="field"><div class="label">Email Address</div><div class="value"><a href="mailto:${email}" style="color: #4a3728;">${email}</a></div></div>` : ""}
      ${area ? `<div class="field"><div class="label">Area / Location</div><div class="value">${area}</div></div>` : ""}
      <div class="field">
        <div class="label">Puppy of Interest</div>
        <div class="value">${puppyLabel}</div>
      </div>
      ${message ? `<div class="field"><div class="label">Handwritten Message / Notes</div><div class="message-box">${message.replace(/\n/g, "<br/>")}</div></div>` : ""}
      
      <div class="actions">
        <a href="${waUrl}" target="_blank" class="btn-wa">Chat on WhatsApp</a>
        ${email ? `<a href="mailto:${email}" class="btn-mail">Reply via Email</a>` : ""}
      </div>
    </div>
    <div class="footer">
      TeddyPups U.A.E. • Downtown Dubai Showroom • Concierge: +971 54 167 6733
    </div>
  </div>
</body>
</html>
  `;
}

async function sendNotificationEmail(payload: {
  name: string;
  phone: string;
  email?: string;
  area?: string;
  puppyLabel: string;
  message?: string;
  source?: string;
}) {
  const smtpUser = process.env.SMTP_USER || process.env.GMAIL_USER;
  const smtpPass = process.env.SMTP_PASS || process.env.GMAIL_APP_PASSWORD;
  const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
  const smtpPort = Number(process.env.SMTP_PORT || 465);

  const subject = `🐾 New TeddyPups Enquiry from ${payload.name} (${payload.puppyLabel})`;
  const html = createHtmlEmail(payload);

  // If SMTP is configured, use Nodemailer
  if (smtpUser && smtpPass) {
    try {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465,
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });

      const info = await transporter.sendMail({
        from: `"TeddyPups Concierge" <${smtpUser}>`,
        to: RECIPIENT_EMAIL,
        replyTo: payload.email || smtpUser,
        subject,
        html,
      });

      console.log(`[EMAIL DISPATCHED] Message ID: ${info.messageId} to ${RECIPIENT_EMAIL}`);
      return { success: true, provider: "smtp", messageId: info.messageId };
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      console.error("[SMTP ERROR]:", message);
    }
  }

  // Backup dispatch via Web3Forms API (direct HTTPS to recipient email)
  const web3FormsKey = process.env.WEB3FORMS_ACCESS_KEY;
  if (web3FormsKey) {
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: web3FormsKey,
          to: RECIPIENT_EMAIL,
          subject,
          from_name: "TeddyPups U.A.E.",
          name: payload.name,
          phone: payload.phone,
          email: payload.email || "not provided",
          area: payload.area || "not provided",
          puppy: payload.puppyLabel,
          message: payload.message || "none",
        }),
      });
      if (res.ok) {
        console.log(`[EMAIL DISPATCHED] via Web3Forms to ${RECIPIENT_EMAIL}`);
        return { success: true, provider: "web3forms" };
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      console.error("[WEB3FORMS ERROR]:", message);
    }
  }

  // Fallback for development / unconfigured environments
  console.log(`\n======================================================`);
  console.log(`[NEW ENQUIRY RECEIVED] for ${RECIPIENT_EMAIL}`);
  console.log(`Name:        ${payload.name}`);
  console.log(`Phone:       ${payload.phone}`);
  console.log(`Email:       ${payload.email || "none"}`);
  console.log(`Area:        ${payload.area || "none"}`);
  console.log(`Puppy:       ${payload.puppyLabel}`);
  console.log(`Message:     ${payload.message || "none"}`);
  console.log(`======================================================\n`);

  return { success: true, provider: "logged" };
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, phone, email, area, message, puppyId, website, source } = body;

    // Honeypot spam check
    if (website && String(website).trim() !== "") {
      return NextResponse.json({
        success: true,
        ok: true,
        message: "Enquiry received successfully.",
      });
    }

    // Validation
    const errors: Record<string, string> = {};
    if (!name || String(name).trim().length < 2) {
      errors.name = "Please enter your name (at least 2 characters).";
    }
    if (!phone || String(phone).trim().length < 6) {
      errors.phone = "Please enter a valid phone or WhatsApp number.";
    }

    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        {
          success: false,
          ok: false,
          message: "Please complete all required fields on your letter.",
          errors,
        },
        { status: 400 }
      );
    }

    const puppyLabel = resolvePuppyName(puppyId);

    // Send email to chaudharisoham041@gmail.com
    await sendNotificationEmail({
      name: String(name).trim(),
      phone: String(phone).trim(),
      email: email ? String(email).trim() : undefined,
      area: area ? String(area).trim() : undefined,
      puppyLabel,
      message: message ? String(message).trim() : undefined,
      source: source || "contact-page",
    });

    return NextResponse.json(
      {
        success: true,
        ok: true,
        message:
          "Your letter has been posted! Our concierge team will reach out to you promptly.",
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("API /api/enquiry error:", message);
    return NextResponse.json(
      {
        success: false,
        ok: false,
        message: "An unexpected error occurred. Please message us on WhatsApp.",
      },
      { status: 500 }
    );
  }
}
