export interface MediaObject {
  id: string;
  url: string;
  kind: 'image' | 'video';
  width: number;
  height: number;
  alt: string;
  caption?: string;
  focalX?: number;
  focalY?: number;
  color?: string;
  blurDataUrl?: string | null;
  durationS?: number | null;
  poster?: MediaObject | null;
}

export interface BreedRef {
  slug: string;
  name: string;
}

export interface OriginRef {
  slug: string;
  name: string;
}

export interface CollectionRef {
  slug: string;
  name: string;
}

export interface Puppy {
  id: string;
  slug: string;
  name: string;
  displayName: string;
  breed: string;
  gender: 'male' | 'female' | 'male-female';
  genderLabel: string;
  age: string;
  colour?: string;
  description?: string;
  records?: string[];
  status: 'available' | 'reserved' | 'rehomed';
  featured?: boolean;
  seoDescription?: string;
  cover: MediaObject;
  media: MediaObject[];
  origin?: OriginRef;
  collections?: CollectionRef[];
  breeds: BreedRef[];
  published?: boolean;

  // Legacy compatibility fields if referenced anywhere
  title?: string;
  images?: string[];
  inclusions?: string[];
}

export interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

export interface ReviewItem {
  id: number;
  author: string;
  location: string;
  pet: string;
  rating: number;
  text: string;
  date: string;
}

export interface EnquiryPayload {
  name: string;
  phone: string;
  email?: string;
  area?: string;
  message?: string;
  puppyId?: string;
  website?: string;
  source?: 'puppy-detail' | 'contact-page';
}
