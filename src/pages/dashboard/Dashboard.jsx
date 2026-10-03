import {
  Sprout,
  Stethoscope,
  Leaf,
  Droplets,
  CloudSun,
  Bell,
  TrendingUp,
  Activity,
  ArrowRight,
  Tractor,
  ScanSearch,
  MessageSquare,
  Wheat,
  ShieldCheck,
  Sparkles,
  MapPin,
  ChevronRight,
  FileText,
} from "lucide-react";

import { NavLink } from "react-router-dom";

const Dashboard = () => {
  const stats = [
    {
      title: "My Applications",
      value: "0",
      description: "Submitted records",
      icon: FileText,
      path: "/dashboard/applications",
      bg: "bg-emerald-500/10",
      iconBg: "bg-emerald-500/20",
      iconColor: "text-emerald-400",
    },
    {
      title: "Document Checks",
      value: "0",
      description: "Recent verifications",
      icon: Stethoscope,
      path: "/dashboard/document-check",
      bg: "bg-rose-500/10",
      iconBg: "bg-rose-500/20",
      iconColor: "text-rose-400",
    },
    {
      title: "Controller Advice",
      value: "0",
      description: "AI guidance",
      icon: Leaf,
      path: "/dashboard/controller-advice",
      bg: "bg-lime-500/10",
      iconBg: "bg-lime-500/20",
      iconColor: "text-lime-400",
    },
    {
      title: "Resource Advice",
      value: "0",
      description: "Recommendations",
      icon: Droplets,
      path: "/dashboard/resources",
      bg: "bg-sky-500/10",
      iconBg: "bg-sky-500/20",
      iconColor: "text-sky-400",
    },
  ];

  const quickActions = [
    {
      title: "Document Check",
      description: "Check your paperwork for possible errors.",
      icon: Stethoscope,
      path: "/dashboard/document-check",
      gradient: "from-rose-500 to-red-600",
      light: "bg-rose-500/10",
    },
    {
      title: "Vision Scan",
      description: "Upload a document image for AI analysis.",
      icon: ScanSearch,
      path: "/dashboard/vision-scan",
      gradient: "from-violet-500 to-purple-600",
      light: "bg-violet-500/10",
    },
    {
      title: "Controller Advice",
      description: "Find suitable guidelines for your role.",
      icon: Leaf,
      path: "/dashboard/controller-advice",
      gradient: "from-emerald-500 to-green-600",
      light: "bg-emerald-500/10",
    },
    {
      title: "Resource Guidance",
      description: "Get intelligent operational guidance.",
      icon: Droplets,
      path: "/dashboard/resources",
      gradient: "from-sky-500 to-blue-600",
      light: "bg-sky-500/10",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0b132b] text-slate-100 pb-10">
      {/* =====================================================
          PAGE HEADER
      ====================================================== */}

      <div className="mb-7 flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/20">
              <FileText size={15} className="text-emerald-400" />
            </span>

            <span className="text-xs font-bold uppercase tracking-[0.15em] text-emerald-400">
              Document Control
            </span>
          </div>

          <h1 className="text-3xl font-black tracking-tight text-white md:text-4xl">
            Controller Dashboard
          </h1>

          <p className="mt-1 text-sm text-slate-400">
            Manage your records and make smarter decisions with AI.
          </p>
        </div>

        <NavLink
          to="/dashboard/notifications"
          className="
            group inline-flex w-fit items-center gap-2
            rounded-xl border border-slate-800
            bg-[#111c38] px-4 py-3
            text-sm font-semibold text-slate-300
            shadow-sm
            transition
            hover:-translate-y-0.5 hover:border-emerald-500/50 hover:text-emerald-400 hover:shadow-md
          "
        >
          <Bell size={18} />

          Notifications

          <ChevronRight
            size={16}
            className="transition group-hover:translate-x-0.5"
          />
        </NavLink>
      </div>

      {/* =====================================================
          HERO CARD
      ====================================================== */}

      <section className="relative mb-7 overflow-hidden rounded-[28px] bg-gradient-to-br from-[#123f2a] via-[#17613c] to-[#22834d] p-7 text-white shadow-xl shadow-emerald-950/40 md:p-9 border border-emerald-800/30">
        {/* Background decorations */}

        <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-lime-300/10 blur-2xl" />

        <div className="absolute -bottom-32 right-24 h-72 w-72 rounded-full bg-emerald-300/10 blur-3xl" />

        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/10 to-transparent" />

        <div className="relative z-10 grid items-center gap-8 lg:grid-cols-[1fr_auto]">
          <div>
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 backdrop-blur">
                <FileText size={25} className="text-lime-200" />
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-lime-200">
                  AgriPulse AI
                </p>

                <p className="text-xs text-emerald-100/70">
                  Document controller assistant
                </p>
              </div>
            </div>

            <h2 className="max-w-2xl text-3xl font-black leading-tight md:text-4xl">
              Organize records.
              <br />
              Manage with confidence.
            </h2>

            <p className="mt-4 max-w-2xl text-sm leading-6 text-emerald-50/80 md:text-base">
              Monitor your files, verify document accuracy, discover suitable
              procedures, get resource guidance and use AI to make better
              administrative decisions.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <NavLink
                to="/dashboard/applications"
                className="
                  inline-flex items-center gap-2 rounded-xl
                  bg-lime-300 px-5 py-3
                  text-sm font-bold text-[#123524]
                  shadow-lg
                  transition
                  hover:-translate-y-0.5 hover:bg-lime-200
                "
              >
                <FileText size={18} />
                Manage Records
                <ArrowRight size={17} />
              </NavLink>

              <NavLink
                to="/dashboard/chat"
                className="
                  inline-flex items-center gap-2 rounded-xl
                  border border-white/15 bg-white/10
                  px-5 py-3
                  text-sm font-semibold text-white
                  backdrop-blur
                  transition
                  hover:bg-white/15
                "
              >
                <MessageSquare size={17} />
                Ask AI
              </NavLink>
            </div>
          </div>

          {/* Hero visual */}

          <div className="hidden lg:block">
            <div className="relative flex h-52 w-52 items-center justify-center">
              <div className="absolute inset-0 rounded-full border border-lime-200/10" />
              <div className="absolute inset-5 rounded-full border border-lime-200/10" />
              <div className="absolute inset-10 rounded-full border border-lime-200/10" />

              <div className="relative flex h-28 w-28 items-center justify-center rounded-[32px] bg-lime-300/15 shadow-2xl backdrop-blur">
                <Wheat size={58} className="text-lime-200" />
              </div>

              <div className="absolute right-1 top-8 flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
                <Leaf size={20} className="text-lime-200" />
              </div>

              <div className="absolute bottom-5 left-2 flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
                <Sprout size={20} className="text-emerald-100" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          STATISTICS
      ====================================================== */}

      <div className="mb-7 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.title}
              to={item.path}
              className="
                group relative overflow-hidden rounded-2xl
                border border-slate-800
                bg-[#111c38] p-5
                shadow-sm
                transition duration-200
                hover:-translate-y-1 hover:border-emerald-500/50 hover:shadow-lg
              "
            >
              <div
                className={`absolute right-0 top-0 h-20 w-20 rounded-bl-full ${item.bg}`}
              />

              <div className="relative flex items-start justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                    {item.title}
                  </p>

                  <h3 className="mt-2 text-3xl font-black text-white">
                    {item.value}
                  </h3>

                  <p className="mt-1 text-xs text-slate-400">
                    {item.description}
                  </p>
                </div>

                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-xl ${item.iconBg} ${item.iconColor}`}
                >
                  <Icon size={22} />
                </div>
              </div>

              <div className="relative mt-4 flex items-center gap-1 text-xs font-bold text-emerald-400 opacity-0 transition group-hover:opacity-100">
                Open
                <ArrowRight size={14} />
              </div>
            </NavLink>
          );
        })}
      </div>

      {/* =====================================================
          MAIN CONTENT
      ====================================================== */}

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.55fr_0.9fr]">
        {/* ===================================================
            QUICK ACTIONS
        ==================================================== */}

        <section className="rounded-[24px] border border-slate-800 bg-[#111c38] p-6 shadow-sm">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <Sparkles size={18} className="text-emerald-400" />

                <h2 className="text-xl font-black text-white">
                  AI Controller Tools
                </h2>
              </div>

              <p className="mt-1 text-sm text-slate-400">
                Start with one of your most useful document management tools.
              </p>
            </div>

            <div className="hidden rounded-full bg-emerald-500/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-emerald-400 sm:block border border-emerald-500/20">
              AI Powered
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {quickActions.map((action) => {
              const Icon = action.icon;

              return (
                <NavLink
                  key={action.title}
                  to={action.path}
                  className="
                    group relative overflow-hidden
                    rounded-2xl border border-slate-800
                    bg-[#0b132b]/50 p-5
                    transition duration-200
                    hover:-translate-y-1
                    hover:border-emerald-500/50
                    hover:bg-[#152347]
                    hover:shadow-lg
                  "
                >
                  <div
                    className={`absolute -right-8 -top-8 h-24 w-24 rounded-full ${action.light} opacity-70 transition group-hover:scale-125`}
                  />

                  <div className="relative">
                    <div className="flex items-start justify-between">
                      <div
                        className={`
                          flex h-12 w-12 items-center justify-center
                          rounded-xl bg-gradient-to-br ${action.gradient}
                          text-white shadow-lg
                        `}
                      >
                        <Icon size={23} />
                      </div>

                      <ArrowRight
                        size={18}
                        className="text-slate-600 transition group-hover:translate-x-1 group-hover:text-emerald-400"
                      />
                    </div>

                    <h3 className="mt-5 font-bold text-white">
                      {action.title}
                    </h3>

                    <p className="mt-1.5 text-sm leading-5 text-slate-400">
                      {action.description}
                    </p>

                    <div className="mt-4 text-xs font-bold text-emerald-400">
                      Open tool →
                    </div>
                  </div>
                </NavLink>
              );
            })}
          </div>
        </section>

        {/* ===================================================
            SYSTEM OVERVIEW
        ==================================================== */}

        <section className="rounded-[24px] border border-slate-800 bg-[#111c38] p-6 shadow-sm">
          <div className="mb-6">
            <div className="flex items-center gap-2">
              <Activity size={19} className="text-emerald-400" />

              <h2 className="text-xl font-black text-white">
                System Overview
              </h2>
            </div>

            <p className="mt-1 text-sm text-slate-400">
              Current AgriPulse AI services.
            </p>
          </div>

          <div className="space-y-3">
            {/* AI */}

            <div className="flex items-center justify-between rounded-2xl border border-emerald-900/40 bg-emerald-950/20 p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/20">
                  <Sparkles size={19} className="text-emerald-400" />
                </div>

                <div>
                  <p className="text-sm font-bold text-slate-200">
                    AI Services
                  </p>

                  <p className="text-xs text-slate-400">
                    Verification & recommendations
                  </p>
                </div>
              </div>

              <span className="rounded-full bg-emerald-500/20 px-2.5 py-1 text-[10px] font-bold text-emerald-400 border border-emerald-500/30">
                Active
              </span>
            </div>

            {/* Weather */}

            <div className="flex items-center justify-between rounded-2xl border border-sky-900/40 bg-sky-950/20 p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-500/20">
                  <CloudSun size={19} className="text-sky-400" />
                </div>

                <div>
                  <p className="text-sm font-bold text-slate-200">
                    Weather Service
                  </p>

                  <p className="text-xs text-slate-400">
                    Weather information
                  </p>
                </div>
              </div>

              <span className="rounded-full bg-sky-500/20 px-2.5 py-1 text-[10px] font-bold text-sky-400 border border-sky-500/30">
                Active
              </span>
            </div>

            {/* Analytics */}

            <div className="flex items-center justify-between rounded-2xl border border-violet-900/40 bg-violet-950/20 p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/20">
                  <TrendingUp size={19} className="text-violet-400" />
                </div>

                <div>
                  <p className="text-sm font-bold text-slate-200">
                    Analytics
                  </p>

                  <p className="text-xs text-slate-400">
                    Record performance
                  </p>
                </div>
              </div>

              <span className="rounded-full bg-violet-500/20 px-2.5 py-1 text-[10px] font-bold text-violet-400 border border-violet-500/30">
                Ready
              </span>
            </div>
          </div>

          <NavLink
            to="/dashboard/analytics"
            className="
              group mt-5 flex items-center justify-center gap-2
              rounded-xl border border-slate-800
              bg-[#0b132b] px-4 py-3
              text-sm font-bold text-slate-300
              transition
              hover:border-emerald-500/50 hover:bg-emerald-950/30 hover:text-emerald-400
            "
          >
            View Analytics
            <ArrowRight
              size={16}
              className="transition group-hover:translate-x-1"
            />
          </NavLink>
        </section>
      </div>

      {/* =====================================================
          INSIGHT SECTION
      ====================================================== */}

      <section className="relative mt-6 overflow-hidden rounded-[24px] border border-emerald-900/40 bg-gradient-to-r from-emerald-950/40 via-[#111c38] to-[#111c38] p-6 shadow-lg">
        <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-emerald-500/10 blur-xl" />

        <div className="relative flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-500/20 border border-emerald-500/30">
              <ShieldCheck size={23} className="text-emerald-400" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-black text-white">
                  Your intelligent document assistant
                </h3>

                <span className="hidden rounded-full bg-emerald-500/20 px-2 py-0.5 text-[9px] font-bold uppercase text-emerald-400 sm:inline border border-emerald-500/30">
                  AI
                </span>
              </div>

              <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-400">
                AgriPulse AI brings document verification, controller advice,
                resource guidance, weather tracking and record management
                together in one place.
              </p>
            </div>
          </div>

          <NavLink
            to="/dashboard/chat"
            className="
              inline-flex shrink-0 items-center justify-center gap-2
              rounded-xl bg-emerald-600
              px-5 py-3
              text-sm font-bold text-white
              shadow-lg shadow-emerald-900/30
              transition
              hover:-translate-y-0.5 hover:bg-emerald-500
            "
          >
            <MessageSquare size={17} />
            Talk to AI
          </NavLink>
        </div>
      </section>

      {/* =====================================================
          FOOTER
      ====================================================== */}

      <div className="mt-5 flex flex-col items-center justify-center gap-2 text-center sm:flex-row">
        <div className="flex items-center gap-1.5 text-xs text-slate-500">
          <MapPin size={13} />
          Document Control Platform
        </div>

        <span className="hidden text-slate-700 sm:block">•</span>

        <div className="flex items-center gap-1.5 text-xs text-slate-500">
          <Wheat size={13} />
          AgriPulse AI
        </div>
      </div>
    </div>
  );
};

export default Dashboard;