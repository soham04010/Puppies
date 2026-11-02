# TeddyPups U.A.E. — Full-Stack Technical Evaluation

> **Insta Biz Web Technical Assessment**  
> **Reference Website**: [https://puppy.instabizweb.com/](https://puppy.instabizweb.com/)  
> **Submission by**: Soham Chaudhari  
> **Repository**: [https://github.com/soham04010/Puppies](https://github.com/soham04010/Puppies)

An end-to-end, pixel-precise full-stack replication of the **TeddyPups U.A.E.** boutique pet platform. Built with decoupled `frontend/` (Next.js 16 App Router) and `backend/` (Node.js & Express REST API) services, featuring custom storybook SVG animations, viewport-fixed mascot journey physics, hardware-accelerated canvas cursor trails, and a live email notification pipeline.

---

## 🏗️ Architecture & Project Structure

The project is structured as a decoupled monorepo containing a high-performance Next.js web application and an Express.js API backend:

```
├── frontend/                         # Next.js 16 App Router Web Application
│   ├── public/
│   │   ├── cursor/                   # Custom SVG cursors (paw.svg & paw-press.svg)
│   │   ├── brand/                    # Brand assets, logos, and icons
│   │   └── media/                    # Local high-resolution puppy photos & polaroids
│   ├── src/
│   │   ├── app/
│   │   │   ├── page.tsx              # Homepage (Hero, Meet Pups, Two Ways, Journey, Families, Dusk, FAQs)
│   │   │   ├── puppies/              # Puppy Catalog with live breed/origin filters & gaze tracker
│   │   │   ├── puppies/[slug]/       # Storybook detail page with 3D flip card & specs board
│   │   │   ├── happy-families/       # 64-Polaroid masonry memory wall with washi tape & lightbox
│   │   │   ├── how-it-works/         # Flight route scroll animation, passport promise, & care board
│   │   │   ├── faq/                  # Pushpin notice board with 3D paper flaps & search sniffing
│   │   │   ├── contact/              # Boutique shopfront card, Dubai skyline SVG & letterform
│   │   │   ├── gone-home/            # Archive catalog of happily rehomed puppies
│   │   │   ├── api/
│   │   │   │   └── enquiry/route.ts  # Serverless email dispatch handler with Nodemailer
│   │   │   ├── layout.tsx            # Global layout with Canvas paw trail, SmoothScroll & Curtain
│   │   │   └── globals.css           # Tailwind CSS imports & global storybook tokens
│   │   ├── components/
│   │   │   ├── PupJourney.tsx        # Viewport-fixed bezier interpolation puppy mascot engine
│   │   │   ├── PupBuddy.tsx          # Multi-pose SVG mascot (sit, run, snug, happy, tilt, paw)
│   │   │   ├── PawTrailCanvas.tsx    # High-DPI 2D canvas cursor paw trail particle animation
│   │   │   ├── LetterForm.tsx        # Stationery letterform with 4-phase sealing/posting animation
│   │   │   ├── IntroCurtain.tsx      # Signature blanket curtain with running puppy paw steps
│   │   │   ├── Navbar.tsx            # Scalloped boutique navbar with active indicators
│   │   │   ├── Footer.tsx            # Dark night footer with wavy hill silhouette & moon
│   │   │   └── WhatsAppButton.tsx    # Floating concierge button with pulsing notification badge
│   │   ├── data/                     # Authentic scraped dataset (puppies, breeds, FAQs, polaroids)
│   │   ├── lib/
│   │   │   └── api.ts                # Client API bridge with automatic serverless failover
│   │   ├── styles/
│   │   │   └── storybook.css         # 46+ custom @keyframes and paper/sketched CSS primitives
│   │   └── types/                    # Comprehensive TypeScript interfaces
│   ├── vercel.json                   # Vercel framework configuration
│   ├── package.json
│   └── tsconfig.json
│
├── backend/                          # Decoupled Express.js REST API
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── puppyController.ts    # Filterable catalog queries & slug resolvers
│   │   │   ├── enquiryController.ts  # Email notification dispatcher & file persistence
│   │   │   └── contentController.ts  # Static CMS endpoints for FAQs, reviews, & stories
│   │   ├── routes/
│   │   │   ├── puppyRoutes.ts        # /api/puppies, /api/puppies/:slug, /api/puppies/featured
│   │   │   ├── enquiryRoutes.ts      # /api/enquiry & /api/enquiries (POST/GET)
│   │   │   └── contentRoutes.ts      # /api/content/faqs, /api/content/reviews
│   │   ├── utils/
│   │   │   └── pathResolver.ts       # Robust multi-environment relative path resolver
│   │   └── server.ts                 # Express entry point (dynamic CORS, Helmet, Morgan)
│   ├── package.json
│   └── tsconfig.json
│
├── render.yaml                       # Render Web Service Blueprint specification
└── README.md                         # Project documentation
```

---

## 🎨 How We Built It: Key Engineering Highlights

### 1. Viewport-Fixed Mascot Physics (`PupJourney.tsx` & `PupBuddy.tsx`)
- The puppy mascot ("Teddy") accompanies the visitor down the page using bezier interpolation across 9 semantic section anchors (`#hero`, `#meet-pups`, `#two-ways`, `#journey`, `#memories`, `#trust`, `#dusk`, `#faq`, `#footer`).
- Calculates dynamic look-at targets toward interactive elements, turns facing direction via exponential damping (`turn = 0.07`), and switches poses (`run`, `sit`, `paw`, `happy`, `snug`, `tilt`) depending on scroll velocity and stop targets.
- Features front-facing snug basket integration in the footer with zero clipping.

### 2. Global Canvas Cursor Paw Trail (`PawTrailCanvas.tsx`)
- High-DPI hardware-accelerated 2D canvas overlay layer (`z-[70]`) mounted globally in `layout.tsx`.
- Monitors mouse and trackpad velocity on fine-pointer devices:
  - Stamps an authentic puppy paw print every `46px` of travel.
  - Alternates left and right paws with a `7px` lateral offset along the normal of the motion vector (`angle = atan2(dy, dx) + π/2`).
  - Stamps instant paw prints on click/pointerdown.
  - Rotates each paw in the trajectory direction and dissolves over 1000ms using a smooth quadratic curve (`globalAlpha = 0.42 * alpha²`).

### 3. Interactive Stationery Letterform & 4-Phase Postal Animation (`LetterForm.tsx`)
- Realistic lined notebook paper with red ledger rule, paw stamp, and inline dashed blanks (`name`, `phone`, `email`, `area`, `puppyId`).
- Automated multi-stage mechanical postal submission sequence:
  1. `writing`: Interactive client letterform with validation and bot honeypot.
  2. `sealing`: Letter scales down and folds into a cream envelope with a red wax stamp.
  3. `posting`: An illustrated mailbox emerges from below, the envelope slides through the slot, and the yellow flag raises.
  4. `sent`: Postbox rests with raised flag, displaying a confirmation message, confetti burst, and direct WhatsApp CTA.

### 4. Live Email Notification System (`/api/enquiry`)
- Form submissions are captured and dispatched via **Nodemailer** directly to `chaudharisoham041@gmail.com`.
- Every email is formatted with a branded HTML template containing:
  - Prospective parent name, phone/WhatsApp (with direct `wa.me/` one-click chat link), email, and location.
  - Resolved puppy name (e.g. *"Max (Maltipoo, boy)"*).
  - Client message notes and source attribution.
- Supported in both Next.js App Router API Route (`frontend/src/app/api/enquiry/route.ts`) for serverless deployments (Vercel) and the Express backend controller (`backend/src/controllers/enquiryController.ts`).

### 5. 3D Paper Accordion Notice Board (`NoticeBoard.tsx` on `/faq`)
- Atmospheric dark-tone room scene with a glowing radial lamp.
- Multi-colored pushpins (`var(--color-toffee)`, `var(--color-sky-deep)`, `#d9a13c`, `#c45a6a`) with randomized paper tilts.
- 3D mechanical fold/unfold animation (`rotateX(-82deg)` to `0deg`).
- Real-time question sniffing filter with magnifying glass, dynamic counter, `<mark>` keyword highlighting, and Teddy mascot companion.

### 6. Wall of Happy Endings (`HappyFamiliesWall.tsx` on `/happy-families`)
- 64 authentic family moments served from local high-resolution storage.
- Multi-column masonry layout with washi tape attachments, subtle realistic tilts, and animated paw stamps.
- Fullscreen lightbox viewer with swipe gesture navigation, keyboard controls, and preloading.

---

## 🛠️ Technology Stack

| Domain | Technologies |
|---|---|
| **Frontend Framework** | **Next.js 16.4** (App Router, Turbopack, React 19) |
| **Styling & Design** | **Tailwind CSS v4**, Custom Storybook CSS (46+ `@keyframes`), SVG Morphing |
| **Typography** | `Fraunces` (serif heading), `Figtree` (sans body), `Shantell Sans` (handwritten cursive) |
| **Animations & Effects** | **Framer Motion**, Canvas Confetti, Path2D Canvas API, Bezier Curves |
| **Backend Framework** | **Node.js 20+**, **Express.js 4.21**, **TypeScript 5.7** |
| **Email Service** | **Nodemailer** (Google SMTP / App Password) |
| **Security & Middleware** | Helmet, CORS, Morgan logger, Honeypot bot protection |

---

## 💻 Local Development Setup

### Prerequisites
- **Node.js**: v18.x or v20+ installed
- **npm**: v9+ (bundled with Node.js)
- **Git**

### 1. Clone the Repository
```bash
git clone https://github.com/soham04010/Puppies.git
cd Puppies
```

### 2. Configure Environment Variables
In `frontend/`, create a `.env.local` file:
```env
NOTIFICATION_EMAIL=chaudharisoham041@gmail.com
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=chaudharisoham041@gmail.com
SMTP_PASS=dgvateetjahambxb
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

In `backend/`, create a `.env` file:
```env
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
NOTIFICATION_EMAIL=chaudharisoham041@gmail.com
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=chaudharisoham041@gmail.com
SMTP_PASS=dgvateetjahambxb
```

### 3. Run the Backend API
```bash
cd backend
npm install
npm run dev
```
- API will start on: **`http://localhost:5000`**
- Health check: `http://localhost:5000/api/health`

### 4. Run the Frontend Web Application
In a separate terminal:
```bash
cd frontend
npm install
npm run dev
```
- Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🚀 Deployment Guide

### Deploying Frontend to Vercel
1. Go to [vercel.com/new](https://vercel.com/new) and import the repository: `soham04010/Puppies`.
2. Configure Project settings:
   - **Root Directory**: Select **`frontend`** *(Important: must point to `frontend`)*.
   - **Framework Preset**: `Next.js` (detected automatically).
   - **Build Command**: `next build` (default).
   - **Output Directory**: `.next` (default).
3. Add Environment Variables:
   - `NOTIFICATION_EMAIL`: `chaudharisoham041@gmail.com`
   - `SMTP_HOST`: `smtp.gmail.com`
   - `SMTP_PORT`: `465`
   - `SMTP_USER`: `chaudharisoham041@gmail.com`
   - `SMTP_PASS`: `dgva teet jaha mbxb`
   - `NEXT_PUBLIC_API_URL`: Your Render backend URL (optional; internal serverless `/api/enquiry` handles submissions directly).
4. Click **Deploy**. Vercel will compile and generate all 28 static routes with 0 errors.

### Deploying Backend to Render
1. Go to [dashboard.render.com](https://dashboard.render.com/) → **New +** → **Web Service**.
2. Connect repository: `soham04010/Puppies`.
3. Configure settings:
   - **Name**: `teddypups-backend`
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install --include=dev && npm run build`
   - **Start Command**: `npm start`
4. Add Environment Variables:
   - `NODE_ENV`: `production`
   - `NOTIFICATION_EMAIL`: `chaudharisoham041@gmail.com`
   - `SMTP_HOST`: `smtp.gmail.com`
   - `SMTP_PORT`: `465`
   - `SMTP_USER`: `chaudharisoham041@gmail.com`
   - `SMTP_PASS`: `dgva teet jaha mbxb`
   - `FRONTEND_URL`: Your Vercel frontend URL (e.g. `https://teddypups.vercel.app`)
5. Click **Create Web Service**.

---

## 📋 Quality Verification
- [x] **0 TypeScript Compilation Errors**: Clean builds on both `npm --prefix frontend run build` and `npm --prefix backend run build`.
- [x] **Responsive Layouts**: Pixel-accurate rendering tested across Mobile (375px–430px), Tablet (768px–1024px), and Desktop (1440px+).
- [x] **Cross-Browser Interactive Components**: Tested cursor paw trail, postal animations, audio triggers, and 3D paper accordion on modern Chromium, WebKit, and Gecko engines.
- [x] **Decoupled Architecture**: Fully separated `frontend/` and `backend/` directories with independent dependencies and build workflows.
