# TeddyPups U.A.E. — Full Stack Clone Assignment

> **Technical Round Assignment for Insta Biz Web**  
> **Reference Website**: [https://puppy.instabizweb.com/](https://puppy.instabizweb.com/)  
> **Candidate Submission**: Full-stack clone matching design, layout, responsiveness, animations, custom cursor, interactive storybook components, and end-to-end functionality.

---

## 📌 Project Overview

This repository contains an end-to-end full-stack clone of the **TeddyPups U.A.E.** luxury pet boutique website (`https://puppy.instabizweb.com/`), structured cleanly into independent `frontend/` and `backend/` services.

* **Frontend**: Next.js App Router (React 19, TypeScript, Tailwind CSS, Turbopack)
* **Backend**: Node.js & Express REST API (TypeScript, CORS, Helmet, JSON Database)
* **Storybook Animations & Custom Features**:
  1. **Intro Blanket Curtain** (`IntroCurtain.tsx`): The signature opening blanket curtain with a running puppy SVG leaving animated paw print steps across the screen before gracefully lifting to reveal the page.
  2. **Mad-Libs Stationery Contact Letter** (`LetterForm.tsx`): Fill-in-the-blanks handwritten letter on ruled notebook paper with a red ledger line, custom underline inputs (`tp-blank`), sitting Teddy bear mascot SVG that breathes and winks (`pup-buddy`), and an interactive multi-phase postal submission animation:
     * `writing`: Live letterform inputs and puppy selector.
     * `sealing`: Letter folds up, postal envelope slides in, wax seal flap closes (`tp-letter-fold`, `tp-env-in`, `tp-flap-shut`).
     * `posting`: Mailbox pops up from below, envelope slides into the mail slot, yellow postal flag flips up (`tp-box-up`, `tp-env-post`, `tp-flag`).
     * `sent`: Celebratory confirmation card with confetti and WhatsApp concierge link.
  3. **Interactive WhatsApp Smartphone Simulator** (`JourneySection.tsx`): Section 4 features an interactive smartphone mockup with live WhatsApp UI, online status indicator, animated message groups with physics bounce (`tp-msg-in`), clickable breed chips, puppy photo album, showroom video clip player with custom play/pause button, animated flight route SVG, typing indicator, and direct WhatsApp send CTA.
  4. **Two Ways Wooden Signpost & Bobbing Flight** (`TwoWaysSection.tsx`): Section 3 features a wooden fork signpost (`tp-fork`), Dubai skyline with Burj Khalifa SVG and showroom window (`tp-way--left`), and Seoul-to-Dubai flight route with an animated bobbing airplane and porthole puppy view (`tp-way--right`).
  5. **Custom Paw Cursor & Interactive Paw Trail** (`PawTrail.tsx`): Custom SVG paw cursor (`paw.svg` and pressed state `paw-press.svg`) with interactive paw particle trail following mouse velocity.
  6. **Scroll-Driven Observer & Parallax 3D Tilt** (`ScrollObserver.tsx`): IntersectionObserver for smooth viewport reveals (`.is-revealed`) and interactive parallax 3D perspective tilt on mouse movement (`[data-pup-look]`).

---

## 📂 Project Structure

```
d:\Assignment\
│
├── frontend/                     # Next.js App Router Web Application
│   ├── public/
│   │   ├── cursor/               # paw.svg, paw-press.svg (custom cursors)
│   │   ├── brand/                # logo.png, favicons
│   │   └── media/                # High-resolution puppy photos, showroom video & galleries
│   ├── src/
│   │   ├── app/
│   │   │   ├── page.tsx          # Homepage (Hero, Pups, TwoWays, Journey, Reviews, FAQs, Letter)
│   │   │   ├── puppies/          # Available puppies catalog with live filters
│   │   │   ├── puppies/[slug]/   # Dynamic puppy profile with gallery & letterform (SSG pre-rendered)
│   │   │   ├── how-it-works/     # Showroom vs. international import guide
│   │   │   ├── happy-families/   # Wall of happy endings & testimonials
│   │   │   ├── gone-home/        # Archive of happily adopted puppies
│   │   │   ├── faq/              # Interactive 9-question accordion board
│   │   │   ├── contact/          # Showroom address, WhatsApp CTA, and Mad-Libs letterform
│   │   │   ├── health-guarantee/ # Veterinary standards & warranty policy
│   │   │   ├── terms/            # Terms of service
│   │   │   ├── privacy/          # Privacy policy
│   │   │   ├── layout.tsx        # Root layout (Fonts, IntroCurtain, PawTrail, ScrollObserver, Navbar, Footer)
│   │   │   └── globals.css       # Tailwind tokens & storybook animation styles
│   │   ├── components/
│   │   │   ├── IntroCurtain.tsx  # Opening blanket curtain with running puppy & paw prints
│   │   │   ├── LetterForm.tsx    # Mad-Libs stationery letterform & postal mailbox animation
│   │   │   ├── TwoWaysSection.tsx# Wooden fork signpost, Dubai skyline & airplane flight
│   │   │   ├── JourneySection.tsx# WhatsApp phone simulator with video clip & route animation
│   │   │   ├── ScrollObserver.tsx# Viewport reveal observer & mouse perspective tilt
│   │   │   ├── PawTrail.tsx      # Interactive paw particle trail on mouse move
│   │   │   ├── Navbar.tsx        # Floating storybook header with mobile drawer
│   │   │   ├── Footer.tsx        # Storybook footer with newsletter & social links
│   │   │   ├── PuppyCard.tsx     # Puppy card with badges, tags & hover transitions
│   │   │   └── FAQAccordion.tsx  # Smooth accordion component
│   │   ├── lib/api.ts            # Resilient API client with live fetch & seeded offline fallback
│   │   ├── styles/storybook.css  # 46 custom keyframes & storybook component styling
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

### Frontend
* **Framework**: Next.js 16 (App Router with Turbopack)
* **Language**: TypeScript 5.9
* **Styling**: Tailwind CSS v4 + Custom Storybook CSS (46 `@keyframes` animations)
* **Fonts**: `Fraunces` (serif heading), `Figtree` (body sans), `Shantell Sans` (handwritten scrawl)
* **Icons & Animation**: Lucide React, Canvas Confetti, SVG Morphing & CSS Transitions

### Backend
* **Runtime**: Node.js 20+
* **Framework**: Express.js 5
* **Security & Middleware**: Helmet, CORS (configured for localhost:3000 and production origins), Morgan logging, honeypot spam protection
* **Architecture**: MVC pattern with controllers, route routers, and static file resolution

---

## 🚀 How to Run the Project Locally

### Prerequisites
* Node.js 18.x or 20.x installed
* npm (bundled with Node.js)

### 1. Run the Backend API
```powershell
# Open a terminal in the project root
cd d:\Assignment\backend

# Install dependencies
npm install

# Start development server
npm run dev

# Or build and start production server
npm run build
npm start
```
* The backend will start on **`http://localhost:5000`**.
* Health check endpoint: `http://localhost:5000/api/health`
* Puppies endpoint: `http://localhost:5000/api/puppies`

### 2. Run the Frontend Web Application
```powershell
# Open a second terminal in the project root
cd d:\Assignment\frontend

# Install dependencies
npm install

# Start Next.js development server
npm run dev
```
* The frontend will start on **`http://localhost:3000`** (or `3001` if port 3000 is occupied).
* Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🌐 Deployment Instructions

### Deploy Frontend to Vercel (Recommended)
1. Push this repository to your GitHub account:
   ```bash
   git add .
   git commit -m "feat: complete website clone with animations and letterform"
   git push origin master
   ```
2. Log in to [Vercel](https://vercel.com) and click **"Add New Project"**.
3. Import your GitHub repository.
4. Set **Root Directory** to `frontend`.
5. Set Environment Variable:
   * `NEXT_PUBLIC_API_URL`: Your deployed backend URL (or leave blank; the frontend has an intelligent built-in fallback containing all 42 pre-rendered puppies and data).
6. Click **Deploy**. Vercel will build and generate all 54 static routes with 0 errors.

### Deploy Backend to Render / Railway
1. In Render or Railway, choose **"New Web Service"** and connect your GitHub repo.
2. Set **Root Directory** to `backend`.
3. Set **Build Command**: `npm install && npm run build`
4. Set **Start Command**: `npm start`
5. Set Environment Variables:
   * `PORT`: `5000`
   * `CLIENT_URL`: Your Vercel frontend URL
6. Click **Deploy**.

---

## 🎥 Loom Video Walkthrough

A comprehensive script and checklist is provided in [`LOOM_WALKTHROUGH.md`](file:///d:/Assignment/LOOM_WALKTHROUGH.md) covering:
1. Executive summary & project architecture.
2. Technologies and directory decoupling (`frontend/` vs. `backend/`).
3. AI tools and exact prompt engineering workflow.
4. Deep dive into the storybook animations:
   * Running puppy blanket curtain.
   * Mad-Libs stationery letterform with envelope folding and mailbox flag animation.
   * Interactive WhatsApp concierge smartphone simulator with video player.
   * Two Ways wooden signpost and bobbing airplane.
   * Custom paw cursor and particle trail.
5. Testing, building, and deployment process.

---

## 📄 Submission Checklist
- [x] Exact layout and design match with `https://puppy.instabizweb.com/`
- [x] All 11 pages built and pre-rendered
- [x] All 42 puppies scraped with photos and detailed profiles
- [x] Custom paw cursor and mouse trail active
- [x] Running puppy curtain intro animation active
- [x] Mad-Libs stationery contact form with envelope/mailbox animation active
- [x] WhatsApp phone simulator with video clip and route animation active
- [x] Fully decoupled `frontend/` and `backend/` directories
- [x] 0 build errors in TypeScript and Next.js static generation
