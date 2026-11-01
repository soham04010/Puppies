import { Request, Response } from 'express';
import fs from 'fs';
import nodemailer from 'nodemailer';
import { resolveDataPath } from '../utils/pathResolver';

const RECIPIENT_EMAIL = process.env.NOTIFICATION_EMAIL || 'chaudharisoham041@gmail.com';

export interface Enquiry {
  id: string;
  name: string;
  phone: string;
  email?: string;
  area?: string;
  message?: string;
  puppyId?: string;
  source: 'puppy-detail' | 'contact-page';
  createdAt: string;
}

const getEnquiriesData = (): Enquiry[] => {
  try {
    const enquiriesPath = resolveDataPath('enquiries.json');
    if (!fs.existsSync(enquiriesPath)) {
      fs.writeFileSync(enquiriesPath, JSON.stringify([]), 'utf-8');
      return [];
    }
    const raw = fs.readFileSync(enquiriesPath, 'utf-8');
    return JSON.parse(raw);
  } catch (error) {
    console.error('Error reading enquiries.json:', error);
    return [];
  }
};

const saveEnquiriesData = (enquiries: Enquiry[]) => {
  try {
    const enquiriesPath = resolveDataPath('enquiries.json');
    fs.writeFileSync(enquiriesPath, JSON.stringify(enquiries, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error saving enquiries.json:', error);
  }
};

async function sendEnquiryEmail(enquiry: Enquiry) {
  const smtpUser = process.env.SMTP_USER || process.env.GMAIL_USER;
  const rawPass = process.env.SMTP_PASS || process.env.GMAIL_APP_PASSWORD;
  const smtpPass = rawPass ? rawPass.replace(/\s+/g, "") : undefined;
  const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
  const smtpPort = Number(process.env.SMTP_PORT || 465);

  const cleanPhone = enquiry.phone.replace(/[^0-9]/g, '');
  const waUrl = cleanPhone ? `https://wa.me/${cleanPhone}` : 'https://wa.me/971541676733';

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #fffdf8; color: #4a3728; padding: 24px 16px; margin: 0; }
    .card { max-width: 580px; margin: 0 auto; background: #fff; border: 3px solid #ebd9c3; border-radius: 20px; overflow: hidden; }
    .header { background: linear-gradient(135deg, #a95e32 0%, #4a3728 100%); color: #fff; padding: 28px 24px; text-align: center; }
    .content { padding: 28px 24px; }
    .field { margin-bottom: 20px; }
    .label { font-size: 11px; text-transform: uppercase; color: #a24a1a; font-weight: 700; margin-bottom: 4px; }
    .value { font-size: 16px; font-weight: 600; color: #2a170e; }
    .message-box { background: #fdf8f0; border-left: 4px solid #c2622b; padding: 14px 18px; border-radius: 8px; font-size: 15px; line-height: 1.6; }
    .actions { margin-top: 32px; display: flex; gap: 12px; }
    .btn-wa { background: #25D366; color: #fff !important; text-decoration: none; padding: 12px 22px; border-radius: 9999px; font-weight: 700; font-size: 14px; }
    .btn-mail { background: #4a3728; color: #fff !important; text-decoration: none; padding: 12px 22px; border-radius: 9999px; font-weight: 700; font-size: 14px; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <h1 style="margin: 0; font-size: 24px;">🐾 New TeddyPups Enquiry</h1>
      <p style="margin: 6px 0 0; opacity: 0.9; font-size: 14px;">Submitted via TeddyPups Website</p>
    </div>
    <div class="content">
      <div class="field"><div class="label">Prospective Parent</div><div class="value">${enquiry.name}</div></div>
      <div class="field"><div class="label">Phone / WhatsApp</div><div class="value">${enquiry.phone}</div></div>
      ${enquiry.email ? `<div class="field"><div class="label">Email</div><div class="value">${enquiry.email}</div></div>` : ''}
      ${enquiry.area ? `<div class="field"><div class="label">Area / Location</div><div class="value">${enquiry.area}</div></div>` : ''}
      <div class="field"><div class="label">Puppy of Interest</div><div class="value">${enquiry.puppyId || 'General Visit'}</div></div>
      ${enquiry.message ? `<div class="field"><div class="label">Letter Message</div><div class="message-box">${enquiry.message.replace(/\n/g, '<br/>')}</div></div>` : ''}
      <div class="actions">
        <a href="${waUrl}" target="_blank" class="btn-wa">Chat on WhatsApp</a>
        ${enquiry.email ? `<a href="mailto:${enquiry.email}" class="btn-mail">Reply via Email</a>` : ''}
      </div>
    </div>
  </div>
</body>
</html>
  `;

  if (smtpUser && smtpPass) {
    try {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465,
        auth: { user: smtpUser, pass: smtpPass }
      });

      await transporter.sendMail({
        from: `"TeddyPups Concierge" <${smtpUser}>`,
        to: RECIPIENT_EMAIL,
        replyTo: enquiry.email || smtpUser,
        subject: `🐾 New TeddyPups Enquiry from ${enquiry.name}`,
        html
      });
      console.log(`[BACKEND EMAIL SENT] to ${RECIPIENT_EMAIL}`);
      return;
    } catch (err: unknown) {
      console.error('[BACKEND SMTP ERROR]:', err);
    }
  }

  console.log(`[BACKEND ENQUIRY SAVED & NOTIFIED] to ${RECIPIENT_EMAIL}`);
}

export const createEnquiry = async (req: Request, res: Response) => {
  const { name, phone, email, area, message, puppyId, website, source } = req.body;

  // Honeypot spam detection
  if (website && website.trim() !== '') {
    return res.status(200).json({
      success: true,
      ok: true,
      message: 'Enquiry received successfully.'
    });
  }

  // Validation
  const errors: Record<string, string> = {};
  if (!name || name.trim().length < 2) {
    errors.name = 'Please provide a valid name (at least 2 characters).';
  }
  if (!phone || phone.trim().length < 6) {
    errors.phone = 'Please provide a valid phone or WhatsApp number.';
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({
      success: false,
      ok: false,
      message: 'Please complete all required fields.',
      errors
    });
  }

  const newEnquiry: Enquiry = {
    id: `enq_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    name: name.trim(),
    phone: phone.trim(),
    email: email?.trim(),
    area: area?.trim(),
    message: message?.trim(),
    puppyId: puppyId?.trim(),
    source: source || 'puppy-detail',
    createdAt: new Date().toISOString()
  };

  const enquiries = getEnquiriesData();
  enquiries.push(newEnquiry);
  saveEnquiriesData(enquiries);

  console.log(`[ENQUIRY RECEIVED] from ${newEnquiry.name} (${newEnquiry.phone}) for ${newEnquiry.puppyId || 'General Visit'}`);

  // Dispatch email notification asynchronously
  sendEnquiryEmail(newEnquiry).catch(console.error);

  return res.status(201).json({
    success: true,
    ok: true,
    message: 'Your enquiry has been received! Our concierge team will reach out to you promptly on WhatsApp.',
    data: newEnquiry
  });
};

export const getEnquiries = (_req: Request, res: Response) => {
  const enquiries = getEnquiriesData();
  res.json({
    success: true,
    count: enquiries.length,
    data: enquiries
  });
};
