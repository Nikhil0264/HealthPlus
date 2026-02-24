import { Link } from "react-router-dom";
import { ShieldCheck, CalendarCheck, Stethoscope } from "lucide-react";
import banner from "../public/assets/banner1.jpg";
import { useState } from "react";
import CheckHealth from "./CheckHealth";

const stats = [
  { label: "Patients served", value: "12k+", tone: "Trusted globally" },
  { label: "Verified doctors", value: "320+", tone: "Multi-speciality care" },
  { label: "Avg. wait time", value: "< 5 min", tone: "Instant scheduling" },
];

const carePaths = [
  { title: "General physician", desc: "Fever, cough, fatigue & routine care" },
  { title: "Mental wellness", desc: "Stress, anxiety & sleep issues" },
  { title: "Women’s health", desc: "PCOS, pregnancy & routine checks" },
];

const testimonials = [
  {
    name: "Riya, 27",
    role: "Patient",
    text: "Booked a doctor and completed payment in minutes. The video consultation felt like a real clinic visit.",
  },
  {
    name: "Dr. Arjun Mehta",
    role: "Cardiologist",
    text: "Having all appointments, notes and payments in one place makes every consultation smoother.",
  },
];

const Home = () => {
  const [chatWithAi, setChatWithAi] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 via-white to-blue-50">
      {/* Top bar */}
      <header className="border-b bg-white/80 backdrop-blur">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-teal-600 text-white text-lg font-bold">
              H+
            </span>
            <div>
              <h1 className="text-xl font-bold text-teal-700 tracking-tight">
                Health<span className="text-blue-600">Plus</span>
              </h1>
              <p className="text-[11px] text-gray-400">
                Smart doctor–patient appointments & payments
              </p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-sm text-gray-600">
            <a href="#how-it-works" className="hover:text-teal-700">
              How it works
            </a>
            <a href="#care" className="hover:text-teal-700">
              Care paths
            </a>
            <a href="#stories" className="hover:text-teal-700">
              Patient stories
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="text-sm font-medium text-teal-700 hover:text-teal-800"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="hidden sm:inline-flex px-4 py-2 rounded-xl bg-teal-600 text-white text-sm font-semibold shadow-md hover:bg-teal-700 transition"
            >
              Create free account
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <main className="max-w-7xl mx-auto px-6 pt-10 pb-16 space-y-16">
        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full bg-teal-50 px-3 py-1 text-xs font-medium text-teal-700 border border-teal-100">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              24x7 secure doctor–patient platform
            </p>

            <h2 className="mt-4 text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
              Your digital clinic for
              <span className="block text-teal-600">
                appointments, chat & video consults.
              </span>
            </h2>

            <p className="mt-5 text-gray-600 max-w-xl text-sm md:text-base">
              Book appointments, chat securely with doctors, complete payments,
              and join video consultations from anywhere—without waiting room
              delays.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                to="/create-appointment"
                className="px-6 py-3 rounded-xl bg-teal-600 text-white text-sm md:text-base font-semibold shadow-lg hover:bg-teal-700 transition"
              >
                Book an appointment
              </Link>
              <button
                onClick={() => setChatWithAi(true)}
                className="px-6 py-3 rounded-xl bg-white/80 border border-teal-200 text-teal-700 text-sm md:text-base font-semibold hover:bg-teal-50 transition flex items-center gap-2"
              >
                <span className="text-lg">🩺</span>
                Chat with AI nurse
              </button>
            </div>

            {/* Stats */}
            <div className="mt-8 grid grid-cols-3 gap-4 max-w-md">
              {stats.map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl bg-white/80 border border-teal-50 px-4 py-3 shadow-sm"
                >
                  <p className="text-lg font-bold text-teal-700">
                    {item.value}
                  </p>
                  <p className="text-xs text-gray-500">{item.label}</p>
                  <p className="mt-1 text-[10px] text-gray-400">{item.tone}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Hero image + overlay */}
          <div className="relative">
            <div className="absolute inset-0 bg-teal-200 rounded-3xl blur-3xl opacity-30" />
            <div className="relative bg-white rounded-3xl shadow-2xl p-4 md:p-6 space-y-4">
              <div className="overflow-hidden rounded-2xl">
                <img
                  src={banner}
                  alt="Doctor with patient"
                  className="h-72 w-full object-cover"
                />
              </div>

              {/* Mini dashboard overlay */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="rounded-2xl border bg-teal-50/60 p-3 flex items-center gap-3">
                  <div className="h-9 w-9 rounded-full bg-white flex items-center justify-center">
                    <Stethoscope className="w-5 h-5 text-teal-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">
                      Live consultation
                    </p>
                    <p className="text-[11px] text-gray-500">
                      Dr. Mehta • Cardiology
                    </p>
                  </div>
                </div>
                <div className="rounded-2xl border bg-white p-3 space-y-1">
                  <p className="text-[11px] text-gray-500">Today</p>
                  <p className="text-xs font-semibold text-gray-800">
                    4 upcoming appointments
                  </p>
                  <div className="flex gap-1 mt-1">
                    <span className="h-1.5 flex-1 rounded-full bg-teal-500" />
                    <span className="h-1.5 flex-1 rounded-full bg-blue-200" />
                    <span className="h-1.5 flex-1 rounded-full bg-emerald-200" />
                  </div>
                </div>
                <div className="col-span-2 rounded-2xl border bg-gradient-to-r from-teal-600 to-blue-600 p-3 text-white flex items-center justify-between">
                  <div>
                    <p className="text-xs text-teal-100">
                      Secure, encrypted conversations
                    </p>
                    <p className="text-sm font-semibold">
                      Doctor–patient chat enabled
                    </p>
                  </div>
                  <ShieldCheck className="w-6 h-6 text-emerald-200" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Care paths */}
        <section
          id="care"
          className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start"
        >
          <div className="md:col-span-1 space-y-3">
            <h3 className="text-lg font-semibold text-gray-900">
              Designed for real doctor–patient journeys
            </h3>
            <p className="text-sm text-gray-600">
              From first symptom to follow-up payment, HealthPlus keeps
              everything organized, guided and easy to track.
            </p>
          </div>
          {carePaths.map((path) => (
            <div
              key={path.title}
              className="rounded-2xl bg-white border shadow-sm p-5 space-y-2"
            >
              <p className="text-sm font-semibold text-teal-700">
                {path.title}
              </p>
              <p className="text-xs text-gray-600">{path.desc}</p>
              <p className="mt-2 text-[11px] text-gray-400">
                Example: book, chat, video call and get digital summary.
              </p>
            </div>
          ))}
        </section>

        {/* How it works + testimonials */}
        <section
          id="how-it-works"
          className="grid grid-cols-1 lg:grid-cols-2 gap-10"
        >
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <CalendarCheck className="w-5 h-5 text-teal-600" />
              How HealthPlus works
            </h3>
            <ol className="space-y-3 text-sm text-gray-600">
              <li>
                <span className="font-semibold text-teal-700">1.</span> Create a
                patient or doctor account.
              </li>
              <li>
                <span className="font-semibold text-teal-700">2.</span> Book an
                appointment and receive instant confirmation.
              </li>
              <li>
                <span className="font-semibold text-teal-700">3.</span> Join
                secure chat or video consultation at the scheduled time.
              </li>
              <li>
                <span className="font-semibold text-teal-700">4.</span> Pay
                securely and track visit history in your dashboard.
              </li>
            </ol>
          </div>

          <div id="stories" className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Doctor & patient stories
            </h3>
            <div className="grid gap-4 md:grid-cols-2">
              {testimonials.map((t) => (
                <div
                  key={t.name}
                  className="rounded-2xl bg-white border shadow-sm p-4 text-sm"
                >
                  <p className="text-gray-600 text-xs mb-2">“{t.text}”</p>
                  <p className="mt-2 text-xs font-semibold text-gray-900">
                    {t.name}
                  </p>
                  <p className="text-[11px] text-teal-600">{t.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Floating AI widget */}
      {chatWithAi && (
        <div className="fixed bottom-24 right-4 sm:right-6 z-50">
          <CheckHealth onClose={() => setChatWithAi(false)} />
        </div>
      )}

      {/* Footer */}
      <footer className="border-t bg-white/70">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-gray-400">
          <p>
            © {new Date().getFullYear()} Healthplus. Secure digital healthcare
            for patients & doctors.
          </p>
          <div className="flex gap-4">
            <span>Privacy-first</span>
            <span>HIPAA-inspired design</span>
            <span>India-ready payments</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
