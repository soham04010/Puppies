export interface Puppy {
  id: string;
  slug: string;
  name: string;
  title: string;
  breed: string;
  gender: string;
  age: string;
  origin: string;
  status: 'Available' | 'Reserved' | 'Gone Home';
  images: string[];
  inclusions: string[];
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
  website?: string; // honeypot
  source?: 'puppy-detail' | 'contact-page';
}
