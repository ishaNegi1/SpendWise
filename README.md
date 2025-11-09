<b><h1> 💰 SpendWise – AI-Powered Spending Analyzer & Personal Finance Insights Dashboard</h1></b>
A smart expense tracking application that automatically categorizes transactions, visualizes spending patterns, and generates personalized AI insights based on your real financial behavior.

<b><h2>✅ Key Features</h2></b>
🤖 AI Auto-Categorization - Uses zero-shot ML model (`bart-large-mnli`) to detect category from text.</br>
📊 Spending Dashboard - Month + year filters, total summaries, category breakdowns.</br>
📈 Interactive Charts - Pie chart by category + bar graph by month.</br>
🧠 Personalized AI Insights - Uses `Qwen/Qwen2.5-7B-Instruct` and past 12 months of data.</br>
🔐 Auth System - Email/Password + Google Login (JWT + HttpOnly cookie).</br>
🗄  Secure User Data - User-scoped transactions in MongoDB.</br> 
💸 100% Free AI - No OpenAI cost — fully on HuggingFace free tier API.</br> 
📱  Responsive UI - Tailwind + clean dashboard UI.

<b><h2>🛠 Tech Stack</h2></b>
Frontend - Next.js 16 (App Router), TailwindCSS</br>
Backend - Next.js Route Handlers, JWT, bcrypt</br>
Database - MongoDB + Mongoose</br>
AI Models - `facebook/bart-large-mnli`, `Qwen/Qwen2.5-7B-Instruct`</br>
Auth - JWT + Google OAuth 2.0</br>
Charts - Chart.js</br>
Deployment - Vercel</br>

<b><h2>🌐 Live Demo</h2></b>
👉 <a href="https://spendwise-lovat.vercel.app/" target="_blank">Click here</a> to visit the live website.

<b><h2>📁 Project Structure</h2></b>
src/</br>
├─ app/</br>
│ ├─ dashboard/page.jsx</br>
│ ├─ login/page.jsx</br> 
│ ├─ signup/page.jsx</br>
│ ├─ api/</br>
│ │ ├─ ai/insights/route.js</br>
│ │ ├─ auth/</br>
│ │ │ ├─goole/route.js</br>
│ │ │ ├─login/route.js</br>
│ │ │ ├─logout/route.js</br>
│ │ │ ├─signup/route.js</br>
│ │ ├─ transactions/</br>
│ │ │ ├─add/route.js</br>
│ │ │ ├─categorize/route.js</br>
│ │ │ ├─list/route.js</br>
│ │ ├─ user/me/route.js</br>
│</br>
├─ components/</br>
│ ├─ TransactionForm.jsx</br>
│ ├─ TransactionList.jsx</br>
│ ├─ InsightsModal.jsx</br>
│ ├─ SpendingCharts.jsx</br>
│ ├─ UserSummary.jsx</br>
│</br>
├─ lib/</br>
│ ├─ budgetCoach.js ← AI Insight Engine (History + Trends + LLM</br>
│ ├─ categorize.js ← Zero-shot category classifier</br>
│ ├─ auth.js</br>
│ ├─ googleAuth.js</br>
│ ├─ dbConfig.js</br>
│</br>
├─ models/</br>
│ ├─ User.js</br>
│ ├─ Transaction.js

<b><h2>⚙️ Environment Setup</h2></b>
Create a `.env` file in root directory:</br>
MONGO_URI=your_mongo_uri</br>
JWT_SECRET=your_jwt_secret</br>
HUGGINGFACE_API_KEY=hf_******************</br>
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id

<b><h2>🚀 Run Locally</h2></b>
git clone https://github.com/YOUR-USERNAME/spendwise.git</br>
cd spendwise</br>
npm install</br>
npm run dev

<b><h2>🤝 Contributing</h2></b>
Contributions are welcome! Please open an issue or submit a pull request.
