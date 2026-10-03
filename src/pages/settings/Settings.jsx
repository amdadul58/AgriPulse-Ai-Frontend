import { useEffect, useState } from "react";

const translations = {
  English: {
    settings: "⚙️ Settings",
    subtitle:
      "Manage your AgriPulse AI account and application preferences.",

    profile: "👤 Profile Information",
    profileSubtitle: "Your account information.",
    fullName: "Full Name",
    email: "Email Address",
    profileInfo:
      "ℹ️ Profile editing will be available when the profile update API is added to the backend.",

    notifications: "🔔 Notification Preferences",
    notificationsSubtitle:
      "Choose which agricultural alerts you want to receive.",

    diseaseAlerts: "🩺 Disease Alerts",
    diseaseAlertsText:
      "Receive alerts when crop diseases are detected.",

    weatherAlerts: "🌦️ Weather Alerts",
    weatherAlertsText:
      "Receive important weather-related alerts.",

    farmAlerts: "🌾 Farm Alerts",
    farmAlertsText:
      "Receive updates related to your farms and crops.",

    savePreferences: "💾 Save Preferences",
    saved: "✅ Preferences saved successfully.",

    general: "🌐 General Preferences",
    generalSubtitle: "Customize your application preferences.",
    language: "Language",

    security: "🔐 Security",
    securitySubtitle: "Manage your account security.",
    changePassword: "🔑 Change Password",
    passwordInfo:
      "Password change will be available after the backend password update endpoint is added.",

    account: "🚪 Account",
    accountSubtitle: "Sign out from your AgriPulse AI account.",
    logout: "🚪 Logout",
  },

  Bangla: {
    settings: "⚙️ সেটিংস",
    subtitle:
      "আপনার AgriPulse AI অ্যাকাউন্ট এবং অ্যাপ্লিকেশনের পছন্দসমূহ পরিচালনা করুন।",

    profile: "👤 প্রোফাইল তথ্য",
    profileSubtitle: "আপনার অ্যাকাউন্টের তথ্য।",
    fullName: "পূর্ণ নাম",
    email: "ইমেইল ঠিকানা",
    profileInfo:
      "ℹ️ Backend-এ profile update API যোগ করার পর প্রোফাইল পরিবর্তন করা যাবে।",

    notifications: "🔔 নোটিফিকেশন পছন্দসমূহ",
    notificationsSubtitle:
      "আপনি কোন কৃষি সংক্রান্ত সতর্কতা পেতে চান তা নির্বাচন করুন।",

    diseaseAlerts: "🩺 রোগের সতর্কতা",
    diseaseAlertsText:
      "ফসলের রোগ শনাক্ত হলে সতর্কতা গ্রহণ করুন।",

    weatherAlerts: "🌦️ আবহাওয়ার সতর্কতা",
    weatherAlertsText:
      "গুরুত্বপূর্ণ আবহাওয়া সংক্রান্ত সতর্কতা গ্রহণ করুন।",

    farmAlerts: "🌾 খামারের সতর্কতা",
    farmAlertsText:
      "আপনার খামার ও ফসল সম্পর্কিত আপডেট গ্রহণ করুন।",

    savePreferences: "💾 পছন্দসমূহ সংরক্ষণ করুন",
    saved: "✅ পছন্দসমূহ সফলভাবে সংরক্ষণ করা হয়েছে।",

    general: "🌐 সাধারণ পছন্দসমূহ",
    generalSubtitle:
      "আপনার অ্যাপ্লিকেশনের সাধারণ পছন্দসমূহ পরিবর্তন করুন।",
    language: "ভাষা",

    security: "🔐 নিরাপত্তা",
    securitySubtitle:
      "আপনার অ্যাকাউন্টের নিরাপত্তা পরিচালনা করুন।",
    changePassword: "🔑 পাসওয়ার্ড পরিবর্তন করুন",
    passwordInfo:
      "Backend-এ password update API যোগ করার পর পাসওয়ার্ড পরিবর্তন করা যাবে।",

    account: "🚪 অ্যাকাউন্ট",
    accountSubtitle:
      "আপনার AgriPulse AI অ্যাকাউন্ট থেকে সাইন আউট করুন।",
    logout: "🚪 লগআউট",
  },
};

const Settings = () => {
  const [user, setUser] = useState(null);

  const [preferences, setPreferences] = useState({
    diseaseAlerts: true,
    weatherAlerts: true,
    farmAlerts: true,
    language: "English",
  });

  const [saved, setSaved] = useState(false);

  // =========================
  // Translation
  // =========================
  const t = translations[preferences.language];

  // =========================
  // Load User + Preferences
  // =========================
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");

      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Failed to load user:", error);
    }

    try {
      const storedPreferences = localStorage.getItem(
        "notification_preferences"
      );

      if (storedPreferences) {
        const parsed = JSON.parse(storedPreferences);

        setPreferences({
          diseaseAlerts:
            parsed.diseaseAlerts ?? true,
          weatherAlerts:
            parsed.weatherAlerts ?? true,
          farmAlerts:
            parsed.farmAlerts ?? true,
          language:
            parsed.language || "English",
        });
      }
    } catch (error) {
      console.error("Failed to load preferences:", error);
    }
  }, []);

  // =========================
  // Handle Toggle
  // =========================
  const handlePreferenceChange = (key) => {
    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));

    setSaved(false);
  };

  // =========================
  // Language Change
  // =========================
  const handleLanguageChange = (event) => {
    setPreferences((prev) => ({
      ...prev,
      language: event.target.value,
    }));

    setSaved(false);
  };

  // =========================
  // Save Preferences
  // =========================
  const handleSavePreferences = () => {
    localStorage.setItem(
      "notification_preferences",
      JSON.stringify(preferences)
    );

    // Save selected language separately
    localStorage.setItem(
      "language",
      preferences.language
    );

    // Immediately notify Sidebar and other components
    window.dispatchEvent(
      new Event("languageChanged")
    );

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2500);
  };

  // =========================
  // Logout
  // =========================
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.href = "/login";
  };

  return (
    <div className="min-h-[calc(100vh-48px)] bg-[#0b132b] text-slate-100 p-6 overflow-y-auto">
      <div className="max-w-5xl mx-auto">

        {/* =========================
            Header
        ========================= */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-1 text-white">
            {t.settings}
          </h1>

          <p className="text-slate-400">
            {t.subtitle}
          </p>
        </div>

        {/* =========================
            Profile
        ========================= */}
        <div className="bg-[#111c38] border border-slate-800 rounded-2xl shadow-lg p-6 mb-6">

          <div className="mb-5">
            <h2 className="text-xl font-semibold text-white">
              {t.profile}
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              {t.profileSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

            <div>
              <label className="block mb-2 font-medium text-slate-300 text-sm">
                {t.fullName}
              </label>

              <input
                type="text"
                value={user?.full_name || ""}
                readOnly
                className="w-full bg-[#0b132b] border border-slate-800 rounded-xl p-3 text-slate-400 placeholder-slate-600 outline-none cursor-not-allowed"
                placeholder={t.fullName}
              />
            </div>

            <div>
              <label className="block mb-2 font-medium text-slate-300 text-sm">
                {t.email}
              </label>

              <input
                type="email"
                value={user?.email || ""}
                readOnly
                className="w-full bg-[#0b132b] border border-slate-800 rounded-xl p-3 text-slate-400 placeholder-slate-600 outline-none cursor-not-allowed"
                placeholder={t.email}
              />
            </div>

          </div>

          <div className="mt-4 rounded-xl bg-blue-950/40 border border-blue-900/50 p-4 text-sm text-blue-400">
            {t.profileInfo}
          </div>

        </div>

        {/* =========================
            Notification Preferences
        ========================= */}
        <div className="bg-[#111c38] border border-slate-800 rounded-2xl shadow-lg p-6 mb-6">

          <div className="mb-5">
            <h2 className="text-xl font-semibold text-white">
              {t.notifications}
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              {t.notificationsSubtitle}
            </p>
          </div>

          <div className="space-y-4">

            {/* Disease */}
            <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-[#0b132b] p-4">

              <div>
                <h3 className="font-medium text-slate-200">
                  {t.diseaseAlerts}
                </h3>

                <p className="mt-1 text-sm text-slate-400">
                  {t.diseaseAlertsText}
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  handlePreferenceChange("diseaseAlerts")
                }
                className={`relative h-6 w-11 rounded-full transition ${
                  preferences.diseaseAlerts
                    ? "bg-emerald-600"
                    : "bg-slate-700"
                }`}
              >
                <span
                  className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${
                    preferences.diseaseAlerts
                      ? "left-6"
                      : "left-1"
                  }`}
                />
              </button>

            </div>

            {/* Weather */}
            <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-[#0b132b] p-4">

              <div>
                <h3 className="font-medium text-slate-200">
                  {t.weatherAlerts}
                </h3>

                <p className="mt-1 text-sm text-slate-400">
                  {t.weatherAlertsText}
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  handlePreferenceChange("weatherAlerts")
                }
                className={`relative h-6 w-11 rounded-full transition ${
                  preferences.weatherAlerts
                    ? "bg-emerald-600"
                    : "bg-slate-700"
                }`}
              >
                <span
                  className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${
                    preferences.weatherAlerts
                      ? "left-6"
                      : "left-1"
                  }`}
                />
              </button>

            </div>

            {/* Farm */}
            <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-[#0b132b] p-4">

              <div>
                <h3 className="font-medium text-slate-200">
                  {t.farmAlerts}
                </h3>

                <p className="mt-1 text-sm text-slate-400">
                  {t.farmAlertsText}
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  handlePreferenceChange("farmAlerts")
                }
                className={`relative h-6 w-11 rounded-full transition ${
                  preferences.farmAlerts
                    ? "bg-emerald-600"
                    : "bg-slate-700"
                }`}
              >
                <span
                  className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${
                    preferences.farmAlerts
                      ? "left-6"
                      : "left-1"
                  }`}
                />
              </button>

            </div>

          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">

            <button
              onClick={handleSavePreferences}
              className="bg-emerald-600 text-white px-5 py-2.5 rounded-xl hover:bg-emerald-500 transition shadow-lg shadow-emerald-950/20 font-medium"
            >
              {t.savePreferences}
            </button>

            {saved && (
              <span className="text-sm font-medium text-emerald-400">
                {t.saved}
              </span>
            )}

          </div>

        </div>

        {/* =========================
            General Preferences
        ========================= */}
        <div className="bg-[#111c38] border border-slate-800 rounded-2xl shadow-lg p-6 mb-6">

          <div className="mb-5">
            <h2 className="text-xl font-semibold text-white">
              {t.general}
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              {t.generalSubtitle}
            </p>
          </div>

          <div className="max-w-md">

            <label className="block mb-2 font-medium text-slate-300 text-sm">
              {t.language}
            </label>

            <select
              value={preferences.language}
              onChange={handleLanguageChange}
              className="w-full bg-[#0b132b] border border-slate-800 rounded-xl p-3 text-slate-200 outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/10 transition"
            >
              <option value="English" className="bg-[#0b132b] text-slate-200">
                English
              </option>

              <option value="Bangla" className="bg-[#0b132b] text-slate-200">
                বাংলা
              </option>
            </select>

          </div>

          <div className="mt-4">
            <button
              onClick={handleSavePreferences}
              className="bg-emerald-600 text-white px-5 py-2.5 rounded-xl hover:bg-emerald-500 transition shadow-lg shadow-emerald-950/20 font-medium"
            >
              {t.savePreferences}
            </button>
          </div>

        </div>

        {/* =========================
            Security
        ========================= */}
        <div className="bg-[#111c38] border border-slate-800 rounded-2xl shadow-lg p-6 mb-6">

          <div className="mb-5">
            <h2 className="text-xl font-semibold text-white">
              {t.security}
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              {t.securitySubtitle}
            </p>
          </div>

          <button
            type="button"
            disabled
            className="cursor-not-allowed bg-slate-800 border border-slate-700 px-5 py-2.5 rounded-xl text-slate-500 font-medium"
          >
            {t.changePassword}
          </button>

          <p className="mt-3 text-sm text-slate-400">
            {t.passwordInfo}
          </p>

        </div>

        {/* =========================
            Account
        ========================= */}
        <div className="bg-[#111c38] border border-red-950/60 rounded-2xl shadow-lg p-6">

          <h2 className="text-xl font-semibold text-white">
            {t.account}
          </h2>

          <p className="mt-1 text-sm text-slate-400">
            {t.accountSubtitle}
          </p>

          <button
            onClick={handleLogout}
            className="mt-5 bg-red-600 text-white px-5 py-2.5 rounded-xl hover:bg-red-500 transition shadow-lg shadow-red-950/20 font-medium"
          >
            {t.logout}
          </button>

        </div>

      </div>
    </div>
  );
};

export default Settings;