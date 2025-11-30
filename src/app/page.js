import Link from "next/link";

export default function Home() {
  return (
    <div className=" sm:mt-20 mt-16 text-center">
      <h1 className="text-4xl font-extrabold py-2 bg-clip-text text-transparent bg-linear-to-r from-[#1e3a8a] to-[#312e81]">
        Take Control of Your Money with SpendWise
      </h1>

      <p className=" sm:mt-5 mt-8 text-gray-800 text-lg max-w-2xl mx-auto">
        Track expenses effortlessly, set smart spending limits, and get
        personalized insights powered by AI. Your journey to smarter financial
        habits starts here.
      </p>

      <div className="mt-12">
        <Link
          href="/dashboard"
          className="px-6 py-3 rounded-lg bg-linear-to-r from-[#0b1a33] via-[#1e3a8a] to-[#5b21b6] text-white shadow hover:opacity-90 transition"
        >
          Go to Dashboard
        </Link>
      </div>

      <section className=" mt-32 sm:px-6 px-2">
        <h2 className="text-3xl font-bold text-[#1e3a8a]">Why SpendWise?</h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16 mt-12 max-w-6xl mx-auto">
          <div className="animated-border">
            <div className="p-6 rounded-xl">
              <h3 className="text-xl font-semibold text-[#1e3a8a]">
                AI Auto-Categorization
              </h3>
              <p className="text-gray-800 mt-2">
                Automatically categorize transactions using cutting-edge
                zero-shot AI models.
              </p>
            </div>
          </div>

          <div className="animated-border">
            <div className="p-6 rounded-xl">
              <h3 className="text-xl font-semibold text-[#1e3a8a]">
                Smart Spending Dashboard
              </h3>
              <p className="text-gray-800 mt-2">
                Visualize categories, monthly trends, and total spending in one
                clean interface.
              </p>
            </div>
          </div>

          <div className="animated-border">
            <div className="p-6 rounded-xl">
              <h3 className="text-xl font-semibold text-[#1e3a8a]">
                AI Insights
              </h3>
              <p className="text-gray-800 mt-2">
                Get personalized financial insights powered by Qwen AI to help
                you spend smarter.
              </p>
            </div>
          </div>

          <div className="animated-border">
            <div className="p-6 rounded-xl">
              <h3 className="text-xl font-semibold text-[#1e3a8a]">
                PDF Reports
              </h3>
              <p className="text-gray-800 mt-2">
                Download detailed monthly reports with insights. Perfect for
                budgeting & analysis.
              </p>
            </div>
          </div>

          <div className="animated-border">
            <div className="p-6 rounded-xl">
              <h3 className="text-xl font-semibold text-[#1e3a8a]">
                Set Spending Limits
              </h3>
              <p className="text-gray-800 mt-2">
                Add monthly spending goals and receive alerts when limits are
                close.
              </p>
            </div>
          </div>

          <div className="animated-border">
            <div className="p-6 rounded-xl">
              <h3 className="text-xl font-semibold text-[#1e3a8a]">
                Secure Authentication
              </h3>
              <p className="text-gray-800 mt-2">
                Login with Google or email/password using secure JWT + HttpOnly
                cookies.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-32 sm:px-6 px-2">
        <h2 className="text-3xl font-bold text-[#1e3a8a]">
          How SpendWise Works
        </h2>

        <div className="grid sm:grid-cols-3 gap-12 mt-12 max-w-5xl mx-auto">
          <div className="bg-white text-[#1e3a8a] rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col items-center">
            <div className="w-14 h-14 rounded-full bg-linear-to-r from-[#0b1a33] via-[#1e3a8a] to-[#5b21b6] flex items-center justify-center shadow-md">
              <span className="text-2xl font-bold text-white">1</span>
            </div>

            <h3 className="text-xl font-semibold mt-6">Add Transactions</h3>
            <p className="mt-4 text-gray-800">
              Enter your expenses manually; our AI categorizes them for you.
            </p>
          </div>

          <div className="bg-white text-[#1e3a8a] rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col items-center">
            <div className="w-14 h-14 rounded-full bg-linear-to-r from-[#0b1a33] via-[#1e3a8a] to-[#5b21b6] flex items-center justify-center shadow-md">
              <span className="text-2xl font-bold text-white">2</span>
            </div>

            <h3 className="text-xl font-semibold mt-6">Analyze Spending</h3>
            <p className="mt-4 text-gray-800">
              View real-time charts, summaries, and category-wise breakdowns.
            </p>
          </div>

          <div className="bg-white text-[#1e3a8a] rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col items-center">
            <div className="w-14 h-14 rounded-full bg-linear-to-r from-[#0b1a33] via-[#1e3a8a] to-[#5b21b6] flex items-center justify-center shadow-md">
              <span className="text-2xl font-bold text-white">3</span>
            </div>

            <h3 className="text-xl font-semibold mt-6">
              Improve with AI Insights
            </h3>
            <p className="mt-4 text-gray-800">
              Get personalized suggestions to optimize your budget and savings.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-32 sm:px-6 px-2 text-center">
        <h2 className="text-3xl font-bold text-[#1e3a8a]">What Users Say</h2>

        <div className="grid sm:grid-cols-3 gap-12 mt-12 max-w-6xl mx-auto">
          <div className="animated-border">
            <div className="rounded-xl flex flex-col items-center bg-white p-6">
              <img
                src="https://randomuser.me/api/portraits/women/79.jpg"
                alt="Riya Sharma"
                className="w-20 h-20 rounded-full object-cover shadow-md"
              />

              <p className="text-gray-800 italic mt-4 text-center">
                “SpendWise helped me track where my money actually goes. The AI
                insights are game-changing!”
              </p>

              <h3 className="mt-4 font-bold text-[#1e3a8a]">— Riya Sharma</h3>
            </div>
          </div>

          <div className="animated-border">
            <div className="rounded-xl flex flex-col items-center bg-white p-6">
              <img
                src="https://randomuser.me/api/portraits/men/32.jpg"
                alt="Arnav Verma"
                className="w-20 h-20 rounded-full object-cover shadow-md"
              />

              <p className="text-gray-800 italic mt-4 text-center">
                “The dashboard is so clean and easy to understand. Setting
                spending limits keeps me disciplined.”
              </p>

              <h3 className="mt-4 font-bold text-[#1e3a8a]">— Arnav Verma</h3>
            </div>
          </div>

          <div className="animated-border">
            <div className="rounded-xl flex flex-col items-center bg-white p-6">
              <img
                src="https://randomuser.me/api/portraits/women/47.jpg"
                alt="Meera Patel"
                className="w-20 h-20 rounded-full object-cover shadow-md"
              />

              <p className="text-gray-800 italic mt-4 text-center">
                “PDF reports help me review my monthly habits. Highly
                recommended!”
              </p>

              <h3 className="mt-4 font-bold text-[#1e3a8a]">— Meera Patel</h3>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-32">
        <h2 className="text-3xl font-bold text-[#1e3a8a]">
          Ready to Take Control?
        </h2>
        <p className="text-gray-800 text-[1.05rem] mt-6 max-w-xl mx-auto">
          Start tracking, budgeting, and improving your spending with the power
          of AI.
        </p>

        <Link
          href="/signup"
          className="mt-10 inline-block px-6 py-3 bg-linear-to-r from-[#0b1a33] via-[#1e3a8a] to-[#5b21b6] text-white rounded-lg shadow hover:opacity-90 transition"
        >
          Create Your Account
        </Link>
      </section>
    </div>
  );
}
