import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Sprout,
  Mail,
  User,
  Lock,
  ArrowRight,
  CheckCircle2,
  Leaf,
  Wheat,
  Droplets,
  Sun,
  ShieldCheck,
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      await register(email, fullName, password);

      navigate("/login");
    } catch (err) {
      setError(
        err.response?.data?.detail ||
        "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-green-950 via-emerald-900 to-lime-950">

      {/* =====================================================
          AGRICULTURE BACKGROUND
      ====================================================== */}

      {/* Large decorative circles */}
      <div className="pointer-events-none absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-green-400/10 blur-3xl" />

      <div className="pointer-events-none absolute -bottom-52 -right-40 h-[600px] w-[600px] rounded-full bg-lime-400/10 blur-3xl" />

      <div className="pointer-events-none absolute left-1/2 top-1/3 h-96 w-96 -translate-x-1/2 rounded-full bg-emerald-300/5 blur-3xl" />


      {/* =====================================================
          DECORATIVE AGRICULTURE ICONS
      ====================================================== */}

      <div className="pointer-events-none absolute left-[6%] top-[15%] rotate-12 text-green-300/10">
        <Leaf size={120} strokeWidth={1} />
      </div>

      <div className="pointer-events-none absolute right-[7%] top-[18%] -rotate-12 text-lime-300/10">
        <Wheat size={130} strokeWidth={1} />
      </div>

      <div className="pointer-events-none absolute bottom-[12%] left-[8%] text-emerald-200/10">
        <Sprout size={140} strokeWidth={1} />
      </div>

      <div className="pointer-events-none absolute bottom-[15%] right-[10%] text-green-200/10">
        <Droplets size={120} strokeWidth={1} />
      </div>

      <div className="pointer-events-none absolute right-[30%] top-[8%] text-yellow-200/10">
        <Sun size={90} strokeWidth={1} />
      </div>


      {/* =====================================================
          TOP BRANDING
      ====================================================== */}

      <header className="relative z-10 border-b border-white/10 bg-black/10 backdrop-blur-md">

        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

          <Link
            to="/login"
            className="flex items-center gap-3"
          >

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-lime-400 to-green-600 shadow-lg shadow-green-950/40">

              <Sprout
                size={24}
                className="text-white"
              />

            </div>

            <div>

              <h1 className="text-lg font-bold text-white">
                ICT Bangladesh
              </h1>

              <p className="text-xs text-lime-300">
                AI Learning & Technology
              </p>

            </div>

          </Link>


          <div className="hidden text-right sm:block">

            <p className="text-sm font-semibold text-white">
              AI Engineering Learning
            </p>

            <p className="text-xs text-green-200/70">
              Learn • Build • Innovate
            </p>

          </div>

        </div>

      </header>


      {/* =====================================================
          MAIN CONTENT
      ====================================================== */}

      <main className="relative z-10 flex min-h-[calc(100vh-73px)] items-center justify-center px-5 py-10">

        <div className="w-full max-w-6xl">

          {/* =================================================
              PROJECT INTRO
          ================================================== */}

          <div className="mb-8 text-center">

            <div className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border border-green-300/20 bg-green-300/10 px-4 py-2 backdrop-blur">

              <Sprout
                size={16}
                className="text-lime-300"
              />

              <span className="text-sm font-medium text-green-100">
                Smart Agriculture & AI Platform
              </span>

            </div>


            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">

              Grow Your Future With

              <span className="ml-2 text-lime-300">
                AI
              </span>

            </h2>


            <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-green-100/70 sm:text-base">

              Join AgriPulse AI and explore intelligent agriculture,
              crop disease detection, recommendations, weather insights
              and modern AI engineering.

            </p>

          </div>


          {/* =================================================
              REGISTER CARD
          ================================================== */}

          <div className="mx-auto max-w-2xl overflow-hidden rounded-3xl border border-white/20 bg-white/95 shadow-2xl shadow-black/30 backdrop-blur-xl">

            {/* Card Header */}

            <div className="border-b border-gray-100 bg-gradient-to-r from-green-50 via-white to-lime-50 px-7 py-6 sm:px-10">

              <div className="flex items-center gap-4">

                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 shadow-lg shadow-green-500/20">

                  <Sprout
                    size={28}
                    className="text-white"
                  />

                </div>


                <div>

                  <h3 className="text-2xl font-bold text-gray-900">
                    Create Your Account
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    Start your AgriPulse AI journey today
                  </p>

                </div>

              </div>

            </div>


            {/* Form */}

            <div className="px-7 py-7 sm:px-10 sm:py-9">

              {/* Error */}

              {error && (

                <div className="mb-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">

                  <span className="mt-0.5">⚠️</span>

                  <span>{error}</span>

                </div>

              )}


              <form
                onSubmit={handleSubmit}
                className="space-y-5"
              >

                {/* Full Name */}

                <div>

                  <label className="mb-2 block text-sm font-semibold text-gray-700">

                    Full Name

                  </label>

                  <div className="relative">

                    <User
                      size={19}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                      type="text"
                      placeholder="Enter your full name"
                      value={fullName}
                      onChange={(e) =>
                        setFullName(e.target.value)
                      }
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3.5 pl-12 pr-4 text-gray-800 outline-none transition placeholder:text-gray-400 hover:border-gray-300 focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-100"
                      required
                    />

                  </div>

                </div>


                {/* Email */}

                <div>

                  <label className="mb-2 block text-sm font-semibold text-gray-700">

                    Email Address

                  </label>

                  <div className="relative">

                    <Mail
                      size={19}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) =>
                        setEmail(e.target.value)
                      }
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3.5 pl-12 pr-4 text-gray-800 outline-none transition placeholder:text-gray-400 hover:border-gray-300 focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-100"
                      required
                    />

                  </div>

                </div>


                {/* Password */}

                <div>

                  <label className="mb-2 block text-sm font-semibold text-gray-700">

                    Password

                  </label>

                  <div className="relative">

                    <Lock
                      size={19}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                      type="password"
                      placeholder="Create a secure password"
                      value={password}
                      onChange={(e) =>
                        setPassword(e.target.value)
                      }
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3.5 pl-12 pr-4 text-gray-800 outline-none transition placeholder:text-gray-400 hover:border-gray-300 focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-100"
                      required
                    />

                  </div>

                </div>


                {/* Security Information */}

                <div className="rounded-xl border border-green-100 bg-green-50 p-4">

                  <div className="flex items-start gap-3">

                    <ShieldCheck
                      size={21}
                      className="mt-0.5 shrink-0 text-green-600"
                    />

                    <div>

                      <p className="text-sm font-semibold text-green-800">
                        Your account is protected
                      </p>

                      <p className="mt-1 text-xs leading-5 text-green-700">
                        Use a strong password to keep your
                        AgriPulse AI account secure.
                      </p>

                    </div>

                  </div>

                </div>


                {/* Register Button */}

                <button
                  type="submit"
                  disabled={loading}
                  className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-green-600 via-emerald-600 to-green-700 px-5 py-3.5 font-semibold text-white shadow-lg shadow-green-600/20 transition duration-200 hover:-translate-y-0.5 hover:from-green-700 hover:via-emerald-700 hover:to-green-800 disabled:cursor-not-allowed disabled:opacity-60"
                >

                  {loading
                    ? "Creating Account..."
                    : "Create Account"
                  }

                  {!loading && (
                    <ArrowRight
                      size={19}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  )}

                </button>

              </form>


              {/* Login */}

              <div className="mt-7 text-center">

                <p className="text-sm text-gray-500">

                  Already have an account?

                  <Link
                    to="/login"
                    className="ml-1 font-semibold text-green-600 transition hover:text-green-700 hover:underline"
                  >
                    Login
                  </Link>

                </p>

              </div>

            </div>


            {/* =================================================
                PROJECT FOOTER
            ================================================== */}

            <div className="border-t border-gray-100 bg-gray-50 px-7 py-5 sm:px-10">

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">

                <div className="flex items-center gap-2">

                  <CheckCircle2
                    size={17}
                    className="text-green-600"
                  />

                  <span className="text-xs text-gray-600">
                    AI Powered
                  </span>

                </div>


                <div className="flex items-center gap-2">

                  <Wheat
                    size={17}
                    className="text-green-600"
                  />

                  <span className="text-xs text-gray-600">
                    Smart Farming
                  </span>

                </div>


                <div className="flex items-center gap-2">

                  <Droplets
                    size={17}
                    className="text-green-600"
                  />

                  <span className="text-xs text-gray-600">
                    Agriculture Analytics
                  </span>

                </div>

              </div>

            </div>

          </div>


          {/* =================================================
              BOTTOM PROJECT BRANDING
          ================================================== */}

          <div className="mt-8 text-center">

            <p className="text-xs uppercase tracking-[0.25em] text-green-300/50">
              Student AI Project
            </p>

            <p className="mt-2 text-lg font-bold text-white">
              AgriPulse AI
            </p>

            <p className="mt-1 text-sm text-green-100/50">
              Smart Agriculture & AI Platform
            </p>

            <p className="mt-3 text-xs text-green-100/40">
              AI Engineering Learning • ICT Bangladesh
            </p>

          </div>

        </div>

      </main>

    </div>
  );
};

export default Register;

