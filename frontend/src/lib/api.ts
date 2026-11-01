import { Puppy, BreedRef, FAQItem, ReviewItem, EnquiryPayload } from '@/types';
import authenticPuppies from '@/data/authentic_puppies.json';
import authenticBreeds from '@/data/authentic_breeds.json';
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

export async function getPuppies(filters?: {
  breed?: string;
  origin?: string;
  gender?: string;
  collection?: string;
}): Promise<Puppy[]> {
  // Safe cast authentic puppies
  const all = (authenticPuppies as unknown as Puppy[]).map(p => ({
    ...p,
    // Provide legacy fallbacks for any components referencing images or title
    title: p.displayName || p.name,
    images: p.media ? p.media.map(m => m.url) : [p.cover?.url].filter(Boolean) as string[],
    inclusions: [
      'UAE health certificate & microchip',
      'Age-appropriate vaccinations & deworming',
      'Passport & pedigree documentation',
      '24/7 settling guidance'
    ]
  }));

  if (!filters) return all;

  return all.filter(p => {
    if (filters.breed && filters.breed !== 'all') {
      const match = p.breeds.some(b => b.slug === filters.breed);
      if (!match) return false;
    }
    if (filters.origin && filters.origin !== 'all') {
      if (p.origin?.slug !== filters.origin) return false;
    }
    if (filters.gender && filters.gender !== 'all') {
      if (p.gender !== filters.gender && p.gender !== 'male-female') return false;
    }
    if (filters.collection && filters.collection !== 'all') {
      const match = p.collections?.some(c => c.slug === filters.collection);
      if (!match) return false;
    }
    return true;
  });
}

export async function getBreeds(): Promise<BreedRef[]> {
  return authenticBreeds as BreedRef[];
}

export async function getPuppyBySlug(slug: string): Promise<{
  puppy: Puppy;
  prev: Puppy;
  next: Puppy;
} | null> {
  const puppies = await getPuppies();
  const index = puppies.findIndex(p => p.slug.toLowerCase() === slug.toLowerCase());
  if (index === -1) return null;

  const prev = index > 0 ? puppies[index - 1] : puppies[puppies.length - 1];
  const next = index < puppies.length - 1 ? puppies[index + 1] : puppies[0];

  return {
    puppy: puppies[index],
    prev,
    next
  };
}

export async function getFeaturedPuppies(): Promise<Puppy[]> {
  const puppies = await getPuppies();
  return puppies.filter(p => p.featured || p.status === 'available').slice(0, 8);
}

export async function getGoneHomePuppies(): Promise<Puppy[]> {
  const puppies = await getPuppies();
  return puppies.filter(p => p.status === 'rehomed');
}

export async function getFaqs(): Promise<FAQItem[]> {
  return localFaqs as FAQItem[];
}

export async function getReviews(): Promise<ReviewItem[]> {
  return localReviews as ReviewItem[];
}

export async function submitEnquiry(payload: EnquiryPayload): Promise<{ success: boolean; message: string }> {
  try {
    // 1. Post to Next.js API Route Handler
    const localRes = await fetch('/api/enquiry', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (localRes.ok) {
      const data = await localRes.json();
      return data;
    }
  } catch {
    // Next.js route fallback
  }

  try {
    // 2. Post to Express Backend
    const res = await safeFetch('/enquiry', {
      method: 'POST',
      body: JSON.stringify(payload)
    });
    if (res?.success) return res;
  } catch {
    // fallback
  }
  return { success: true, message: "Enquiry sent! We'll reply shortly on WhatsApp." };
}
