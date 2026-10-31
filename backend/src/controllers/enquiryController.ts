import { Request, Response } from 'express';
import fs from 'fs';
import { resolveDataPath } from '../utils/pathResolver';

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

export const createEnquiry = (req: Request, res: Response) => {
  const { name, phone, email, area, message, puppyId, website, source } = req.body;

  // Honeypot spam detection
  if (website && website.trim() !== '') {
    // Silently return success to confuse bot scrapers
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
