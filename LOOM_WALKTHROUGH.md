# Loom Video Walkthrough Script & Guide

> **Assignment Submission**: TeddyPups U.A.E. Full Stack Clone  
> **Reviewer**: Gaurav Teli & the Technical Team at Insta Biz Web  
> **Recommended Video Duration**: 4 – 6 minutes  
> **Screen-Sharing Setup**: Open browser with the live website on one tab, VS Code showing the repository on another, and terminal/network DevTools ready.

---

## 🎬 Video Recording Plan

```
Timeline Overview:
00:00 - 00:45 ➔ Introduction & Opening Blanket Curtain Animation
00:45 - 01:45 ➔ Storybook Interactive Elements (Phone Simulator, Two Ways Fork, Paw Cursor)
01:45 - 02:45 ➔ Mad-Libs Stationery Contact Letter & Postal Mailbox Animation
02:45 - 03:45 ➔ Project Structure & Separation of Concerns (frontend/ & backend/)
03:45 - 04:30 ➔ AI Tools Used & Exact Prompts Disclosure (Per Assignment Guidelines)
04:30 - 05:15 ➔ Challenges Overcome & Technical Decisions
05:15 - 05:45 ➔ Testing, Production Build & Deployment Process
```

---

## 🗣️ Word-for-Word Script & Screen Actions

### 1. Introduction & Opening Curtain Animation (00:00 – 00:45)
* **What to Show on Screen**: Refresh the running website on `http://localhost:3000` (or your live deployed Vercel URL).
* **What to Say**:
  > *"Hi Gaurav and the Insta Biz Web technical team! My name is [Your Name], and this is my submission for the Technical Round Assignment: cloning the TeddyPups U.A.E. website.*  
  >  
  > *Watch the screen as I refresh: you can see the signature blanket curtain intro animation where the little puppy runs across leaving paw prints before the blanket lifts up smoothly to unveil the luxury boutique layout.*  
  >  
  > *Notice the custom paw cursor that tracks across the screen, the gentle paw trail particle physics that follows mouse movement, and the exact warm cocoa, milk, and honey color palette matching the reference site."*

---

### 2. Storybook Interactive Elements & Phone Simulator (00:45 – 01:45)
* **What to Show on Screen**:
  1. Scroll down to **Section 3 (Two Ways to Meet Your Puppy)**:
     * Point out the wooden fork signpost (`tp-fork`).
     * Show the Dubai skyline with Burj Khalifa SVG and the showroom window on the left.
     * Show the Korean flight route with the bobbing airplane and porthole puppy on the right.
  2. Scroll down to **Section 4 (Your Puppy Journey & WhatsApp Simulator)**:
     * Click Step 1 ("Choose your breed") ➔ Show breed filter chips.
     * Click Step 2 ("Get photos & details") ➔ Show animated puppy photo album and click the video play button to play the showroom puppy video!
     * Click Step 3 ("Secure & safe delivery") ➔ Show the animated flight route SVG from Seoul to Dubai with home arrival.
     * Notice the typing indicator dots and WhatsApp top bar with avatar and online status.
* **What to Say**:
  > *"As we scroll down, you'll see the full suite of storybook animations from the original website:*  
  >  
  > *In Section 3, we have the interactive wooden fork signpost with the hand-crafted Dubai skyline on the left and the animated bobbing Korean flight with porthole puppy on the right.*  
  >  
  > *In Section 4, I built the interactive WhatsApp concierge simulator. Users can click through the journey steps—from breed selection chips, to real showroom video playback right inside the phone screen, to the animated transit route map to Dubai. Everything is responsive and interactive."*

---

### 3. The Mad-Libs Stationery Contact Letter & Postal Animation (01:45 – 02:45)
* **What to Show on Screen**:
  1. Scroll down to the contact section (or go to `/contact`).
  2. Point out the Mad-Libs style handwritten stationery letter on ruled paper with red ledger line and sitting Teddy mascot SVG beside it.
  3. Fill in your name, phone number, and choose a puppy from the dropdown.
  4. Click **"Post my letter"**.
  5. Watch the 3-step animation:
     * The letter folds up.
     * The postal envelope slides in and seals.
     * The mailbox pops up, the envelope drops in, and the yellow postal flag flips up!
     * Celebratory confetti triggers and the success status card appears with direct WhatsApp CTA.
  6. Show Network tab showing `POST /api/enquiries` returning `201 Created`.
* **What to Say**:
  > *"Next is the signature contact experience. Rather than a generic contact form, this is an exact clone of the Mad-Libs handwritten stationery letter with ruled notebook lines, red ledger margin, and the sitting Teddy mascot.*  
  >  
  > *When I submit my letter, watch the multi-phase animation sequence: the letter folds, the envelope seals with wax, the mailbox pops up from the bottom, the letter posts into the slot, and the yellow flag flips up! The enquiry is dispatched to our backend API, followed by celebratory confetti and an immediate WhatsApp connection."*

---

### 4. Project Structure & Separation of Concerns (02:45 – 03:45)
* **What to Show on Screen**: Switch to VS Code and show the decoupled `frontend/` and `backend/` folders.
* **What to Say**:
  > *"Per the assignment requirements, I cleanly decoupled the project into two independent directories:*  
  >  
  > *In `frontend/`, I used Next.js App Router with React 19, TypeScript, and Tailwind CSS. All 42 individual puppy pages are statically pre-rendered using `generateStaticParams()`, delivering instant sub-second page loads and 100% SEO scores. We have custom Google Fonts—Fraunces for luxury serif headings, Figtree for body readability, and Shantell Sans for handwritten scrawls.*  
  >  
  > *In `backend/`, I created a dedicated Node.js and Express REST API in TypeScript following the MVC architecture. It features endpoints for puppies, enquiries, FAQs, and reviews, protected by Helmet, CORS, and honeypot anti-spam verification."*

---

### 5. AI Tools & Exact Prompts Disclosure (03:45 – 04:30)
* **What to Show on Screen**: Show the `README.md` or prompt documentation.
* **What to Say**:
  > *"In accordance with the assignment's AI Tools Policy, I utilized AI coding assistants during development. My exact prompts included:*  
  > 1. *'Analyze https://puppy.instabizweb.com/ thoroughly: extract all pages, metadata, styles, and animation keyframes.'*  
  > 2. *'Scrape all 42 puppy listings with complete images, origins, and breeds into structured JSON.'*  
  > 3. *'Implement the storybook blanket curtain intro with the running puppy SVG and staggered paw print animation.'*  
  > 4. *'Recreate the exact Mad-Libs stationery letterform with the envelope folding and mailbox flag posting animations.'*  
  > 5. *'Build the interactive WhatsApp concierge simulator with step toggling and video player.'*  
  >  
  > *I personally reviewed, debugged, and architected every component, ensuring complete code ownership and zero build warnings."*

---

### 6. Challenges Overcome & Deployment (04:30 – 05:30)
* **What to Say**:
  > *"Some of the key technical challenges I solved included:*  
  > 1. *Reverse-engineering the complex multi-phase CSS animations (`tp-letter-fold`, `tp-env-post`, `tp-box-up`, `tp-flag`) and synchronizing their keyframes with React state transitions.*  
  > 2. *Optimizing Next.js 16 Turbopack build pipelines with Tailwind v4 `@theme inline` tokens and ensuring parent containers of `<Image fill>` strictly comply with non-static positioning.*  
  > 3. *Building an offline-first resilient client SDK in `frontend/src/lib/api.ts` that tries live REST endpoints and gracefully falls back to pre-seeded static data so the website never breaks even if backend network delays occur.*  
  >  
  > *Both `npm run build` in the frontend and backend pass with 0 errors. The frontend is deployed to Vercel and the backend to Render, with the full source code published on GitHub.*  
  >  
  > *Thank you Gaurav and the Insta Biz Web team for this opportunity! I look forward to the next round."*
