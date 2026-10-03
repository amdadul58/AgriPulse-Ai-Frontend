import { useState } from "react";
import {
  Menu,
  Search,
  Bell,
  ChevronDown,
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const TopNavbar = ({ sidebarOpen, setSidebarOpen }) => {
  const [showProfile, setShowProfile] = useState(false);

  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="h-16 !bg-[#0a1f13] border-b border-emerald-900/50 flex items-center justify-between px-6 sticky top-0 z-40 text-slate-100">

      {/* Left Side */}
      <div className="flex items-center gap-4">

        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 hover:bg-emerald-900/40 rounded-lg text-slate-300 transition"
        >
          <Menu size={22} />
        </button>

        {/* Search Bar */}
        <div className="hidden md:flex items-center !bg-[#05140d] border border-emerald-900/40 rounded-xl px-3 py-2 w-72">
          <Search size={18} className="text-emerald-500/70" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none ml-2 w-full text-sm text-slate-100 placeholder-slate-500"
          />
        </div>

      </div>

      {/* Right Side */}
      <div className="flex items-center gap-4">

        <button className="relative p-2 hover:bg-emerald-900/40 rounded-lg text-slate-300 transition">
          <Bell size={22} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        <div className="relative">

          <button
            onClick={() => setShowProfile(!showProfile)}
            className="flex items-center gap-2 p-2 hover:bg-emerald-900/40 rounded-xl transition"
          >
            <div className="w-9 h-9 bg-emerald-600 text-white rounded-full flex items-center justify-center font-semibold">
              {user?.full_name?.charAt(0) || "U"}
            </div>

            <div className="hidden md:block text-left">
              <p className="text-sm font-medium text-slate-100">
                {user?.full_name || "User"}
              </p>
              <p className="text-xs text-slate-400">
                {user?.email || "user@email.com"}
              </p>
            </div>

            <ChevronDown size={18} className="text-slate-400" />
          </button>

          {showProfile && (
            <div className="absolute right-0 mt-2 w-56 !bg-[#0a1f13] border border-emerald-900/50 rounded-xl shadow-xl p-3 text-slate-100 z-50">
              <p className="font-semibold text-white">
                {user?.full_name || "User"}
              </p>
              <p className="text-sm text-slate-400 mb-3">
                {user?.email || "user@email.com"}
              </p>

              <button
                onClick={handleLogout}
                className="w-full text-left px-3 py-2 rounded-lg text-red-400 hover:bg-red-950/50 transition"
              >
                Logout
              </button>
            </div>
          )}

        </div>

      </div>

    </header>
  );
};

export default TopNavbar;