# 🌱 EcoNudge: Awareness Over Tracking

**A submission for Prompt Wars Virtual Challenge 3**

## 🛑 The Problem: Data Without Context
The average urban resident produces tons of CO2 a year, but to the human brain, "4.5kg of CO2" is an invisible, meaningless number. Traditional carbon trackers fail because they function as glorified calculators. Data without context, emotion, or personalization does not drive behavioral change.

## ✨ Our Solution: EcoNudge
EcoNudge shifts the paradigm from **tracking** to **awareness**. Instead of just logging data, EcoNudge intervenes at the point of decision-making, translating invisible emissions into relatable, real-world consequences.

### 🚀 Core Features
*   🌍 **The "Living World" Visualizer:** A dynamic visual ecosystem that reacts to your choices. Log high emissions, and the sky grays. Make sustainable choices, and your digital world thrives.
*   🧠 **Contextual Nudge Engine:** Powered by **Gemini 2.5 Flash**, the app intercepts your activity logs and translates them into real-world metrics (e.g., *"That's roughly the same carbon as charging 500 smartphones"*).
*   💡 **AI-Powered Personalized Insights:** Analyzes your historical logs to generate actionable, personalized behavioral tips.
*   🏆 **Squad Standings (Gamification):** Introduces team-based competition (e.g., Engineering vs. Design) to leverage the psychology of collective accountability.

## 🛠️ Technical Architecture & Stack
We orchestrated a secure, full-stack application ensuring API keys are never exposed to the client.

*   **Frontend:** React.js, Vite, Tailwind CSS, Framer Motion
*   **Backend:** Express.js 
*   **AI Engine:** Google Gemini 2.5 Flash API 

## 🤖 Prompting Strategy & AI Orchestration
*As required by the Prompt Wars Virtual Challenge, here is how AI was utilized to build this solution:*

Rather than asking the AI coding assistant to "build a carbon tracker," the initial system prompt established a strict persona: **"Act as an Expert Full-Stack Developer and Behavioral Psychologist."**

1.  **Iterative Generation:** The app was built in targeted phases: UI/Scaffolding -> State-management -> Express server integration.
2.  **Context Contextualization:** The LLM was explicitly instructed to structure the Gemini API prompts to return short, punchy, real-world equivalencies.
3.  **Security Focus:** AI was directed to decouple the LLM API calls from the React frontend, generating a robust Node/Express backend to handle API key security.

## ⚙️ Running Locally

**Prerequisites:** Node.js

### 1. Install dependencies
~~~bash
npm install
~~~

### 2. Set your Gemini API key
Create a `.env` file in the root directory and add your key:
~~~env
GEMINI_API_KEY=your_google_gemini_api_key_here
~~~

### 3. Run the application
~~~bash
npm run dev
~~~