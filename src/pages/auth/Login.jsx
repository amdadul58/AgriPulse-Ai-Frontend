
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Leaf,
  Sprout,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const result = await login(email, password);

      if (result.success) {
        navigate("/dashboard");
      } else if (result.otp_required) {
        alert("OTP verification required");
      } else {
        setError(result.message || "Login failed");
      }
    } catch (err) {
      setError(
        err.response?.data?.detail ||
          "Invalid email or password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#dff3df]">

      {/* =====================================================
          SKY
      ====================================================== */}

      <div className="absolute inset-0 bg-gradient-to-b from-[#8ed8e8] via-[#c9efd8] to-[#f5e7ad]" />

      {/* Sun */}

      <div className="absolute right-[12%] top-[8%] h-24 w-24 rounded-full bg-[#ffe9a6] shadow-[0_0_70px_25px_rgba(255,225,130,0.35)] sm:h-32 sm:w-32" />

      {/* Soft clouds */}

      <div className="absolute left-[8%] top-[12%] h-8 w-32 rounded-full bg-white/50 blur-sm" />
      <div className="absolute left-[15%] top-[9%] h-10 w-24 rounded-full bg-white/40 blur-sm" />

      <div className="absolute right-[28%] top-[18%] h-7 w-28 rounded-full bg-white/40 blur-sm" />


      {/* =====================================================
          DISTANT TREES / VILLAGE
      ====================================================== */}

      <div className="absolute bottom-[38%] left-0 right-0 h-28">

        {/* distant green land */}

        <div className="absolute bottom-0 h-20 w-full bg-gradient-to-t from-[#5eaa55] to-[#8bc76d]" />

        {/* trees */}

        <div className="absolute bottom-8 left-[4%] h-20 w-20 rounded-full bg-[#3f8d4b]" />
        <div className="absolute bottom-8 left-[8%] h-28 w-28 rounded-full bg-[#4c9a51]" />

        <div className="absolute bottom-7 right-[5%] h-24 w-24 rounded-full bg-[#438d48]" />
        <div className="absolute bottom-7 right-[10%] h-32 w-32 rounded-full bg-[#4f9d50]" />

        {/* village house */}

        <div className="absolute bottom-7 left-[24%]">

          <div className="relative h-20 w-32 bg-[#e9c58c] shadow-md">

            <div className="absolute -top-9 left-[-10px] h-0 w-0 border-l-[75px] border-r-[75px] border-b-[45px] border-l-transparent border-r-transparent border-b-[#a9573f]" />

            <div className="absolute bottom-0 left-12 h-12 w-8 bg-[#774b35]" />

            <div className="absolute bottom-8 left-5 h-6 w-6 bg-[#8bd2dc]" />
            <div className="absolute bottom-8 right-5 h-6 w-6 bg-[#8bd2dc]" />

          </div>

        </div>

      </div>


      {/* =====================================================
          RIVER
      ====================================================== */}

      <div className="absolute bottom-0 left-0 right-0 h-[39%] overflow-hidden">

        <div className="absolute inset-0 bg-gradient-to-b from-[#63bdd1] via-[#4ba8c1] to-[#237e9c]" />

        {/* river shine */}

        <div className="absolute left-0 top-[22%] h-1 w-[55%] rounded-full bg-white/30" />
        <div className="absolute right-[5%] top-[42%] h-1 w-[35%] rounded-full bg-white/20" />
        <div className="absolute left-[15%] top-[65%] h-1 w-[40%] rounded-full bg-white/20" />


        {/* =================================================
            BOAT
        ================================================== */}

        <div className="absolute left-[8%] top-[28%]">

          {/* boat body */}

          <div className="relative h-8 w-40">

            <div className="absolute bottom-0 h-6 w-40 rounded-b-[60%] bg-[#633d27] shadow-lg" />

            <div className="absolute bottom-4 left-4 h-3 w-32 rounded-full bg-[#8b5a35]" />

          </div>


          {/* boat person / majhi */}

          <div className="absolute bottom-8 left-20">

            {/* head */}

            <div className="mx-auto h-5 w-5 rounded-full bg-[#6b422c]" />

            {/* body */}

            <div className="mx-auto h-10 w-7 rounded-t-lg bg-[#315f45]" />

          </div>


          {/* oar */}

          <div className="absolute -right-8 bottom-5 h-1 w-24 rotate-[35deg] rounded-full bg-[#70452c]" />

        </div>


        {/* second tiny boat */}

        <div className="absolute right-[12%] top-[55%]">

          <div className="h-4 w-24 rounded-b-full bg-[#70442b]" />

          <div className="absolute -top-5 left-10 h-6 w-1 bg-[#70442b]" />

        </div>


        {/* water waves */}

        <div className="absolute bottom-[20%] left-[30%] h-2 w-48 rounded-full bg-white/15" />
        <div className="absolute bottom-[35%] right-[25%] h-2 w-56 rounded-full bg-white/15" />
        <div className="absolute bottom-[50%] left-[50%] h-1 w-32 rounded-full bg-white/20" />

      </div>


      {/* =====================================================
          RICE FIELD
      ====================================================== */}

      <div className="absolute bottom-[29%] left-0 h-36 w-[48%] overflow-hidden">

        <div className="absolute inset-0 bg-gradient-to-t from-[#3f8f43] to-[#78b94f]" />

        {/* rice rows */}

        <div className="absolute bottom-3 left-4 right-0 space-y-3 opacity-50">

          <div className="h-1 w-full rotate-2 bg-[#d8e87d]" />
          <div className="h-1 w-[90%] rotate-2 bg-[#d8e87d]" />
          <div className="h-1 w-[82%] rotate-2 bg-[#d8e87d]" />
          <div className="h-1 w-[75%] rotate-2 bg-[#d8e87d]" />

        </div>

      </div>


      {/* =====================================================
          RIGHT FIELD
      ====================================================== */}

      <div className="absolute bottom-[27%] right-0 h-40 w-[45%] overflow-hidden">

        <div className="absolute inset-0 bg-gradient-to-t from-[#397f3e] to-[#79b956]" />

        <div className="absolute bottom-5 left-0 right-0 space-y-4 opacity-40">

          <div className="h-1 w-full bg-[#d9e980]" />
          <div className="h-1 w-[90%] bg-[#d9e980]" />
          <div className="h-1 w-[80%] bg-[#d9e980]" />

        </div>

      </div>


      {/* =====================================================
          FOREGROUND DARK GRASS
      ====================================================== */}

      <div className="absolute bottom-0 left-0 right-0 h-8 bg-[#225b32]" />


      {/* =====================================================
          LOGIN CONTENT
      ====================================================== */}

      <div className="relative z-20 flex min-h-screen items-center justify-center px-4 py-10">

        <div className="w-full max-w-[430px]">

          {/* =================================================
              LOGIN CARD
          ================================================== */}

          <div className="rounded-[30px] border border-white/60 bg-white/95 p-2 shadow-[0_25px_80px_rgba(20,80,50,0.28)] backdrop-blur-xl">

            <div className="rounded-[24px] border border-green-100 bg-white px-6 py-8 sm:px-9">

              {/* Brand */}

              <div className="mb-7 text-center">

                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#277a43] to-[#58a94e] shadow-lg shadow-green-700/20">

                  <Sprout
                    size={32}
                    className="text-white"
                  />

                </div>

                <h1 className="text-2xl font-black tracking-tight text-[#183d27]">
                  AgriPulse AI
                </h1>

                <p className="mt-1 text-sm font-medium text-[#4d8b50]">
                  Smart Agriculture Platform
                </p>

              </div>


              {/* Title */}

              <div className="mb-6">

                <h2 className="text-2xl font-bold text-gray-900">
                  Welcome back
                </h2>

                <p className="mt-1.5 text-sm text-gray-500">
                  Sign in to continue your farming journey.
                </p>

              </div>


              {/* Error */}

              {error && (

                <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">

                  {error}

                </div>

              )}


              {/* Form */}

              <form onSubmit={handleSubmit}>

                {/* Email */}

                <div className="mb-5">

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
                      value={email}
                      onChange={(e) =>
                        setEmail(e.target.value)
                      }
                      placeholder="Enter your email"
                      required
                      className="w-full rounded-xl border border-gray-200 bg-[#f7faf7] py-3.5 pl-11 pr-4 text-sm text-gray-900 outline-none transition focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-100"
                    />

                  </div>

                </div>


                {/* Password */}

                <div>

                  <div className="mb-2 flex items-center justify-between">

                    <label className="text-sm font-semibold text-gray-700">
                      Password
                    </label>

                    <Link
                      to="/forgot-password"
                      className="text-xs font-bold text-green-600 hover:text-green-700"
                    >
                      Forgot Password?
                    </Link>

                  </div>

                  <div className="relative">

                    <Lock
                      size={19}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                      type={
                        showPassword
                          ? "text"
                          : "password"
                      }
                      value={password}
                      onChange={(e) =>
                        setPassword(e.target.value)
                      }
                      placeholder="Enter your password"
                      required
                      className="w-full rounded-xl border border-gray-200 bg-[#f7faf7] py-3.5 pl-11 pr-12 text-sm text-gray-900 outline-none transition focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-100"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword(!showPassword)
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-green-600"
                    >

                      {showPassword ? (
                        <EyeOff size={19} />
                      ) : (
                        <Eye size={19} />
                      )}

                    </button>

                  </div>

                </div>


                {/* Login button */}

                <button
                  type="submit"
                  disabled={loading}
                  className="group mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#247642] via-[#3d9850] to-[#247642] px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-green-800/20 transition duration-300 hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
                >

                  {loading ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      Signing in...
                    </>
                  ) : (
                    <>
                      Sign in to AgriPulse AI
                      <ArrowRight
                        size={18}
                        className="transition group-hover:translate-x-1"
                      />
                    </>
                  )}

                </button>

              </form>


              {/* Register */}

              <div className="mt-7 border-t border-gray-100 pt-6 text-center">

                <p className="text-sm text-gray-500">

                  Don't have an account?

                  <Link
                    to="/register"
                    className="ml-1 font-bold text-green-600 hover:text-green-700"
                  >
                    Create an account
                  </Link>

                </p>

              </div>


              {/* Small brand footer */}

              <div className="mt-6 flex items-center justify-center gap-2">

                <Leaf
                  size={14}
                  className="text-green-600"
                />

                <span className="text-[11px] font-medium text-gray-400">
                  ICT Bangladesh • AI Engineering Learning
                </span>

              </div>

            </div>

          </div>

        </div>

      </div>


      {/* =====================================================
          TOP BRAND
      ====================================================== */}

      <div className="absolute left-5 top-5 z-30 hidden items-center gap-3 sm:flex">

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/90 shadow-lg">

          <Leaf
            size={21}
            className="text-green-700"
          />

        </div>

        <div>

          <p className="text-sm font-black text-[#183d27]">
            ICT Bangladesh
          </p>

          <p className="text-[10px] font-medium text-green-700">
            AI Engineering Learning
          </p>

        </div>

      </div>


      {/* =====================================================
          BOTTOM LABEL
      ====================================================== */}

      <div className="absolute bottom-3 left-0 right-0 z-30 text-center">

        <p className="text-[10px] font-medium text-white/80">
          AgriPulse AI • Smart Agriculture & AI Platform
        </p>

      </div>

    </div>
  );
};

export default Login;

