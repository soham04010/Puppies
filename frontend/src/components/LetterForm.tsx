'use client';

import React, { useState } from 'react';
import { submitEnquiry } from '@/lib/api';
import confetti from 'canvas-confetti';
import { CheckCircle2, AlertCircle, Send, Sparkles } from 'lucide-react';

interface LetterFormProps {
  puppyId?: string;
  puppyName?: string;
  defaultMessage?: string;
}

export default function LetterForm({ puppyId, puppyName, defaultMessage }: LetterFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    area: '',
    message: defaultMessage || (puppyName ? `Hi! I'd love to know more about ${puppyName}.` : "Hi TeddyPups, I'd love to schedule a visit to your Downtown Dubai showroom!"),
    website: '' // honeypot
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');
    setFieldErrors({});

    const res = await submitEnquiry({
      ...formData,
      puppyId,
      source: puppyId ? 'puppy-detail' : 'contact-page'
    });

    if (res.ok) {
      setStatus('success');
      try {
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.7 }
        });
      } catch (err) {}
    } else {
      setStatus('error');
      setErrorMessage(res.message);
      if (res.errors) setFieldErrors(res.errors);
    }
  };

  return (
    <div className="tp-letterform relative">
      {/* Decorative Postal Stamp */}
      <div className="tp-letter__stamp select-none" aria-hidden="true">
        <span className="text-xl">🐾</span>
      </div>

      <div className="mb-6">
        <span className="font-scrawl text-2xl text-[#4a3728]">Dear TeddyPups,</span>
        <p className="mt-1 text-xs text-[#6a5340]">
          Leave your details and our concierge will get back to you promptly — or message us on WhatsApp for an immediate reply.
        </p>
      </div>

      {status === 'success' ? (
        <div className="rounded-2xl border border-[#ebd9c3] bg-[#fbf7ee] p-8 text-center animate-fade-in">
          <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-[#4a3728] text-white">
            <CheckCircle2 className="size-6 text-[#f2be6b]" />
          </div>
          <h4 className="mt-4 font-serif text-xl font-bold text-[#4a3728]">Thank You!</h4>
          <p className="mt-2 text-sm text-[#6a5340]">
            Your enquiry has been received. Our concierge team will reach out to you promptly on WhatsApp.
          </p>
          <button
            type="button"
            onClick={() => {
              setStatus('idle');
              setFormData({ ...formData, name: '', phone: '' });
            }}
            className="mt-6 rounded-full bg-[#4a3728] px-6 py-2 text-xs font-semibold text-white hover:bg-[#6a5340]"
          >
            Send Another Note
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          {status === 'error' && errorMessage && (
            <div className="flex items-center gap-2 rounded-xl bg-red-50 p-3 text-xs text-red-700 border border-red-200">
              <AlertCircle className="size-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Name */}
          <div>
            <label className="block text-xs font-semibold text-[#4a3728]">
              Your name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Sarah Al-Mansoori"
              className={`mt-1 h-12 w-full rounded-xl border ${
                fieldErrors.name ? 'border-red-400 ring-1 ring-red-400' : 'border-[#ebd9c3]'
              } bg-[#fffdf8] px-4 text-sm text-[#4a3728] outline-hidden focus:border-[#4a3728] focus:ring-2 focus:ring-[#f2be6b]/60 transition-all`}
            />
            {fieldErrors.name && (
              <p className="mt-1 text-[11px] text-red-600">{fieldErrors.name}</p>
            )}
          </div>

          {/* Phone or WhatsApp */}
          <div>
            <label className="block text-xs font-semibold text-[#4a3728]">
              Phone or WhatsApp number <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              required
              value={formData.phone}
              onChange={e => setFormData({ ...formData, phone: e.target.value })}
              placeholder="+971 50 123 4567"
              className={`mt-1 h-12 w-full rounded-xl border ${
                fieldErrors.phone ? 'border-red-400 ring-1 ring-red-400' : 'border-[#ebd9c3]'
              } bg-[#fffdf8] px-4 text-sm text-[#4a3728] outline-hidden focus:border-[#4a3728] focus:ring-2 focus:ring-[#f2be6b]/60 transition-all`}
            />
            <p className="mt-1 text-[11px] text-[#6a5340]">With country code, e.g. +971 or +1</p>
          </div>

          {/* Email & Area in 2 columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-[#4a3728]">
                Email <span className="text-xs text-[#6a5340]">(optional)</span>
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                placeholder="sarah@example.com"
                className="mt-1 h-12 w-full rounded-xl border border-[#ebd9c3] bg-[#fffdf8] px-4 text-sm text-[#4a3728] outline-hidden focus:border-[#4a3728] focus:ring-2 focus:ring-[#f2be6b]/60 transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-[#4a3728]">
                Your area <span className="text-xs text-[#6a5340]">(optional)</span>
              </label>
              <input
                type="text"
                value={formData.area}
                onChange={e => setFormData({ ...formData, area: e.target.value })}
                placeholder="e.g. Dubai Marina"
                className="mt-1 h-12 w-full rounded-xl border border-[#ebd9c3] bg-[#fffdf8] px-4 text-sm text-[#4a3728] outline-hidden focus:border-[#4a3728] focus:ring-2 focus:ring-[#f2be6b]/60 transition-all"
              />
            </div>
          </div>

          {/* Message */}
          <div>
            <label className="block text-xs font-medium text-[#4a3728]">
              Message <span className="text-xs text-[#6a5340]">(optional)</span>
            </label>
            <textarea
              rows={3}
              value={formData.message}
              onChange={e => setFormData({ ...formData, message: e.target.value })}
              className="mt-1 w-full rounded-xl border border-[#ebd9c3] bg-[#fffdf8] p-4 text-sm text-[#4a3728] outline-hidden focus:border-[#4a3728] focus:ring-2 focus:ring-[#f2be6b]/60 transition-all resize-none"
            />
          </div>

          {/* Silent Honeypot Field */}
          <div className="hidden" aria-hidden="true">
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              value={formData.website}
              onChange={e => setFormData({ ...formData, website: e.target.value })}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={status === 'submitting'}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#4a3728] py-3.5 text-sm font-semibold tracking-wide text-[#fffdf8] shadow-sm hover:bg-[#6a5340] active:scale-98 transition-all disabled:opacity-70"
          >
            {status === 'submitting' ? (
              <span>Sending your note...</span>
            ) : (
              <>
                <Send className="size-4 text-[#f2be6b]" />
                <span>Send enquiry</span>
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}
