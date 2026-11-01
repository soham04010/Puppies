import type { Metadata } from 'next';
import { Fraunces, Figtree, Shantell_Sans } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import PawTrailCanvas from '@/components/PawTrailCanvas';
import IntroCurtain from '@/components/IntroCurtain';
import PupJourney from '@/components/PupJourney';
import ScrollObserver from '@/components/ScrollObserver';
import SmoothScroll from '@/components/SmoothScroll';

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
});

const figtree = Figtree({
  subsets: ['latin'],
  variable: '--font-figtree',
  display: 'swap',
});

const shantell = Shantell_Sans({
  subsets: ['latin'],
  variable: '--font-shantell',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://puppy.instabizweb.com'),
  title: 'TeddyPups U.A.E. — Premium teacup puppies in Dubai',
  description:
    'Teddy bear and teacup puppies in Dubai. Meet local puppies in our Downtown Dubai showroom or bring home a rare breed imported from trusted breeders.',
  keywords: [
    'teacup puppies dubai',
    'maltipoo dubai',
    'pomeranian dubai',
    'cavapoo dubai',
    'toy poodle uae',
    'teddypups uae'
  ],
  openGraph: {
    title: 'TeddyPups U.A.E. — Premium teacup puppies in Dubai',
    description:
      'Teddy bear and teacup puppies in Dubai. Meet local puppies in our Downtown Dubai showroom or bring home a rare breed imported from trusted breeders.',
    url: 'https://puppy.instabizweb.com',
    siteName: 'TeddyPups U.A.E.',
    images: [
      {
        url: '/brand/logo.png',
        width: 800,
        height: 600,
        alt: 'TeddyPups U.A.E.'
      }
    ],
    locale: 'en_AE',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TeddyPups U.A.E. — Premium teacup puppies in Dubai',
    description:
      'Teddy bear and teacup puppies in Dubai. Meet local puppies in our Downtown Dubai showroom or bring home a rare breed imported from trusted breeders.',
    images: ['/brand/logo.png']
  },
  icons: {
    icon: '/icon.png',
    apple: '/apple-icon.png'
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'PetStore',
    name: 'TeddyPups U.A.E.',
    description:
      'TeddyPups U.A.E. is a Dubai-based brand specializing in miniature puppies, offering premium services and worldwide shipping.',
    url: 'https://puppy.instabizweb.com',
    logo: 'https://puppy.instabizweb.com/brand/logo.png',
    telephone: '+971541676733',
    email: 'concierge@teddypups.ae',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Downtown Dubai, United Arab Emirates',
      addressLocality: 'Dubai',
      addressCountry: 'AE'
    },
    sameAs: [
      'https://www.instagram.com/teddypups.worldwide/',
      'https://www.tiktok.com/@teddypupsuae',
      'https://www.facebook.com/profile.php?id=61567496944539'
    ]
  };

  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${figtree.variable} ${shantell.variable} antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="flex min-h-screen flex-col bg-[#fffdf8] text-[#4a3728]">
        <SmoothScroll />
        <IntroCurtain />
        <PupJourney />
        <ScrollObserver />
        <Navbar />
        <main id="main" tabIndex={-1} className="flex-1 relative pt-[var(--header-h)] outline-none">
          {children}
        </main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
