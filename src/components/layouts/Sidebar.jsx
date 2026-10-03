import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import {
  LayoutDashboard,
  Sprout,
  MessageSquare,
  Stethoscope,
  Leaf,
  Droplets,
  CloudSun,
  Search,
  Database,
  BarChart3,
  Bell,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Tractor,
  ScanSearch,
  Wheat,
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";

const translations = {
  English: {
    dashboard: "Dashboard",
    farms: "My Farms",
    chat: "AI Chat",
    disease: "Disease Detection",
    visionDisease: "Vision Disease Detection",
    cropRecommendation: "Crop Recommendation",
    fertilizerRecommendation: "Fertilizer Recommendation",
    weather: "Weather",
    ragSearch: "RAG Search",
    vectorSearch: "Vector Search",
    analytics: "Analytics",
    notifications: "Notifications",
    settings: "Settings",
    logout: "Logout",
  },

  Bangla: {
    dashboard: "ড্যাশবোর্ড",
    farms: "আমার খামার",
    chat: "এআই চ্যাট",
    disease: "রোগ শনাক্তকরণ",
    visionDisease: "ছবির মাধ্যমে রোগ শনাক্তকরণ",
    cropRecommendation: "ফসল সুপারিশ",
    fertilizerRecommendation: "সার সুপারিশ",
    weather: "আবহাওয়া",
    ragSearch: "RAG অনুসন্ধান",
    vectorSearch: "ভেক্টর অনুসন্ধান",
    analytics: "বিশ্লেষণ",
    notifications: "নোটিফিকেশন",
    settings: "সেটিংস",
    logout: "লগআউট",
  },
};

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const { logout } = useAuth();

  const [language, setLanguage] = useState(() => {
    return localStorage.getItem("language") || "English";
  });

  useEffect(() => {
    const handleLanguageChange = () => {
      setLanguage(localStorage.getItem("language") || "English");
    };

    window.addEventListener("languageChanged", handleLanguageChange);
    window.addEventListener("storage", handleLanguageChange);

    return () => {
      window.removeEventListener(
        "languageChanged",
        handleLanguageChange
      );

      window.removeEventListener(
        "storage",
        handleLanguageChange
      );
    };
  }, []);

  const t = translations[language] || translations.English;

  const menuGroups = [
    {
      title: language === "Bangla" ? "প্রধান" : "MAIN",
      items: [
        {
          icon: LayoutDashboard,
          label: t.dashboard,
          path: "/dashboard",
        },
        {
          icon: Sprout,
          label: t.farms,
          path: "/dashboard/farms",
        },
        {
          icon: MessageSquare,
          label: t.chat,
          path: "/dashboard/chat",
        },
      ],
    },

    {
      title: language === "Bangla" ? "এআই কৃষি টুলস" : "AI AGRICULTURE",
      items: [
        {
          icon: Stethoscope,
          label: t.disease,
          path: "/dashboard/disease",
        },
        {
          icon: ScanSearch,
          label: t.visionDisease,
          path: "/dashboard/vision-disease",
        },
        {
          icon: Leaf,
          label: t.cropRecommendation,
          path: "/dashboard/crop-recommend",
        },
        {
          icon: Droplets,
          label: t.fertilizerRecommendation,
          path: "/dashboard/fertilizer",
        },
        {
          icon: CloudSun,
          label: t.weather,
          path: "/dashboard/weather",
        },
      ],
    },

    {
      title: language === "Bangla" ? "এআই ইঞ্জিন" : "AI ENGINE",
      items: [
        {
          icon: Search,
          label: t.ragSearch,
          path: "/dashboard/rag",
        },
        {
          icon: Database,
          label: t.vectorSearch,
          path: "/dashboard/vector",
        },
        {
          icon: BarChart3,
          label: t.analytics,
          path: "/dashboard/analytics",
        },
      ],
    },

    {
      title: language === "Bangla" ? "সিস্টেম" : "SYSTEM",
      items: [
        {
          icon: Bell,
          label: t.notifications,
          path: "/dashboard/notifications",
        },
        {
          icon: Settings,
          label: t.settings,
          path: "/dashboard/settings",
        },
      ],
    },
  ];

  return (
    <aside
      className={`
        fixed left-0 top-0 z-50 flex h-screen flex-col
        overflow-hidden
        border-r border-emerald-950/10
        bg-[#123524]
        text-white
        shadow-[8px_0_35px_rgba(18,53,36,0.12)]
        transition-all duration-300
        ${sidebarOpen ? "w-[270px]" : "w-[82px]"}
      `}
    >
      {/* =====================================================
          DECORATIVE BACKGROUND
      ====================================================== */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-emerald-400/10 blur-3xl" />

        <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-lime-300/10 blur-3xl" />

        <div className="absolute bottom-0 left-0 h-32 w-full bg-gradient-to-t from-black/10 to-transparent" />
      </div>

      {/* =====================================================
          BRAND HEADER
      ====================================================== */}

      <div className="relative flex h-[82px] shrink-0 items-center justify-between border-b border-white/10 px-4">
        <div className="flex min-w-0 items-center gap-3">
          <div
            className="
              flex h-12 w-12 shrink-0 items-center justify-center
              rounded-2xl
              bg-gradient-to-br from-lime-300 via-emerald-400 to-green-500
              shadow-lg shadow-emerald-950/30
            "
          >
            <Sprout
              size={27}
              strokeWidth={2.4}
              className="text-[#123524]"
            />
          </div>

          {sidebarOpen && (
            <div className="min-w-0">
              <h1 className="truncate text-lg font-black tracking-tight">
                AgriPulse AI
              </h1>

              <p className="truncate text-[10px] font-semibold uppercase tracking-[0.16em] text-lime-200/70">
                Smart Agriculture
              </p>
            </div>
          )}
        </div>

        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="
            absolute -right-3 top-7
            flex h-7 w-7 items-center justify-center
            rounded-full border border-emerald-100
            bg-white text-emerald-800
            shadow-md
            transition
            hover:scale-105 hover:bg-lime-50
          "
          aria-label={
            sidebarOpen ? "Collapse sidebar" : "Expand sidebar"
          }
        >
          {sidebarOpen ? (
            <ChevronLeft size={16} />
          ) : (
            <ChevronRight size={16} />
          )}
        </button>
      </div>

      {/* =====================================================
          FARM STATUS
      ====================================================== */}

      {sidebarOpen && (
        <div className="relative mx-3 mt-4 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06] p-3">
          <div className="absolute -right-5 -top-5 h-16 w-16 rounded-full bg-lime-300/10" />

          <div className="relative flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-lime-300/10">
              <Tractor size={20} className="text-lime-300" />
            </div>

            <div className="min-w-0">
              <p className="text-xs font-bold text-white">
                Farm Assistant
              </p>

              <div className="mt-1 flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-lime-300" />

                <span className="text-[10px] text-emerald-100/60">
                  AI services active
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================
          NAVIGATION
      ====================================================== */}

      <nav className="relative flex-1 overflow-y-auto px-3 py-4 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10">
        {menuGroups.map((group) => (
          <div key={group.title} className="mb-5">
            {sidebarOpen && (
              <div className="mb-2 px-3 text-[9px] font-extrabold uppercase tracking-[0.2em] text-emerald-100/40">
                {group.title}
              </div>
            )}

            <div className="space-y-1">
              {group.items.map((item) => {
                const Icon = item.icon;

                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) => `
                      group relative flex items-center gap-3
                      rounded-xl px-3 py-2.5
                      transition-all duration-200
                      ${
                        isActive
                          ? "bg-gradient-to-r from-lime-300 to-emerald-400 text-[#123524] shadow-lg shadow-black/10"
                          : "text-emerald-50/70 hover:bg-white/[0.07] hover:text-white"
                      }
                      ${!sidebarOpen ? "justify-center" : ""}
                    `}
                  >
                    {({ isActive }) => (
                      <>
                        {isActive && (
                          <span className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full bg-white/80" />
                        )}

                        <span
                          className={`
                            flex h-9 w-9 shrink-0 items-center justify-center rounded-lg
                            transition
                            ${
                              isActive
                                ? "bg-white/20"
                                : "bg-white/[0.04] group-hover:bg-white/[0.08]"
                            }
                          `}
                        >
                          <Icon size={19} strokeWidth={2.2} />
                        </span>

                        {sidebarOpen && (
                          <span className="min-w-0 flex-1 truncate text-[13px] font-semibold">
                            {item.label}
                          </span>
                        )}

                        {sidebarOpen && isActive && (
                          <span className="h-1.5 w-1.5 rounded-full bg-[#123524]" />
                        )}
                      </>
                    )}
                  </NavLink>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* =====================================================
          LOGOUT
      ====================================================== */}

      <div className="relative shrink-0 border-t border-white/10 p-3">
        <button
          onClick={logout}
          className={`
            group flex w-full items-center gap-3 rounded-xl
            px-3 py-2.5
            text-red-200/80
            transition
            hover:bg-red-500/10 hover:text-red-200
            ${!sidebarOpen ? "justify-center" : ""}
          `}
        >
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-red-400/5 group-hover:bg-red-400/10">
            <LogOut size={19} />
          </span>

          {sidebarOpen && (
            <span className="text-[13px] font-semibold">
              {t.logout}
            </span>
          )}
        </button>

        {sidebarOpen && (
          <div className="mt-2 flex items-center justify-center gap-1">
            <Wheat size={11} className="text-lime-300/40" />

            <p className="text-[9px] text-emerald-100/30">
              AgriPulse AI
            </p>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;