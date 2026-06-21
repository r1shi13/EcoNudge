# 🌱 EcoNudge: A Carbon Footprint Awareness Platform

[![Live Demo](https://img.shields.io/badge/Demo-Live_Deployment-success?style=for-the-badge&logo=vercel)](https://econudge-1064539702436.asia-southeast1.run.app/) 
[![Hackathon](https://img.shields.io/badge/Prompt_Wars-Challenge_3-blue?style=for-the-badge)](https://hack2skill.com/)

> **Design a solution that helps individuals understand, track, and reduce their carbon footprint through simple actions and personalized insights.** 
> *— Built for Prompt Wars Virtual Challenge 3.*

---

## 🛑 The Problem: Data Without Context
The average urban resident produces tons of CO2 a year, but to the human brain, "4.5kg of CO2" is an invisible, meaningless number. Traditional carbon trackers fail because they function as glorified calculators. Data without context, emotion, or personalization does not drive actual behavioral change.

## ✨ Our Solution: Awareness Over Tracking
EcoNudge shifts the paradigm from **tracking** to **awareness**. Instead of just logging data on a static dashboard, EcoNudge intervenes at the point of decision-making, translating invisible emissions into relatable, real-world consequences to drive sustainable habits.

### 🚀 Core Features
* **🌍 The "Living World" Visualizer:** A dynamic visual ecosystem that reacts to your choices. Log high emissions, and the sky grays. Make sustainable choices, and your digital world thrives. It provides immediate, emotional cognitive feedback.
* **🧠 Contextual Nudge Engine:** Powered by LLMs, the app intercepts your activity logs and translates them. Instead of "4.5kg of CO2," it nudges you with: *"That's roughly the same carbon as charging 500 smartphones."*
* **💡 AI-Powered Personalized Insights:** A backend intelligence system analyzes your specific historical logs to generate highly actionable, personalized behavioral tips to reduce your footprint through simple actions.
* **🏆 Squad Standings (Gamification):** Reducing footprints alone is hard. EcoNudge introduces team-based competition to leverage the psychology of collective accountability.

---

## 🛠️ Technical Architecture & CI/CD Standards
This application was built with strict adherence to production-level standards, ensuring high performance, robust security, and inclusive design.

* **Frontend:** React.js, Vite, Tailwind CSS, Framer Motion.
* **Backend:** Express.js (Decoupled LLM integration to keep API keys secure).
* **AI Engine:** Google Gemini 2.5 Flash API (via secure backend endpoints `/api/nudge`, `/api/insights`).

### 🛡️ Evaluation Highlights (Code Quality & Security)
* **Security First:** The Express backend implements `helmet` for HTTP headers, `cors` for origin restriction, and `express-rate-limit` to prevent API abuse. Strict input sanitization prevents XSS.
* **Accessibility (a11y):** Fully semantic HTML tags, comprehensive `aria-labels` for screen readers, and full keyboard navigation support (`tabIndex`).
* **Testing Coverage:** Automated testing implemented using `vitest` and `@testing-library/react` to ensure UI components and API fallback states render flawlessly.
* **Production Optimization:** Configured a strict Vite production build to separate the HMR dev-server from the static production deployment, maximizing latency efficiency.

---

## 🤖 Prompting Strategy & AI Orchestration
*As required by the Prompt Wars Virtual Challenge, here is how Generative AI was utilized to orchestrate this solution:*

Rather than a single "build me an app" prompt, AI was orchestrated in an iterative, role-based pipeline:
1. **Persona Engineering:** The AI coding assistant was instructed to act as an *"Expert Full-Stack Developer AND a Behavioral Psychologist"* to ensure the logic prioritized human nudges over raw data calculation.
2. **Secure Architecture Generation:** AI was explicitly prompted to decouple the LLM from the frontend, scaffolding a secure Node/Express backend so API keys are never exposed to the client.
3. **Automated Refactoring:** Once the MVP was built, AI was utilized to audit the codebase against rigorous CI/CD metrics—automatically generating unit tests, implementing `helmet` security middleware, and patching accessibility (`aria`) gaps to achieve a 90+ evaluation score.

---

## ⚙️ Running Locally

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/econudge.git
cd econudge
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Variables
Create a `.env` file in the root directory:
```env
GEMINI_API_KEY=your_api_key_here
NODE_ENV=development
```

### 4. Run Scripts
* **Development:** `npm run dev` *(Runs Vite HMR and Express dev server)*
* **Production Build:** `npm run build`
* **Production Start:** `npm start`
* **Run Tests:** `npm test`

---

## 🤝 Hackathon Details
Built for **Google AI & Hack2Skill's Prompt Wars Virtual Challenge 3**. 
* **Developer:** Chandrangshu Dey
* **Live Deployment:** https://econudge-1064539702436.asia-southeast1.run.app
