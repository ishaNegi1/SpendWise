import Link from "next/link";

export default function Home() {
  return (
    <div className="mt-20 text-center">
      <h1 className="text-4xl font-extrabold py-2 bg-clip-text text-transparent bg-linear-to-r from-[#1e3a8a] to-[#312e81]">
        Take Control of Your Money with SpendWise
      </h1>

      <p className="mt-5 text-gray-800 text-lg max-w-2xl mx-auto">
        Track expenses effortlessly, set smart spending limits, and get
        personalized insights powered by AI. Your journey to smarter financial
        habits starts here.
      </p>

      <div className=" mt-12">
        <Link
          href="/dashboard"
          className="px-6 py-3 rounded-lg bg-linear-to-r from-[#1e3a8a] to-[#312e81] text-white shadow hover:opacity-90 transition"
        >
          Go to Dashboard
        </Link>
      </div>

      <section className="mt-20 px-6">
  <h2 className="text-3xl font-bold text-[#1e3a8a]">Why SpendWise?</h2>

  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10 max-w-6xl mx-auto">

    <div className="p-px rounded-xl bg-linear-to-r from-[#0b1a33] via-[#1e3a8a] to-[#312e81]">
      <div className="p-6 bg-white rounded-xl">
        <h3 className="text-xl font-semibold text-[#1e3a8a]">
          AI Auto-Categorization
        </h3>
        <p className="text-gray-600 mt-2">
          Automatically categorize transactions using cutting-edge zero-shot AI models.
        </p>
      </div>
    </div>

    <div className="p-px rounded-xl bg-linear-to-r from-[#0b1a33] via-[#1e3a8a] to-[#312e81]">
      <div className="p-6 bg-white rounded-xl">
        <h3 className="text-xl font-semibold text-[#1e3a8a]">
          Smart Spending Dashboard
        </h3>
        <p className="text-gray-600 mt-2">
          Visualize categories, monthly trends, and total spending in one clean interface.
        </p>
      </div>
    </div>

    <div className="p-px rounded-xl bg-linear-to-r from-[#0b1a33] via-[#1e3a8a] to-[#312e81]">
      <div className="p-6 bg-white rounded-xl">
        <h3 className="text-xl font-semibold text-[#1e3a8a]">
          AI Insights
        </h3>
        <p className="text-gray-600 mt-2">
          Get personalized financial insights powered by Qwen AI to help you spend smarter.
        </p>
      </div>
    </div>

    <div className="p-px rounded-xl bg-linear-to-r from-[#0b1a33] via-[#1e3a8a] to-[#312e81]">
      <div className="p-6 bg-white rounded-xl">
        <h3 className="text-xl font-semibold text-[#1e3a8a]">
          PDF Reports
        </h3>
        <p className="text-gray-600 mt-2">
          Download detailed monthly reports with insights. Perfect for budgeting & analysis.
        </p>
      </div>
    </div>

    <div className="p-px rounded-xl bg-linear-to-r from-[#0b1a33] via-[#1e3a8a] to-[#312e81]">
      <div className="p-6 bg-white rounded-xl">
        <h3 className="text-xl font-semibold text-[#1e3a8a]">
          Set Spending Limits
        </h3>
        <p className="text-gray-600 mt-2">
          Add monthly spending goals and receive alerts when limits are close.
        </p>
      </div>
    </div>

    <div className="p-px rounded-xl bg-linear-to-r from-[#0b1a33] via-[#1e3a8a] to-[#312e81]">
      <div className="p-6 bg-white rounded-xl">
        <h3 className="text-xl font-semibold text-[#1e3a8a]">
          Secure Authentication
        </h3>
        <p className="text-gray-600 mt-2">
          Login with Google or email/password using secure JWT + HttpOnly cookies.
        </p>
      </div>
    </div>

  </div>
</section>

      <section className="mt-24 px-6">
  <h2 className="text-3xl font-bold text-[#1e3a8a]">
    How SpendWise Works
  </h2>

  <div className="grid sm:grid-cols-3 gap-10 mt-12 max-w-5xl mx-auto">

    <div className="p-px rounded-xl bg-linear-to-r from-[#0b1a33] via-[#1e3a8a] to-[#312e81]">
      <div className="bg-white p-6 rounded-xl">
        <h3 className="text-xl font-semibold text-[#1e3a8a]">
          1. Add Transactions
        </h3>
        <p className="text-gray-600 mt-2">
          Enter your expenses manually; our AI categorizes them for you.
        </p>
      </div>
    </div>

    <div className="p-px rounded-xl bg-linear-to-r from-[#0b1a33] via-[#1e3a8a] to-[#312e81]">
      <div className="bg-white p-6 rounded-xl">
        <h3 className="text-xl font-semibold text-[#1e3a8a]">
          2. Analyze Spending
        </h3>
        <p className="text-gray-600 mt-2">
          View real-time charts, summaries, and category-wise breakdowns.
        </p>
      </div>
    </div>

    <div className="p-px rounded-xl bg-linear-to-r from-[#0b1a33] via-[#1e3a8a] to-[#312e81]">
      <div className="bg-white p-6 rounded-xl">
        <h3 className="text-xl font-semibold text-[#1e3a8a]">
          3. Improve with AI Insights
        </h3>
        <p className="text-gray-600 mt-2">
          Get personalized suggestions to optimize your budget and savings.
        </p>
      </div>
    </div>

  </div>
</section>

      <section className="mt-24 px-6 text-center">
        <h2 className="text-3xl font-bold text-[#1e3a8a]">What Users Say</h2>

        <div className="grid sm:grid-cols-3 gap-8 mt-12 max-w-6xl mx-auto">
          <div className="bg-white p-6 rounded-xl shadow border border-gray-200 flex flex-col items-center">
            <img
              src="https://randomuser.me/api/portraits/women/79.jpg"
              alt="Riya Sharma"
              className="w-20 h-20 rounded-full object-cover shadow-md"
            />
            <p className="text-gray-700 italic mt-4">
              “SpendWise helped me track where my money actually goes. The AI
              insights are game-changing!”
            </p>
            <h3 className="mt-4 font-bold text-[#1e3a8a]">— Riya Sharma</h3>
          </div>

          <div className="bg-white p-6 rounded-xl shadow border border-gray-200 flex flex-col items-center">
            <img
              src="https://randomuser.me/api/portraits/men/32.jpg"
              alt="Arnav Verma"
              className="w-20 h-20 rounded-full object-cover shadow-md"
            />
            <p className="text-gray-700 italic mt-4">
              “The dashboard is so clean and easy to understand. Setting
              spending limits keeps me disciplined.”
            </p>
            <h3 className="mt-4 font-bold text-[#1e3a8a]">— Arnav Verma</h3>
          </div>

          <div className="bg-white p-6 rounded-xl shadow border border-gray-200 flex flex-col items-center">
            <img
              src="https://randomuser.me/api/portraits/women/47.jpg"
              alt="Meera Patel"
              className="w-20 h-20 rounded-full object-cover shadow-md"
            />
            <p className="text-gray-700 italic mt-4">
              “PDF reports help me review my monthly habits. Highly
              recommended!”
            </p>
            <h3 className="mt-4 font-bold text-[#1e3a8a]">— Meera Patel</h3>
          </div>
        </div>
      </section>

      <section className="mt-24">
        <h2 className="text-3xl font-bold text-[#1e3a8a]">
          Ready to Take Control?
        </h2>
        <p className="text-gray-600 mt-3 max-w-xl mx-auto">
          Start tracking, budgeting, and improving your spending with the power
          of AI.
        </p>

        <Link
          href="/signup"
          className="mt-6 inline-block px-6 py-3 bg-linear-to-r from-[#1e3a8a] to-[#312e81] text-white rounded-lg shadow hover:opacity-90 transition"
        >
          Create Your Account
        </Link>
      </section>
    </div>
  );
}
