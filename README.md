<b><h1> 💰 SpendWise – AI-Powered Spending Analyzer & Personal Finance Insights Dashboard</h1></b>
A smart expense tracking application that automatically categorizes transactions, visualizes spending patterns, provides personalized AI insights, lets you set spending limits with real-time alerts, and generates downloadable monthly PDF reports, all tailored to your financial habits.

<hr>

<b><h2>✅ Key Features</h2></b>
<b>🤖 AI Auto-Categorization</b> - Uses zero-shot ML model (`bart-large-mnli`) to detect category from text.</br>
<b>📊 Smart Dashboard</b> - Month + year filters, total summaries, category breakdowns.</br>
<b>📈 Interactive Charts</b> - Pie(spending by category) + bar(daily spending) + line(Cumulative Spending Trend) + radar(Spending Pattern).</br>
<b>🧠 AI Insights</b> – Personalized financial insights using `Qwen/Qwen2.5-7B-Instruct`.</br>
<b>🛡️ Spending Controls</b> – Set monthly category limits with progress bars & alerts.</br>
<b>📄 PDF Reports</b> – Download monthly spending reports with AI insights included.</br>
<b>🔐 Auth System</b> - Email/Password + Google Login (JWT + HttpOnly cookie).</br>
<b>🗄  Secure User Data</b> - User-scoped transactions in MongoDB.</br> 
<b>💸 Free AI Usage</b> – Uses HuggingFace free-tier models (no OpenAI cost).</br>
<b>📱 Fully Responsive</b> – Clean, modern UI built with TailwindCSS.

<hr>

<b><h2>🛠 Tech Stack</h2></b>
<b>Frontend</b> - Next.js 16 (App Router), TailwindCSS</br>
<b>Backend</b> - Next.js Route Handlers, JWT, bcrypt</br>
<b>Database</b> - MongoDB + Mongoose</br>
<b>AI Models</b> - `facebook/bart-large-mnli`, `Qwen/Qwen2.5-7B-Instruct`</br>
<b>Auth</b> - JWT + Google OAuth 2.0</br>
<b>Charts</b> - Chart.js</br>
<b>PDF Engine</b> - pdf-lib + fontkit (Unicode font)</br>
<b>Deployment</b> - Vercel

<hr>

<b><h2>🌐 Live Demo</h2></b>
👉 <a href="https://spendwise-lovat.vercel.app/" target="_blank">Click here</a> to visit the live website.

<hr>

<b><h2>📁 Project Structure</h2></b>
src/</br>
├─ app/</br>
│ ├─ dashboard</br>
│ │ ├─page.jsx</br>
│ │ ├─DashboardClient.jsx</br>
│ ├─ addTransaction</br>
│ │ ├─page.jsx</br>
│ │ ├─Transaction.jsx</br>
│ ├─ setLimit</br>
│ │ ├─page.jsx</br>
│ │ ├─ControlSpending.jsx</br>
│ ├─ login/page.jsx</br> 
│ ├─ signup/page.jsx</br>
│ ├─ api/</br>
│ │ ├─ ai/insights/route.js</br>
│ │ ├─ reports/monthly/route.js</br>
│ │ ├─ budgets/</br>
│ │ │ ├─add/route.js</br>
│ │ │ ├─list/route.js</br>
│ │ ├─ auth/</br>
│ │ │ ├─google/route.js</br>
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
│ ├─ SpendingCharts.jsx</br>
│ ├─ UserSummary.jsx</br>
│ ├─ InsightsModal.jsx</br>
│</br>
├─ lib/</br>
│ ├─ budgetCoach.js</br>
│ ├─ categorize.jsr</br>
│ ├─ auth.js</br>
│ ├─ checkAuth.js</br>
│ ├─ googleAuth.js</br>
│ ├─ dbConfig.js</br>
│</br>
├─ models/</br>
│ ├─ User.js</br>
│ ├─ Transaction.js</br>
│ ├─ BudgetGoal.js

<hr>

<b><h2>⚙️ Environment Setup</h2></b>
Create a `.env` file in root directory:</br>
MONGO_URI=your_mongo_uri</br>
JWT_SECRET=your_jwt_secret</br>
HUGGINGFACE_API_KEY=hf_******************</br>
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id

<hr>

<b><h2>🚀 Run Locally</h2></b>
git clone https://github.com/YOUR-USERNAME/spendwise.git</br>
cd spendwise</br>
npm install</br>
npm run dev

<hr>

<b><h2>🤝 Contributing</h2></b>
Contributions are welcome! Please open an issue or submit a pull request.
