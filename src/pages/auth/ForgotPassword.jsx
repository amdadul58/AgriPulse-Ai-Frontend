import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Mail,
  ArrowLeft,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  LockKeyhole,
} from "lucide-react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    // Backend password reset API এখনো তৈরি হয়নি।
    // আপাতত UI flow দেখানো হচ্ছে।
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 800);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950">

      {/* =====================================================
          BACKGROUND
      ====================================================== */}

      <div className="absolute inset-0 overflow-hidden">

        <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-emerald-500/15 blur-3xl" />

        <div className="absolute -right-40 top-10 h-[500px] w-[500px] rounded-full bg-cyan-500/15 blur-3xl" />

        <div className="absolute bottom-[-250px] left-1/3 h-[500px] w-[500px] rounded-full bg-green-500/10 blur-3xl" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.08),transparent_45%)]" />

        {/* Grid */}

        <div
          className="absolute inset-0 opacity-[0.045]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />

      </div>


      {/* =====================================================
          CONTENT
      ====================================================== */}

      <div className="relative z-10 flex min-h-screen flex-col">


        {/* ===================================================
            HEADER
        ==================================================== */}

        <header className="flex items-center justify-between px-5 py-5 md:px-10 lg:px-14">

          <Link
            to="/login"
            className="flex items-center gap-3"
          >

            {/* ICT Logo */}

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white shadow-xl">

              <span className="text-sm font-black tracking-tight text-emerald-600">
                ICT
              </span>

            </div>


            <div>

              <h1 className="text-sm font-bold tracking-wide text-white md:text-base">
                ICT Bangladesh
              </h1>

              <p className="text-[11px] text-emerald-300 md:text-xs">
                AI Engineering Learning
              </p>

            </div>

          </Link>


          {/* Header Badge */}

          <div className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-md sm:flex">

            <Sparkles
              size={14}
              className="text-emerald-400"
            />

            <span className="text-xs font-medium text-slate-300">
              Learn • Build • Deploy
            </span>

          </div>

        </header>


        {/* ===================================================
            MAIN
        ==================================================== */}

        <main className="flex flex-1 items-center justify-center px-4 py-8 md:px-6">

          <div className="w-full max-w-6xl">


            {/* =================================================
                TOP TITLE
            ================================================== */}

            <div className="mb-8 text-center">

              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2">

                <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />

                <span className="text-xs font-medium text-emerald-300">
                  Secure Account Recovery
                </span>

              </div>


              <h2 className="text-3xl font-black tracking-tight text-white md:text-5xl">

                Get back to your{" "}

                <span className="bg-gradient-to-r from-emerald-400 via-green-300 to-cyan-400 bg-clip-text text-transparent">
                  AI journey.
                </span>

              </h2>


              <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-slate-400 md:text-base">

                Securely recover your AgriPulse AI account and
                continue building real-world AI solutions.

              </p>

            </div>


            {/* =================================================
                CARD
            ================================================== */}

            <div className="mx-auto max-w-xl">

              <div className="rounded-3xl border border-white/10 bg-white/[0.07] p-[1px] shadow-2xl shadow-black/40 backdrop-blur-2xl">

                <div className="rounded-3xl bg-slate-950/85 p-7 md:p-10">


                  {!submitted ? (

                    <>
                      {/* =======================================
                          ICON
                      ======================================== */}

                      <div className="mb-7 flex justify-center">

                        <div className="relative">

                          <div className="absolute inset-0 rounded-2xl bg-emerald-400/20 blur-xl" />

                          <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl border border-emerald-400/20 bg-gradient-to-br from-emerald-400/20 to-green-600/10">

                            <LockKeyhole
                              size={34}
                              className="text-emerald-400"
                            />

                          </div>

                        </div>

                      </div>


                      {/* =======================================
                          TITLE
                      ======================================== */}

                      <div className="text-center">

                        <h3 className="text-2xl font-bold text-white md:text-3xl">
                          Forgot your password?
                        </h3>

                        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-400">
                          No worries. Enter the email address
                          associated with your AgriPulse AI account.
                        </p>

                      </div>


                      {/* =======================================
                          FORM
                      ======================================== */}

                      <form
                        onSubmit={handleSubmit}
                        className="mt-8"
                      >

                        <label className="mb-2 block text-sm font-medium text-slate-300">
                          Email Address
                        </label>


                        <div className="relative">

                          <Mail
                            size={19}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                          />

                          <input
                            type="email"
                            value={email}
                            onChange={(e) =>
                              setEmail(e.target.value)
                            }
                            placeholder="Enter your email"
                            required
                            className="w-full rounded-xl border border-white/10 bg-white/5 py-3.5 pl-12 pr-4 text-sm text-white placeholder-slate-500 outline-none transition focus:border-emerald-400/50 focus:bg-white/[0.08] focus:ring-2 focus:ring-emerald-400/10"
                          />

                        </div>


                        {/* Security Note */}

                        <div className="mt-4 flex items-start gap-3 rounded-xl border border-white/5 bg-white/[0.03] p-4">

                          <ShieldCheck
                            size={19}
                            className="mt-0.5 shrink-0 text-emerald-400"
                          />

                          <p className="text-xs leading-5 text-slate-400">
                            Your account information remains secure.
                            Password recovery will be available after
                            the backend reset API is connected.
                          </p>

                        </div>


                        {/* Submit */}

                        <button
                          type="submit"
                          disabled={loading}
                          className="mt-5 w-full rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-emerald-500/20 transition duration-200 hover:-translate-y-0.5 hover:from-emerald-400 hover:to-green-500 disabled:cursor-not-allowed disabled:opacity-60"
                        >

                          {loading ? (

                            <span className="flex items-center justify-center gap-2">

                              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />

                              Sending Request...

                            </span>

                          ) : (

                            "Send Password Reset Request →"

                          )}

                        </button>

                      </form>


                      {/* Back */}

                      <div className="mt-7 text-center">

                        <Link
                          to="/login"
                          className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-400 transition hover:text-emerald-300"
                        >

                          <ArrowLeft size={17} />

                          Back to Login

                        </Link>

                      </div>

                    </>

                  ) : (

                    /* ==========================================
                       SUCCESS
                    =========================================== */

                    <div className="flex min-h-[420px] flex-col items-center justify-center text-center">

                      <div className="relative">

                        <div className="absolute inset-0 rounded-full bg-emerald-400/20 blur-2xl" />

                        <div className="relative flex h-24 w-24 items-center justify-center rounded-full border border-emerald-400/20 bg-emerald-400/10">

                          <CheckCircle2
                            size={48}
                            className="text-emerald-400"
                          />

                        </div>

                      </div>


                      <h3 className="mt-7 text-2xl font-bold text-white">
                        Request Received
                      </h3>


                      <p className="mt-3 max-w-md text-sm leading-6 text-slate-400">

                        We've received your password reset request
                        for{" "}

                        <span className="font-medium text-slate-200">
                          {email}
                        </span>

                        .

                      </p>


                      <div className="mt-5 rounded-xl border border-amber-400/10 bg-amber-400/5 px-5 py-4">

                        <p className="text-xs leading-5 text-amber-300">

                          Password reset functionality will become
                          active once the backend password reset API
                          is connected.

                        </p>

                      </div>


                      <Link
                        to="/login"
                        className="mt-7 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-500/20 transition hover:-translate-y-0.5"
                      >

                        <ArrowLeft size={17} />

                        Back to Login

                      </Link>

                    </div>

                  )}

                </div>

              </div>

            </div>


            {/* =================================================
                PROJECT CARDS
            ================================================== */}

            <div className="mx-auto mt-8 grid max-w-5xl gap-4 md:grid-cols-3">

              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-md">

                <div className="mb-3 text-2xl">
                  🤖
                </div>

                <h4 className="text-sm font-semibold text-white">
                  Practical AI Engineering
                </h4>

                <p className="mt-2 text-xs leading-5 text-slate-500">
                  Learn by building real applications.
                </p>

              </div>


              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-md">

                <div className="mb-3 text-2xl">
                  🚀
                </div>

                <h4 className="text-sm font-semibold text-white">
                  Real-World Project
                </h4>

                <p className="mt-2 text-xs leading-5 text-slate-500">
                  Build production-ready AI solutions.
                </p>

              </div>


              <div className="rounded-2xl border border-emerald-400/15 bg-emerald-400/[0.05] p-5 backdrop-blur-md">

                <div className="mb-3 text-2xl">
                  🌱
                </div>

                <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-emerald-400">
                  Student AI Project
                </p>

                <h4 className="mt-1 text-sm font-bold text-white">
                  AgriPulse AI
                </h4>

                <p className="mt-2 text-xs text-slate-500">
                  Smart Agriculture & AI Platform
                </p>

              </div>

            </div>

          </div>

        </main>


        {/* ===================================================
            FOOTER
        ==================================================== */}

        <footer className="px-6 py-5 text-center">

          <p className="text-xs text-slate-600">

            Built with ❤️ as part of{" "}

            <span className="text-slate-400">
              AI Engineering Learning
            </span>

            {" "}at{" "}

            <span className="font-medium text-emerald-500">
              ICT Bangladesh
            </span>

          </p>

        </footer>

      </div>

    </div>
  );
};

export default ForgotPassword;

