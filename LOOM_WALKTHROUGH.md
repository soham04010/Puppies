# Loom Video Walkthrough Script & Guide

> **Assignment Submission**: TeddyPups U.A.E. Full Stack Clone  
> **Reviewer**: Gaurav Teli & the Technical Team at Insta Biz Web  
> **Recommended Video Duration**: 4 – 6 minutes  
> **Screen-Sharing Setup**: Open browser with the live website on one tab, VS Code showing the repository on another, and terminal/network DevTools ready.

---

## 🎬 Video Recording Plan

```
Timeline Overview:
00:00 - 00:45 ➔ Introduction & Live Website Demo (UI, Cursor, Letterform)
00:45 - 01:45 ➔ Project Structure & Separation of Concerns (frontend/ & backend/)
01:45 - 02:45 ➔ Technologies & Architectural Implementation Decisions
02:45 - 03:45 ➔ AI Tools Used & Exact Prompts Disclosure (Per Assignment Guidelines)
03:45 - 04:45 ➔ Challenges Overcome & Problem-Solving Approach
04:45 - 05:30 ➔ Testing, Deployment Process & Conclusion
```

---

## 🗣️ Word-for-Word Script & Screen Actions

### 1. Introduction & Live Demo (00:00 – 00:45)
* **What to Show on Screen**: The running cloned website on `http://localhost:3000` (or your live deployed Vercel URL).
* **What to Say**:
  > *"Hi Gaurav and the Insta Biz Web technical team! My name is [Your Name], and this is my submission for the Technical Round Assignment: cloning the TeddyPups U.A.E. website.*  
  >  
  > *As you can see, I have replicated the complete design, typography, layout, responsiveness, and interactivity of the reference site. Notice the custom paw cursor that tracks across the screen, the gentle paw trail particles, and the exact warm cocoa, milk, and honey color palette.*  
  >  
  > *All pages are fully implemented and functional: the Homepage, Available Puppies catalog with real-time filtering, individual Puppy profile pages with multi-photo galleries, How it Works, Happy Families, Gone Home alumni, FAQ accordions, and the Contact page."*

---

### 2. Live Feature Demonstration (00:45 – 01:30)
* **What to Show on Screen**:
  1. Go to `/puppies` and click the filter pills (`Maltipoo`, `Showroom in Dubai`).
  2. Click into a puppy (e.g. `Max` or `Korean Teacup Maltipoo`).
  3. Scroll down to the signature letterform enquiry (`tp-letterform`).
  4. Submit an enquiry and show the confetti trigger and success state.
  5. Open browser DevTools Network tab to show the `POST /api/enquiries` request returning `201 Created`.
* **What to Say**:
  > *"Let's test the interactive features. On the catalog page, visitors can filter by breed or origin instantly without full page reloads. Clicking on a puppy brings us to their dedicated profile with photo carousels, inclusions, and the adoption roadmap.*  
  >  
  > *Down here is the custom postal letterform enquiry component. When I enter my details and submit, it sends a payload to our Express backend, triggers celebratory confetti, and displays an immediate confirmation message."*

---

### 3. Project Structure & Technologies (01:30 – 02:30)
* **What to Show on Screen**: Switch to VS Code and show the root directory with `frontend/` and `backend/`.
* **What to Say**:
  > *"Per the assignment requirements, I cleanly decoupled the application into two independent directories:*  
  >  
  > *In `frontend/`, I used Next.js App Router with React 19, TypeScript, and Tailwind CSS. We have our custom Google Fonts—Fraunces for luxury headings, Figtree for clean readability, and Shantell Sans for the handwritten notes. I implemented `generateStaticParams()` across all 42 individual puppy routes, ensuring fast static pre-rendering and optimal SEO.*  
  >  
  > *In `backend/`, I created a dedicated Node.js and Express REST API in TypeScript. It follows the MVC pattern with separated routes, controllers, and data storage for puppies, enquiries, testimonials, and FAQs. It includes security headers via Helmet, CORS configuration, and a honeypot field on the enquiry endpoint to protect against spam bots."*

---

### 4. AI Tools Used & Prompts Provided (02:30 – 03:30)
* **What to Show on Screen**: Show the `README.md` section titled *"AI Tools Policy & Prompts Disclosure"*.
* **What to Say**:
  > *"Regarding the AI Tools Policy: I used Google Antigravity as an AI pair-programming assistant to accelerate development.*  
  >  
  > *My approach was deliberate and structured:*  
  > *First, I prompted the agent to crawl the live reference website to inspect its asset structure, CSS tokens, and font families.*  
  > *Second, I wrote targeted prompts to scrape and structure the 42 puppy profiles and media assets into clean JSON datasets for our backend.*  
  > *Third, I directed the agent to scaffold the Express backend routes with honeypot validation, followed by the Next.js App Router frontend components.*  
  >  
  > *Using AI allowed me to handle asset extraction and repetitive boilerplate rapidly, freeing up time to focus on pixel-perfect CSS replication, edge-case debugging, and robust architectural separation."*

---

### 5. Implementation Decisions & Challenges (03:30 – 04:30)
* **What to Show on Screen**: Show `frontend/src/app/puppies/[slug]/PuppyGallery.tsx` and `backend/src/utils/pathResolver.ts`.
* **What to Say**:
  > *"I faced two key challenges during development:*  
  >  
  > *1. Custom Cursor Precision: To replicate the reference site's custom paw cursor faithfully without jitter on clickable elements, I mapped `/cursor/paw.svg` for default movement and `/cursor/paw-press.svg` for interactive states, complemented by a throttled mouse-trail canvas hook.*  
  >  
  > *2. Next.js 16 Static Generation & Resilience: Next.js 16 has strict rules for prerendering dynamic search parameters. I isolated the filtering logic into a client component wrapped in a Suspense boundary while pre-rendering all 42 puppy profile pages statically for instant loading.*  
  >  
  > *3. In addition, I built an offline fallback in the frontend's API client: it attempts live REST calls to the backend first, but if the backend is ever spinning up from cold storage, it seamlessly renders pre-seeded local data so the user never sees an error."*

---

### 6. Testing, Deployment & Closing (04:30 – 05:15)
* **What to Show on Screen**: Show terminal running clean build (`npm run build`) and the GitHub repository / live deployment link.
* **What to Say**:
  > *"Both frontend and backend are thoroughly tested with zero build errors and zero TypeScript warnings.*  
  >  
  > *For deployment, the frontend is deployed to Vercel connected to our GitHub repository with edge caching and SSL, and the backend is deployed on Render.*  
  >  
  > *Thank you for reviewing my technical assignment! I really enjoyed building this clone and look forward to discussing my submission with you in the technical interview. Have a great day!"*

---

## 📋 Checklist Before Submitting

1. [ ] Push all code to your GitHub repository:
   ```bash
   git add .
   git commit -m "feat: complete TeddyPups full stack clone with separate frontend and backend"
   git push origin main
   ```
2. [ ] Deploy `frontend/` to **Vercel** and get your Live URL.
3. [ ] Deploy `backend/` to **Render** or **Railway** (or use local/serverless fallback).
4. [ ] Record your Loom video using the script above (keep it under 6 minutes).
5. [ ] Reply to Gaurav Teli's email with the exact subject line:
   ```
   Technical Assignment Submission – [Your Full Name] – Insta Biz Web
   ```
   And include:
   * **Live Website URL**: `https://your-project.vercel.app`
   * **GitHub Repository URL**: `https://github.com/your-username/teddypups-clone`
   * **Loom Video URL**: `https://www.loom.com/share/...`
