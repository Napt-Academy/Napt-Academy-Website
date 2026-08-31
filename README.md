# Guardian Path Builder

You are a senior Next.js architect, UI/UX designer, frontend engineer, and technical SEO specialist.

I need you to build a complete production-ready website for **NAPT Academy** using **Next.js**.

I have attached 5 reference screenshots showing the existing website:

1. Home page
2. About Us page
3. Contact Us page
4. Our Training Centers page
5. Services page

Use these screenshots as the **primary visual and content reference**.

The goal is NOT to place the screenshots on the website. Recreate the website as a real, responsive, accessible, dynamic Next.js application using HTML, React components, CSS/Tailwind, optimized images, and reusable data-driven components.

---

# 1. TECHNOLOGY REQUIREMENTS

Use:

* Next.js latest stable version
* App Router
* TypeScript
* Tailwind CSS
* React
* Lucide React for icons
* Next/Image for all images
* Vercel Blob for dynamic image/media storage
* Vercel Blob for JSON/content storage where appropriate
* Server Components by default
* Client Components only where interaction is required
* Responsive design for mobile, tablet and desktop
* Semantic HTML5
* Accessible UI
* SEO-friendly architecture

Use a clean component architecture.

Do NOT create one huge page component.

The website should be easy to maintain and extend later.

---

# 2. IMPORTANT: DYNAMIC ARCHITECTURE

This must be a **dynamic website**.

Do NOT hardcode all content directly inside JSX components.

Create a data/content layer.

Store dynamic content in Vercel Blob.

Use Vercel Blob for:

* Hero images
* Gallery images
* Training-center images
* Staff/team images
* Service-related images
* Other website media
* JSON content/configuration

For example, organize Blob assets logically:

/napt/
/images/
/hero/
/about/
/services/
/training-centers/
/gallery/
/team/
/testimonials/
/content/
site.json
home.json
about.json
services.json
training-centers.json
contact.json

Use environment variables such as:

BLOB_READ_WRITE_TOKEN

Never expose private environment variables to the browser.

Create a clean abstraction such as:

lib/blob.ts
lib/content.ts

so the UI does not directly depend on Blob implementation details.

If Vercel Blob is unavailable during local development, create a fallback local JSON data layer so the project can still run locally.

The architecture should make it easy to replace local JSON with Vercel Blob content without rewriting the UI.

---

# 3. ROUTES

Create these routes:

/

/about-us

/services

/our-training-centers

/contact-us

Navigation should work correctly between all pages.

Use proper Next.js App Router routing.

---

# 4. DESIGN STYLE

Recreate the visual identity from the screenshots.

The overall visual style should feel:

* Military
* Professional
* Premium
* Disciplined
* Trustworthy
* Institutional
* Modern
* Clean
* Elegant

Primary colors:

* Dark olive green
* Deep military green
* Mustard/golden yellow
* Warm beige
* Off-white
* Charcoal/dark footer

Approximate palette:

--primary-green: #4B5518
--dark-green: #263A2D
--gold: #E3C400
--beige: #D8CDA5
--cream: #F7F6F1
--dark: #171D20
--white: #FFFFFF

Do not blindly use these exact values if the screenshot suggests a better match. Visually match the reference.

Typography:

Use an elegant serif font for major headings, similar to:

* Playfair Display
* Cormorant Garamond

Use a clean sans-serif font for body text, navigation and UI:

* Inter
* Poppins
* Manrope

Headings should have the elegant editorial/military-academy feeling visible in the screenshots.

---

# 5. GLOBAL HEADER

Create one reusable Header component.

Desktop:

* Olive-green background
* NAPT logo on the left
* Navigation on the right
* Home
* About Us
* Services
* Our Training Centers
* Contact Us

Active navigation item should be highlighted in the mustard/gold color.

The header should work properly on every page.

On desktop, maintain the compact appearance shown in the screenshots.

On mobile:

* Hamburger menu
* Slide/dropdown navigation
* Smooth open/close animation
* Accessible keyboard interaction
* Close menu after navigation

For the Home page, the header can overlay the hero/banner so the banner starts behind the navigation.

For internal pages, use the same visual language.

Make the header sticky where appropriate without causing layout problems.

---

# 6. HOME PAGE

The Home page must be recreated from the first screenshot.

IMPORTANT:

## HERO / BANNER

The Home hero must be a **full viewport-height banner**.

Use:

min-height: 100svh;

and ensure it works correctly on mobile browsers.

The hero should contain:

* Full-screen background image
* Dark cinematic overlay
* Centered content
* Small eyebrow text: "CAREER"
* Large heading:

"Guiding
Warriors to the
Right Path"

* Supporting text:

"Step into a place of discipline, purpose, and service. We help aspiring candidates prepare for recruitment and succeed in the selection process."

Use a military training / armed forces image from Unsplash temporarily.

The image should cover the entire viewport:

background-size: cover;

Use a dark gradient overlay so the text remains highly readable.

The hero should look premium and cinematic.

Add subtle entrance animations.

Do NOT make the hero short like a normal banner.

It should visually dominate the first viewport.

---

# 7. HOME — OUR SERVICES

After the hero, recreate:

OUR SERVICES

SERVING ALL BRANCHES WITH HONOUR

Create three categories.

## Indian Armed Forces

Cards:

1. Indian Army Preparation
2. Indian Air Force
3. Indian Navy Preparation

Each card should have:

* Logo/icon/image
* Title
* White background
* Rounded corners
* Subtle shadow
* Clean spacing

Use temporary representative military insignia/images if actual logos are not available.

Do not use copyrighted official logos unless provided by the user.

---

## Paramilitary Forces

Create an auto-playing horizontal carousel.

Visible cards on desktop should resemble the screenshot.

Include cards such as:

* CRPF (Central Reserve Police Force)
* ITBP (Indo-Tibetan Border Police)
* SSB (Sashastra Seema Bal)

The carousel must:

* Auto-play
* Have previous/next arrows
* Have pagination dots
* Pause on hover
* Resume when mouse leaves
* Support touch/swipe on mobile
* Be keyboard accessible
* Have smooth transitions

---

## Police Forces (Physical Training)

Create another carousel with:

* Kerala Police
* Excise
* Forest

Use the same carousel interaction pattern.

---

# 8. HOME — MISSION / VISION / VALUES

Create three elegant cards:

### Our Mission

"To empower every aspiring defence candidate with personalised guidance, expert mentorship, and the confidence to serve the nation with pride and purpose."

### Our Vision

"To become a leading pre-recruitment training institute for Indian Armed Forces, shaping disciplined and capable individuals, who uphold National security and integrity."

### Our Values

"Integrity, dedication, and service. We uphold the highest standards in our training, ensuring our trainers and educators are always prepared to guide every candidate toward success."

Use:

* Green icon badge
* White background
* Thin border
* Rounded corners
* Subtle shadow
* Clean typography

---

# 9. HOME — STATISTICS / CAREER SECTION

Recreate the beige section from the screenshot.

Heading:

"Building Careers
That Serve The
Nation"

Supporting copy should communicate:

NAPT is dedicated to guiding candidates toward prestigious careers in Indian Armed Forces — Army, Air Force and Coast Guard — through proven methodologies, expert trainers, and strong institutional networks.

Statistics:

* 17+ Years of Defence Experience
* 10+ Certified Defence Mentors
* 7,000+ Candidates Trained

Use large numbers with elegant icons.

The 7,000+ statistic should have the stronger visual emphasis similar to the reference.

---

# 10. HOME — MOMENTS OF PRIDE AND PREPARATION

Heading:

"Moments of Pride and
Preparation"

Supporting text:

"Explore snapshots from our training sessions, student achievements, and special events that showcase the discipline, determination, and spirit of our future warriors."

Create an image gallery/carousel.

Use temporary Unsplash images related to:

* Military training
* Running tracks
* Physical fitness
* Group training
* Cadets
* Defence preparation

Use 3 visible images on desktop.

Add:

* Auto-slide
* Navigation dots
* Smooth transitions
* Responsive behavior
* Touch support

---

# 11. HOME — TESTIMONIALS

Heading:

"What Our Students Say"

Supporting text:

"At NAPT, we take pride in the success of our students. Their hard work, dedication and our expert guidance have helped them achieve their career goals. Here's what they have to say about their journey with us."

Create a responsive testimonial grid.

Use the testimonial content visible in the reference screenshot.

Include:

* Student name
* Short review
* Star rating
* Clean white cards
* Very light gray/blue background section

Make 6 testimonial cards.

Use realistic typography and spacing.

Do not invent completely different testimonials. Use the reference screenshot as the source of truth.

---

# 12. ABOUT US PAGE

Route:

/about-us

Recreate the About Us screenshot.

## Page Hero

Background military image.

Title:

"ABOUT US"

Use a wide cinematic image with dark overlay.

---

## Our Mission & Vision

Heading:

"Our Mission & Vision"

Content:

"At NAPT Academy Panamaram, we are dedicated to shaping disciplined, motivated individuals equipped for success in India's defense, paramilitary, and police services.

Founded in 2012 in the heart of Wayanad, our mission is to bridge the gap between ambition and achievement — by delivering accessible, high-quality training.

We combine academic excellence, military-style physical training, mental resilience building, and moral education to transform aspirants into confident, capable, and service-ready leaders of tomorrow."

Create a two-column layout:

Image + content.

---

# 13. ABOUT US — YOUR SUCCESS, OUR EXPERT TEAM

Create the section shown in the screenshot.

Heading:

"Your Success, Our Expert Team"

Content should explain that NAPT Academy has:

* Experienced defence officers
* Experienced retired officials
* Academic mentors
* Real-world recruitment knowledge
* Discipline-first approach

Use an appropriate training image on the right.

---

# 14. ABOUT US — OFFICIAL CREDENTIALS & ACCREDITATION

Create:

"Official Credentials & Accreditation"

Include the supporting institutional/recognition content shown in the reference.

Make the section professional and trustworthy.

---

# 15. ABOUT US — TEAM

Create:

"Your Success, Our Expert Team"

Supporting text:

"At NAPT Academy, our expert team—including seasoned educators and retired officers—offers focused guidance and real-world insights to help students succeed in competitive exams with confidence and clarity."

Create a responsive team grid.

The screenshot contains multiple team members.

Use placeholder/temporary professional portraits if the actual team images are not available.

Team cards should support:

* Image
* Name
* Designation
* Optional social/contact icons
* Hover overlay

Do NOT hardcode the team cards inside the JSX.

Load them from dynamic content data.

---

# 16. SERVICES PAGE

Route:

/services

Create hero:

" SERVICES "

Use a military/academy formation image with dark overlay.

Then create the six service cards from the reference.

## Strategic Recruitment Alliances

"We collaborate with esteemed defence and recruitment agencies to ensure our trainees gain access to the latest military and police selection standards. These partnerships provide valuable insights, real-world strategies, and expert mentorship."

## Army & Police Recruitment Hub

"Our exclusive portal offers real-time notifications, detailed eligibility criteria, and regular application timelines for major military, paramilitary, and police recruitment drives—streamlining your journey from awareness to application."

## Comprehensive Pre-Recruitment Training

"Can top-tier physical conditioning, academic readiness for entrance exams, and mental resilience training build the most resilient and physically strong talent essential to achieving recruitment processes and selection success."

## Physical Fitness Training

"Undergo rigorous physical conditioning to meet recruitment standards. Our training focuses on endurance, strength, and agility—essential elements to help you successfully clear the physical tests required by the armed and uniformed forces."

## Entrance Exam Mastery

"Excel in written exams with our expert coaching. We cover comprehensive subjects—General Knowledge, Reasoning, Mathematics, and English—ensuring you fully prepared to tackle every academic challenge with confidence."

## Interview & SSB Training

"Develop confidence and communication skills for interviews and SSB assessments. Our focused sessions include personal story development, group discussions, mock interviews, and role-playing to ensure success in every stage of the selection process."

Use the same card visual language as the screenshot.

---

# 17. SERVICES — COMMITMENT SECTION

Create beige statistics/content section.

Heading:

"Building Future Guardians: NAPT Academy's Commitment"

Supporting content should communicate NAPT Academy's commitment to preparing students for defence, police and uniformed services.

Statistics:

* 17+ Years of Defence Expertise
* 10+ Certified Defence Mentors

Use icons and clean typography.

---

# 18. SERVICES — OPPORTUNITIES SECTION

Create the textured/off-white section shown in the reference.

Heading:

"More Opportunities For Everyone"

Supporting copy:

"At our training centre, we believe that success should be accessible to all. Whether you're aiming for a career in the Army, Police, or Other Uniformed jobs, we provide equal access to quality training. Our emphasis on discipline, structured guidance and practical preparation ensures every student can unlock their full potential and take confident steps toward a brighter future."

Create three benefit items:

### All-in-One Defense Training

Get trained for Army, Air Force, and Other Uniform Jobs under one roof with expert guidance and practical sessions.

### Structured Courses & Expert Coaching

Our programs combine physical training, written exam prep, and interview guidance to help you succeed.

### Opportunities for Every Aspirant

No matter your background, we help you build a strong foundation and open doors to secure careers in defence and security.

Use icons and a two-column layout.

---

# 19. SERVICES — ELIGIBILITY CRITERIA

Create:

"Eligibility Criteria for Recruitment Training"

Create six cards:

1. AGNIVEER (General Duty) - Indian Army
2. AGNIVEER (SSR/MR) - Indian Navy
3. AGNIVEER (Vayu) - Indian Air Force
4. SSC GENERAL DUTY (GD) - CAPF
5. Nursing Assistant - Indian Army
6. Paramedical - Navy / Air Force

Each card should contain the eligibility information visible in the reference screenshot.

Keep this data dynamic.

Create an eligibility data structure so information can easily be updated later.

---

# 20. SERVICES — FAQ

Heading:

"General Questions"

Create a two-column FAQ accordion.

Use the questions and answers visible in the screenshot.

FAQ behavior:

* Click question to expand
* Smooth animation
* Chevron rotation
* Only one open at a time on desktop/mobile if appropriate
* Keyboard accessible
* Semantic buttons
* Good SEO structure

---

# 21. OUR TRAINING CENTERS PAGE

Route:

/our-training-centers

Hero title:

"Our Training Centers"

Use a military-training image with dark overlay.

---

# 22. TRAINING CENTERS INTRO

Heading:

"Elite Physical and Academic Training to the aspirants for Armed Forces"

Supporting text:

"Our training centre is dedicated to delivering high quality physical and academic training for the energetic youngsters joining any Navy, Airforce, Para Military, Police, Excise, Forest departments."

Recreate the layout from the screenshot.

---

# 23. TRAINING CENTER CARDS

Create dynamic cards for the centers visible in the screenshot:

* NAPT Kozhikode
* NAPT Malappuram
* NAPT Kannur
* NAPT Pavumba (Karunagappally)
* NAPT Ernakulam
* NAPT Vatakara
* NAPT Panamaram
* NAPT Attingal (Trivandrum)
* NAPT Pathanamthitta
* NAPT Vithura (Trivandrum)
* NAPT Thirumala (Trivandrum)

Each card should contain:

* Center name
* Address
* Phone number
* Contact/social/map action icons

Store all center information dynamically.

Create reusable:

<TrainingCenterCard />

component.

Use a responsive grid:

Desktop: 2 columns

Tablet: 2 columns

Mobile: 1 column

---

# 24. TRAINING CENTER FEATURE SECTION

Recreate the large image section from the screenshot.

Use an Unsplash temporary image showing military/defence training.

Add yellow information card:

"Elite Defense & Security Training Center"

Supporting content should communicate:

Join the ranks of tomorrow's protectors with our all-in-one training program designed to prepare aspirants for Army, Police, and other uniformed jobs. We offer expert physical training, exam preparation, and real-life technical skills to help students succeed in competitive defence and security careers.

---

# 25. TRAINING CENTER — MORE OPPORTUNITIES

Reuse the same visual component as the Services page:

"More Opportunities For Everyone"

with:

* All-in-One Defense Training
* Structured Courses & Expert Coaching
* Opportunities for Every Aspirant

Do not duplicate JSX unnecessarily.

Create reusable components.

---

# 26. CONTACT US PAGE

Route:

/contact-us

Hero:

"CONTACT US"

Use a dramatic military image with dark overlay.

---

# 27. CONTACT INFORMATION CARDS

Create three cards:

### Phone

Admissions: +91 97451 29069

Support: +91 80861 29069

### Email

Support or Info:

[naptwayanad2017@gmail.com](mailto:naptwayanad2017@gmail.com)

### Address

NAPT Academy Plaza Building Near
KSFE Panamaram, Wayanad, Kerala

* 670645

Use icons.

Cards should match the screenshot:

* White/cream textured background
* Green icon badge
* Thin border
* Rounded corners
* Elegant spacing

---

# 28. CONTACT FORM

Create a professional contact form.

Heading:

"Get In Touch"

Fields:

* Your name
* Choose Center
* Subject
* Your message

Button:

"Submit"

The Choose Center dropdown must dynamically load all training centers.

Validation:

* Name required
* Center required
* Subject required
* Message required
* Proper validation messages
* Loading state
* Success state
* Error state

Use server-side form handling where appropriate.

Do not leave the form as a fake visual-only form.

Structure the API so it can later connect to email/CRM.

---

# 29. FOOTER

Create one reusable Footer component across all pages.

Dark charcoal background.

Include:

Short description:

"The premier platform offering industry-focused training to empower learners with practical skills and career-ready expertise."

Columns:

### Navigation

Home
About Us
Services

### Quick Link

Contact Us
FAQs

### Services

Our Training Centers

Contact information:

Panamaram Head Office

+91 97451 29069

[naptwayanad2017@gmail.com](mailto:naptwayanad2017@gmail.com)

Social icons:

* Facebook
* WhatsApp
* Instagram

Bottom:

"Powered By | Medbobty | All Rights Reserved"

Keep the footer visually close to the screenshot.

---

# 30. RESPONSIVE DESIGN

This is extremely important.

The screenshots are narrow/mobile-oriented, so make the mobile version exceptionally polished.

Desktop:

* Wide content
* Proper whitespace
* Multi-column grids
* Large hero
* Horizontal carousels

Tablet:

* Adaptive grids
* Comfortable spacing

Mobile:

* One-column cards
* Hamburger navigation
* Full viewport hero
* Horizontal swipe carousels
* Properly sized typography
* No horizontal overflow
* No text clipping
* No overlapping elements
* Touch-friendly controls

Test at:

* 320px
* 375px
* 390px
* 414px
* 768px
* 1024px
* 1280px
* 1440px
* 1920px

---

# 31. ANIMATIONS

Use subtle premium animations.

Examples:

* Hero fade-in
* Heading slide-up
* Card reveal on scroll
* Image hover zoom
* Button hover
* Carousel transitions
* FAQ expand/collapse
* Mobile menu animation

Do NOT over-animate.

The site should feel professional and institutional, not like a gaming website.

Respect prefers-reduced-motion.

---

# 32. IMAGE REQUIREMENTS

For now, use high-quality Unsplash images related to:

* Indian military training
* Defence academy
* Army training
* Physical fitness
* Running
* Cadets
* Police training
* Military teamwork
* Classroom training
* Leadership

Use image URLs that are stable and appropriate for production prototyping.

Centralize all image URLs in the content/data layer.

Do not scatter Unsplash URLs throughout JSX.

Later, the images should be replaceable with Vercel Blob URLs without changing the UI.

Use Next/Image for optimization.

Configure remote image domains correctly.

Use appropriate:

* width
* height
* sizes
* priority
* loading
* object-fit

Hero/LCP images should be prioritized.

---

# 33. COMPONENT ARCHITECTURE

Create reusable components such as:

components/
layout/
Header.tsx
Footer.tsx

hero/
PageHero.tsx
HomeHero.tsx

home/
ServiceCategory.tsx
ForceCarousel.tsx
MissionVisionValues.tsx
StatsSection.tsx
GallerySection.tsx
Testimonials.tsx

about/
AboutIntro.tsx
Credentials.tsx
TeamGrid.tsx

services/
ServiceCard.tsx
EligibilityCard.tsx
FAQ.tsx
OpportunitiesSection.tsx

training-centers/
TrainingCenterCard.tsx
TrainingCenterGrid.tsx
TrainingFeature.tsx

contact/
ContactInfoCard.tsx
ContactForm.tsx

shared/
SectionHeading.tsx
IconBadge.tsx
AnimatedSection.tsx

Keep components small and reusable.

---

# 34. DATA STRUCTURE

Create typed data models.

Example:

type TrainingCenter = {
id: string
name: string
address: string
phone: string
whatsapp?: string
mapUrl?: string
}

type Service = {
id: string
title: string
description: string
icon: string
}

type TeamMember = {
id: string
name: string
designation: string
image: string
}

type Testimonial = {
id: string
name: string
content: string
rating: number
}

type Eligibility = {
id: string
title: string
category: string
requirements: string[]
}

Use TypeScript interfaces/types throughout.

---

# 35. CONTENT MANAGEMENT APPROACH

Do not hardcode content directly into UI components.

Use something like:

data/
home.ts
about.ts
services.ts
trainingCenters.ts
contact.ts

during development.

Then create a content repository abstraction:

getHomeContent()
getAboutContent()
getServicesContent()
getTrainingCenters()
getContactContent()

These functions should be structured so they can retrieve content from Vercel Blob.

Example conceptual architecture:

UI
↓
Content Repository
↓
Vercel Blob JSON
↓
Dynamic content

For images:

UI
↓
Image config/content
↓
Vercel Blob URL

This makes the website genuinely content-driven.

---

# 36. VERCEL BLOB

Use the official @vercel/blob package.

Create appropriate server-side Blob utilities.

Use:

put()
list()
del()

where appropriate.

Never expose the Blob token to client-side code.

Use:

BLOB_READ_WRITE_TOKEN

in environment variables.

Provide:

.env.example

with:

BLOB_READ_WRITE_TOKEN=

Do not commit secrets.

If using public Blob URLs for website images, make sure the architecture is compatible with Next/Image.

---

# 37. SEO

Implement strong technical SEO.

Each page must have unique metadata.

Home:

Title:
NAPT Academy | Defence, Police & Armed Forces Training

Description:
NAPT Academy provides disciplined physical, academic and recruitment training for aspirants preparing for Indian Armed Forces, paramilitary and police services.

About:
NAPT Academy | About Us

Services:
NAPT Academy | Defence & Recruitment Training Services

Training Centers:
NAPT Academy | Training Centers in Kerala

Contact:
NAPT Academy | Contact Us

Implement:

* Metadata API
* Open Graph metadata
* Twitter metadata
* Canonical URLs
* robots.txt
* sitemap.xml
* Semantic headings
* Proper image alt text
* Structured internal linking
* Organization schema
* LocalBusiness/educational organization structured data where appropriate
* FAQ schema where appropriate

Use the Next.js Metadata API correctly.

---

# 38. PERFORMANCE

Optimize for Core Web Vitals.

Requirements:

* Use next/image
* Lazy-load below-the-fold images
* Prioritize hero/LCP image
* Avoid layout shift
* Avoid huge JavaScript bundles
* Server Components by default
* Client Components only for carousel, menu, FAQ and interactive form
* Avoid unnecessary dependencies
* Optimize fonts
* Proper responsive image sizes

---

# 39. ACCESSIBILITY

Implement:

* Semantic HTML
* Keyboard navigation
* Focus states
* ARIA labels where needed
* Accessible carousel controls
* Accessible mobile menu
* Accessible accordion
* Proper form labels
* Good color contrast
* Reduced motion support
* Alt text for images

Do not rely on icons alone to communicate meaning.

---

# 40. UX DETAILS

Use consistent:

* Border radius
* Shadows
* Card padding
* Section spacing
* Heading hierarchy
* Icon styling
* Button styling

Do not make every section look completely different.

The website should feel like one coherent premium brand.

---

# 41. IMPORTANT VISUAL MATCHING RULE

Use the attached screenshots as the visual source of truth.

Match:

* Section ordering
* Relative spacing
* Card structure
* Colors
* Typography hierarchy
* Image placement
* Navigation structure
* Footer structure
* Content hierarchy
* Carousel positioning
* Section backgrounds
* Border treatments
* Statistics presentation

However, improve the implementation where necessary for:

* Responsiveness
* Accessibility
* Performance
* SEO
* Maintainability

Do not blindly reproduce any obvious layout bugs from the screenshots.

---

# 42. DO NOT DO THESE THINGS

Do NOT:

* Use the screenshots as full-page background images
* Build the site as a static image
* Put all content inside one page.tsx
* Hardcode repeated cards
* Use inline SVG everywhere
* Use unnecessary animation
* Create horizontal overflow
* Ignore mobile responsiveness
* Use fake navigation links
* Use placeholder lorem ipsum
* Replace the actual content with generic marketing copy
* Create fake map functionality
* Use a map API unless explicitly required
* Put secrets in client-side code
* Put BLOB_READ_WRITE_TOKEN in frontend code
* Ignore SEO
* Ignore accessibility

---

# 43. FINAL FILE STRUCTURE

Aim for a structure similar to:

app/
layout.tsx
page.tsx

about-us/
page.tsx

services/
page.tsx

our-training-centers/
page.tsx

contact-us/
page.tsx

api/
contact/
route.ts

components/
layout/
hero/
home/
about/
services/
training-centers/
contact/
shared/

lib/
blob.ts
content.ts
utils.ts

data/
home.ts
about.ts
services.ts
training-centers.ts
contact.ts

types/
index.ts

public/
icons/
fallback/

.env.example

---

# 44. IMPLEMENTATION QUALITY

The final result should look like a professionally developed institutional defence academy website, not an AI-generated template.

Pay special attention to:

* Pixel-level visual similarity to the screenshots
* Professional typography
* Correct spacing
* Clean cards
* Strong visual hierarchy
* Premium military aesthetic
* Responsive behavior
* Smooth interactions
* Fast loading
* SEO
* Accessibility
* Maintainable architecture

Before considering the implementation complete, inspect every page at mobile and desktop widths and fix:

* Overflow
* Broken layouts
* Text clipping
* Image distortion
* Incorrect spacing
* Poor contrast
* Navigation issues
* Carousel issues
* Form issues

---

# 45. BUILD ORDER

Build in this order:

1. Project setup
2. Global fonts/colors/design system
3. Header
4. Footer
5. Home page
6. About page
7. Services page
8. Training Centers page
9. Contact page
10. Responsive optimization
11. Animations
12. Vercel Blob integration
13. Dynamic content layer
14. SEO
15. Accessibility
16. Performance optimization
17. Final visual polish

Do not stop after creating only the homepage.

Build all five pages completely.

---

# 46. MOST IMPORTANT REQUIREMENT

The attached screenshots are the reference.

Recreate the **same website, same content, same page structure and same visual hierarchy**, but implement it as a modern, maintainable, dynamic Next.js application.

The Home page hero MUST be full viewport height.

The entire website MUST be responsive.

The content and images MUST be structured so they can be moved to Vercel Blob without rewriting the frontend.

Use Unsplash images temporarily wherever actual images are not available.

At the end, provide:

1. Complete project implementation
2. All required files
3. .env.example
4. Vercel Blob setup instructions
5. Local development instructions
6. Vercel deployment instructions
7. Short explanation of where the dynamic content is stored
8. List of all routes
9. List of environment variables required

Do not ask me to manually create basic components that you can implement yourself. Build the complete website.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/c5a75ec6-74b1-4db4-ade6-7a858b6460ec).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
