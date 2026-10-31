# TeddyPups U.A.E. — Full Stack Clone Assignment

> **Technical Round Assignment for Insta Biz Web**  
> **Reference Website**: [https://puppy.instabizweb.com/](https://puppy.instabizweb.com/)  
> **Candidate Submission**: Full-stack clone matching design, layout, responsiveness, animations, custom cursor, and end-to-end functionality.

---

## 📌 Project Overview

This repository contains a full-stack replica of the **TeddyPups U.A.E.** luxury pet boutique website (`https://puppy.instabizweb.com/`), structured cleanly into independent `frontend/` and `backend/` services.

* **Frontend**: Next.js App Router (React 19, TypeScript, Tailwind CSS, Framer Motion)
* **Backend**: Node.js & Express REST API (TypeScript, CORS, Helmet, In-Memory/JSON Database)
* **Key Interactions**: Custom paw cursor (`paw.svg` & `paw-press.svg`), interactive mouse paw trail, filterable puppy catalog, image carousels, responsive mobile navigation, and the signature postal letter enquiry form (`tp-letterform`) with honeypot spam protection.

---

## 📂 Project Structure

```
d:\Assignment\
│
├── frontend/                     # Next.js App Router Web Application
│   ├── public/
│   │   ├── cursor/               # paw.svg, paw-press.svg (custom cursors)
│   │   ├── brand/                # logo.png, favicons
│   │   └── media/                # 42 high-resolution puppy photos & galleries
│   ├── src/
│   │   ├── app/
│   │   │   ├── page.tsx          # Homepage (Hero, Pups, Journey, Reviews, FAQs)
│   │   │   ├── puppies/          # Available puppies catalog with live filters
│   │   │   ├── puppies/[slug]/   # Dynamic puppy profile with gallery & letterform
│   │   │   ├── how-it-works/     # Showroom vs. international import guide
│   │   │   ├── happy-families/   # Wall of happy endings & testimonials
│   │   │   ├── gone-home/        # Archive of happily adopted puppies
│   │   │   ├── faq/              # Interactive 9-question accordion board
│   │   │   ├── contact/          # Showroom address, WhatsApp CTA, and letterform
│   │   │   ├── health-guarantee/ # Veterinary standards & warranty policy
│   │   │   ├── terms/            # Terms of service
│   │   │   ├── privacy/          # Privacy policy
│   │   │   ├── layout.tsx        # Root layout (Google Fonts, Navbar, Footer, PawTrail)
│   │   │   └── globals.css       # Tailwind tokens (Milk, Cocoa, Honey) & paw animations
│   │   ├── components/           # Navbar, Footer, PuppyCard, FilterBar, LetterForm, FAQAccordion, PawTrail
│   │   ├── lib/api.ts            # Client SDK with live backend fetch & offline fallback
│   │   ├── types/index.ts        # TypeScript definitions
│   │   └── data/                 # Seeded JSON datasets (puppies, reviews, faqs)
│   ├── package.json
│   └── next.config.ts
│
├── backend/                      # Decoupled Node.js + Express REST API
│   ├── src/
│   │   ├── controllers/          # puppyController, enquiryController, contentController
│   │   ├── routes/               # /api/puppies, /api/enquiries, /api/content
│   │   ├── data/                 # puppies.json, reviews.json, faqs.json
│   │   ├── utils/                # pathResolver (robust multi-environment path locator)
│   │   └── server.ts             # Express entry point (CORS, Helmet, Morgan, Port 5000)
│   ├── package.json
│   ├── tsconfig.json
│   └── .env.example
│
├── README.md                     # Comprehensive documentation & setup instructions
├── LOOM_WALKTHROUGH.md           # Word-for-word Loom video script & guide
└── .gitignore                    # Production git ignore configuration
```

---

## 🛠️ Technologies & Tools Used

### 1. Frontend
* **Next.js 16 (App Router)**: Server-side rendering, SSG for 42 puppy profile routes via `generateStaticParams()`, and automatic image optimization.
* **React 19 & TypeScript**: Component-driven architecture with end-to-end type safety.
* **Tailwind CSS**: Custom color palette mapping the reference brand:
  * Milk / Ivory: `#fffdf8`
  * Cocoa Brown: `#4a3728`
  * Warm Honey / Amber: `#f2be6b`
* **Typography Stack**:
  * Headings: `Fraunces` (warm editorial serif)
  * Body: `Figtree` (clean geometric sans)
  * Accent / Notes: `Shantell Sans` (handwritten cursive)
* **Lucide React**: Modern SVG icons for paws, checkmarks, phones, and arrows.
* **Framer Motion & Custom CSS**: Smooth card hover elevation, stamp rotation, and active click scaling.
* **Canvas Confetti**: Celebratory feedback on enquiry submission.

### 2. Backend
* **Node.js & Express.js (TypeScript)**: Clean RESTful endpoints following the MVC pattern.
* **Helmet & CORS**: Hardened HTTP security headers and cross-origin resource sharing.
* **Honeypot Anti-Spam Middleware**: Traps automated spam submissions without frustrating human users with CAPTCHAs.
* **Static Media Server**: Serves media files directly with caching headers.

---

## 🤖 AI Tools Policy & Prompts Disclosure

*Per the assignment guidelines, here is the transparent breakdown of AI tools and prompts used during development:*

* **AI Coding Assistant**: Google Antigravity (Gemini 3.8 Flash High)
* **Exact Prompts & Workflows**:
  1. *Site Analysis & Reverse Engineering*:
     > "Visit https://puppy.instabizweb.com/ and inspect headers, tech stack, routes, fonts, and responsive behavior."
  2. *Asset Extraction & Data Pipeline*:
     > "Scrape the 42 puppy profiles, images, FAQs, and reviews from the live sitemap, saving them to structured JSON and downloading high-resolution assets."
  3. *Backend Scaffolding*:
     > "Create a decoupled Node.js Express TypeScript REST API with routes for /api/puppies (with breed and origin filtering), /api/enquiries (with honeypot spam protection), /api/content, and /api/health."
  4. *Frontend Components & Styling*:
     > "Build Next.js App Router components matching the exact milk/cocoa palette, custom Fraunces/Figtree/Shantell Sans typography, paw cursor tracking, and the signature tp-letterform postal component."
  5. *Build Verification*:
     > "Audit prerendering and static site generation across all 42 puppy routes to ensure zero build errors."

---

## 🚀 Quick Start (Run Locally)

### Prerequisites
* **Node.js**: v18.0.0 or higher
* **npm**: v9.0.0 or higher

### 1. Start the Backend API (Port 5000)
```bash
cd backend
npm install
npm run build
npm start
```
* Backend health check: `http://localhost:5000/api/health`
* Puppies endpoint: `http://localhost:5000/api/puppies`

### 2. Start the Frontend App (Port 3000)
```bash
cd frontend
npm install
npm run build
npm start
```
* Open your browser at `http://localhost:3000`

---

## 🌐 Deployment Process

### Frontend Deployment (Vercel)
1. Push this repository to GitHub.
2. Go to [Vercel](https://vercel.com) and click **"Add New Project"**.
3. Select your repository and configure:
   * **Root Directory**: `frontend`
   * **Framework Preset**: `Next.js`
   * **Environment Variables**:
     * `NEXT_PUBLIC_API_URL` = `https://your-backend-service.onrender.com/api`
4. Click **Deploy**. Vercel will provide an instant HTTPS URL with global edge CDN caching.

### Backend Deployment (Render / Railway)
1. In [Render](https://render.com), create a new **Web Service**.
2. Connect your GitHub repository and set:
   * **Root Directory**: `backend`
   * **Build Command**: `npm install && npm run build`
   * **Start Command**: `npm start`
   * **Environment Variables**:
     * `PORT` = `5000`
     * `NODE_ENV` = `production`
3. Click **Create Web Service**.

---

## 💡 Implementation Decisions & Challenges Faced

1. **Custom Paw Cursor & Particle Trail**:
   * *Challenge*: Replicating the distinct cursor experience (`paw.svg` and `paw-press.svg`) across all desktop browsers without flickering or breaking clickable element pointers.
   * *Solution*: Implemented global CSS cursor declarations paired with a lightweight, throttled React mouse-trail hook (`PawTrail.tsx`) that creates fading paw prints upon movement.
2. **Next.js 16 Static Prerendering**:
   * *Challenge*: Next.js 16 flagged dynamic runtime data during static generation of the puppies catalog.
   * *Solution*: Decoupled the filter parameters into an interactive client component (`PuppiesClient.tsx`) wrapped in a `<Suspense>` boundary while retaining `generateStaticParams()` to statically pre-render all 42 individual puppy pages for sub-second page loads.
3. **Decoupled Architecture with Offline Resilience**:
   * *Challenge*: Ensuring the frontend functions flawlessly during recruiter evaluation even if the free-tier backend is spinning up from cold storage.
   * *Solution*: The frontend API client attempts live REST requests to the backend first, and gracefully falls back to local pre-seeded JSON data if the network is delayed.

---

## 📹 Loom Walkthrough Video

*See `LOOM_WALKTHROUGH.md` for the complete 5-minute video recording script, screen-sharing checklist, and presentation guide.*
