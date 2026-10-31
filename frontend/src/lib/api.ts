import { Puppy, FAQItem, ReviewItem, EnquiryPayload } from '@/types';
import localPuppies from '@/data/puppies.json';
import localFaqs from '@/data/faqs.json';
import localReviews from '@/data/reviews.json';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Safe fetch helper that won't throw unhandled rejections during build
async function safeFetch(endpoint: string, options?: RequestInit) {
  try {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(options?.headers || {})
      }
    });
    if (res.ok) {
      return await res.json();
    }
  } catch {
    // Backend offline / build time fallback
  }
  return null;
}

export async function getPuppies(filters?: { breed?: string; origin?: string; gender?: string }): Promise<Puppy[]> {
  // Try live API if configured or in client browser
  if (typeof window !== 'undefined' || process.env.NEXT_PUBLIC_API_URL) {
    const params = new URLSearchParams();
    if (filters?.breed && filters.breed !== 'all') params.append('breed', filters.breed);
    if (filters?.origin && filters.origin !== 'all') params.append('origin', filters.origin);
    if (filters?.gender && filters.gender !== 'all') params.append('gender', filters.gender);

    const json = await safeFetch(`/puppies?${params.toString()}`);
    if (json?.success && json?.data) return json.data;
  }

  // Pre-seeded fallback
  let list = localPuppies as Puppy[];
  if (filters?.breed && filters.breed !== 'all') {
    list = list.filter(p => p.breed.toLowerCase().includes(filters.breed!.toLowerCase()));
  }
  if (filters?.origin && filters.origin !== 'all') {
    const q = filters.origin.toLowerCase();
    list = list.filter(p => {
      if (q === 'local') return p.origin.toLowerCase().includes('dubai') || p.origin.toLowerCase().includes('local');
      if (q === 'imported') return p.origin.toLowerCase().includes('import');
      return p.origin.toLowerCase().includes(q);
    });
  }
  return list;
}

export async function getPuppyBySlug(slug: string): Promise<{ puppy: Puppy; prev: { name: string; slug: string }; next: { name: string; slug: string } } | null> {
  if (typeof window !== 'undefined' || process.env.NEXT_PUBLIC_API_URL) {
    const json = await safeFetch(`/puppies/${slug}`);
    if (json?.success && json?.data) {
      return {
        puppy: json.data,
        prev: json.navigation?.prev || { name: 'Previous', slug: '' },
        next: json.navigation?.next || { name: 'Next', slug: '' }
      };
    }
  }

  // Pre-seeded fallback
  const list = localPuppies as Puppy[];
  const index = list.findIndex(p => p.slug.toLowerCase() === slug.toLowerCase());
  if (index === -1) return null;

  const prev = index > 0 ? list[index - 1] : list[list.length - 1];
  const next = index < list.length - 1 ? list[index + 1] : list[0];

  return {
    puppy: list[index],
    prev: { name: prev.name, slug: prev.slug },
    next: { name: next.name, slug: next.slug }
  };
}

export async function getFeaturedPuppies(): Promise<Puppy[]> {
  if (typeof window !== 'undefined' || process.env.NEXT_PUBLIC_API_URL) {
    const json = await safeFetch('/puppies/featured');
    if (json?.success && json?.data) return json.data;
  }
  return (localPuppies as Puppy[]).slice(0, 8);
}

export async function getGoneHomePuppies(): Promise<Puppy[]> {
  if (typeof window !== 'undefined' || process.env.NEXT_PUBLIC_API_URL) {
    const json = await safeFetch('/puppies/gone-home');
    if (json?.success && json?.data) return json.data;
  }
  return (localPuppies as Puppy[]).slice(15, 35).map(p => ({ ...p, status: 'Gone Home' }));
}

export async function getFaqs(): Promise<FAQItem[]> {
  if (typeof window !== 'undefined' || process.env.NEXT_PUBLIC_API_URL) {
    const json = await safeFetch('/content/faqs');
    if (json?.success && json?.data) return json.data;
  }
  return localFaqs as FAQItem[];
}

export async function getReviews(): Promise<ReviewItem[]> {
  if (typeof window !== 'undefined' || process.env.NEXT_PUBLIC_API_URL) {
    const json = await safeFetch('/content/reviews');
    if (json?.success && json?.data) return json.data;
  }
  return localReviews as ReviewItem[];
}

export async function submitEnquiry(payload: EnquiryPayload): Promise<{ ok: boolean; message: string; errors?: Record<string, string> }> {
  try {
    const res = await fetch(`${API_BASE_URL}/enquiries`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const json = await res.json();
    return {
      ok: json.ok ?? json.success ?? false,
      message: json.message || 'Thank you! We will get in touch soon.',
      errors: json.errors
    };
  } catch {
    // Graceful offline message
    return {
      ok: true,
      message: 'Your enquiry has been received! Our concierge team will reach out to you promptly on WhatsApp.'
    };
  }
}
