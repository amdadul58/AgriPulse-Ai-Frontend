import { useEffect, useState } from "react";
import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000";

const Analytics = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");

      if (!token) {
        setError("Authentication token not found. Please login again.");
        return;
      }

      const response = await axios.get(
        `${API_BASE_URL}/api/v1/analytics/summary`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      if (response.data?.success) {
        setAnalytics(response.data.data);
      } else {
        setError("Failed to load analytics data.");
      }
    } catch (err) {
      console.error("Analytics Error:", err);

      if (err.response?.status === 401) {
        setError("Authentication failed. Please login again.");
      } else if (err.response?.status === 403) {
        setError("You are not authorized to view Analytics.");
      } else {
        setError(
          err.response?.data?.detail ||
            err.response?.data?.message ||
            "Failed to load analytics data."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const StatCard = ({ icon, title, value, description }) => {
    return (
      <div className="rounded-2xl bg-[#111c38] border border-slate-800 p-6 shadow-lg transition hover:border-slate-700">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-slate-400 uppercase tracking-wide">{title}</p>

            <h3 className="mt-2 text-3xl font-bold text-white">
              {value}
            </h3>

            {description && (
              <p className="mt-2 text-xs text-slate-500">{description}</p>
            )}
          </div>

          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-950/60 border border-emerald-900/50 text-3xl text-emerald-400">
            {icon}
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-48px)] bg-[#0b132b] text-slate-100 p-4 md:p-6 overflow-y-auto">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-2xl bg-[#111c38] border border-slate-800 p-10 text-center shadow-lg">
            <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-emerald-950 border-t-emerald-500"></div>

            <p className="text-slate-400">
              Loading analytics...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[calc(100vh-48px)] bg-[#0b132b] text-slate-100 p-4 md:p-6 overflow-y-auto">
        <div className="mx-auto max-w-7xl">
          <div className="mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-white">
              📊 Analytics
            </h1>

            <p className="mt-1 text-sm text-slate-400">
              Monitor your agricultural data and farm performance.
            </p>
          </div>

          <div className="rounded-2xl border border-red-900/50 bg-red-950/40 p-6 text-red-300">
            <p className="font-medium">
              ⚠️ {error}
            </p>

            <button
              onClick={fetchAnalytics}
              className="mt-4 rounded-xl bg-red-900/60 border border-red-800 px-5 py-2.5 font-semibold text-white transition hover:bg-red-900"
            >
              🔄 Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!analytics) {
    return null;
  }

  const soilDistribution = analytics.soil_distribution || {};
  const cropDistribution = analytics.crop_distribution || [];

  const totalHealth =
    analytics.healthy_crops +
    analytics.warning_crops +
    analytics.diseased_crops;

  const getPercentage = (value) => {
    if (!totalHealth) {
      return 0;
    }

    return Math.round((value / totalHealth) * 100);
  };

  return (
    <div className="min-h-[calc(100vh-48px)] bg-[#0b132b] text-slate-100 p-4 md:p-6 overflow-y-auto">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white">
              📊 Analytics
            </h1>

            <p className="mt-1 text-sm text-slate-400">
              Monitor your agricultural data and farm performance.
            </p>
          </div>

          <button
            onClick={fetchAnalytics}
            disabled={loading}
            className="rounded-xl bg-emerald-600 px-5 py-3 font-semibold text-white transition hover:bg-emerald-500 disabled:opacity-60 shadow-lg shadow-emerald-950/20"
          >
            🔄 Refresh
          </button>
        </div>

        {/* Main Statistics */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">

          <StatCard
            icon="🌾"
            title="Total Farms"
            value={analytics.total_farms}
            description="Your registered farms"
          />

          <StatCard
            icon="🌱"
            title="Total Crops"
            value={analytics.total_crops}
            description="Crops across your farms"
          />

          <StatCard
            icon="🩺"
            title="Total Diseases"
            value={analytics.total_diseases}
            description="Diseases in knowledge base"
          />

          <StatCard
            icon="✅"
            title="Healthy Crops"
            value={analytics.healthy_crops}
            description="Currently healthy"
          />

        </div>

        {/* Health Statistics */}
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">

          {/* Crop Health */}
          <div className="rounded-2xl bg-[#111c38] border border-slate-800 p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-white">
                  🌱 Crop Health
                </h2>

                <p className="mt-0.5 text-xs text-slate-400">
                  Current health status of your crops
                </p>
              </div>

              <span className="rounded-full bg-emerald-950/60 border border-emerald-900/50 px-3 py-1 text-xs font-semibold text-emerald-400">
                {totalHealth} total
              </span>
            </div>

            <div className="mt-6 space-y-5">

              {/* Healthy */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <span className="font-medium text-slate-300 text-sm">
                    ✅ Healthy
                  </span>

                  <span className="text-xs text-slate-400">
                    {analytics.healthy_crops} (
                    {getPercentage(analytics.healthy_crops)}%)
                  </span>
                </div>

                <div className="h-3 overflow-hidden rounded-full bg-slate-900 border border-slate-800">
                  <div
                    className="h-full rounded-full bg-emerald-500 transition-all"
                    style={{
                      width: `${getPercentage(
                        analytics.healthy_crops
                      )}%`,
                    }}
                  />
                </div>
              </div>

              {/* Warning */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <span className="font-medium text-slate-300 text-sm">
                    ⚠️ Warning
                  </span>

                  <span className="text-xs text-slate-400">
                    {analytics.warning_crops} (
                    {getPercentage(analytics.warning_crops)}%)
                  </span>
                </div>

                <div className="h-3 overflow-hidden rounded-full bg-slate-900 border border-slate-800">
                  <div
                    className="h-full rounded-full bg-amber-400 transition-all"
                    style={{
                      width: `${getPercentage(
                        analytics.warning_crops
                      )}%`,
                    }}
                  />
                </div>
              </div>

              {/* Diseased */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <span className="font-medium text-slate-300 text-sm">
                    🔴 Diseased
                  </span>

                  <span className="text-xs text-slate-400">
                    {analytics.diseased_crops} (
                    {getPercentage(analytics.diseased_crops)}%)
                  </span>
                </div>

                <div className="h-3 overflow-hidden rounded-full bg-slate-900 border border-slate-800">
                  <div
                    className="h-full rounded-full bg-red-500 transition-all"
                    style={{
                      width: `${getPercentage(
                        analytics.diseased_crops
                      )}%`,
                    }}
                  />
                </div>
              </div>

            </div>
          </div>

          {/* Soil Distribution */}
          <div className="rounded-2xl bg-[#111c38] border border-slate-800 p-6 shadow-lg">
            <h2 className="text-lg font-bold text-white">
              🪨 Soil Distribution
            </h2>

            <p className="mt-0.5 text-xs text-slate-400">
              Soil types across your farms
            </p>

            <div className="mt-6 space-y-5">

              {/* Clay */}
              <div>
                <div className="mb-2 flex justify-between">
                  <span className="font-medium capitalize text-slate-300 text-sm">
                    Clay
                  </span>

                  <span className="font-semibold text-slate-200 text-xs">
                    {soilDistribution.clay || 0}
                  </span>
                </div>

                <div className="h-3 overflow-hidden rounded-full bg-slate-900 border border-slate-800">
                  <div
                    className="h-full rounded-full bg-orange-500"
                    style={{
                      width: `${
                        analytics.total_farms
                          ? ((soilDistribution.clay || 0) /
                              analytics.total_farms) *
                            100
                          : 0
                      }%`,
                    }}
                  />
                </div>
              </div>

              {/* Loam */}
              <div>
                <div className="mb-2 flex justify-between">
                  <span className="font-medium capitalize text-slate-300 text-sm">
                    Loam
                  </span>

                  <span className="font-semibold text-slate-200 text-xs">
                    {soilDistribution.loam || 0}
                  </span>
                </div>

                <div className="h-3 overflow-hidden rounded-full bg-slate-900 border border-slate-800">
                  <div
                    className="h-full rounded-full bg-emerald-500"
                    style={{
                      width: `${
                        analytics.total_farms
                          ? ((soilDistribution.loam || 0) /
                              analytics.total_farms) *
                            100
                          : 0
                      }%`,
                    }}
                  />
                </div>
              </div>

              {/* Sandy */}
              <div>
                <div className="mb-2 flex justify-between">
                  <span className="font-medium capitalize text-slate-300 text-sm">
                    Sandy
                  </span>

                  <span className="font-semibold text-slate-200 text-xs">
                    {soilDistribution.sandy || 0}
                  </span>
                </div>

                <div className="h-3 overflow-hidden rounded-full bg-slate-900 border border-slate-800">
                  <div
                    className="h-full rounded-full bg-amber-500"
                    style={{
                      width: `${
                        analytics.total_farms
                          ? ((soilDistribution.sandy || 0) /
                              analytics.total_farms) *
                            100
                          : 0
                      }%`,
                    }}
                  />
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Crop Distribution */}
        <div className="mt-6 rounded-2xl bg-[#111c38] border border-slate-800 p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-white">
                🌾 Crop Distribution
              </h2>

              <p className="mt-0.5 text-xs text-slate-400">
                Crops registered across your farms
              </p>
            </div>

            <span className="rounded-full bg-emerald-950/60 border border-emerald-900/50 px-3 py-1 text-xs font-semibold text-emerald-400">
              {cropDistribution.length} crop type
              {cropDistribution.length !== 1 ? "s" : ""}
            </span>
          </div>

          {cropDistribution.length === 0 ? (
            <div className="mt-6 rounded-xl bg-slate-900/60 border border-slate-800 p-6 text-center text-slate-400 text-sm">
              No crop distribution data available.
            </div>
          ) : (
            <div className="mt-6 space-y-4">

              {cropDistribution.map((item, index) => {

                const maxCount = Math.max(
                  ...cropDistribution.map(
                    (crop) => crop.count
                  )
                );

                const percentage = maxCount
                  ? (item.count / maxCount) * 100
                  : 0;

                return (
                  <div key={`${item.crop}-${index}`}>

                    <div className="mb-2 flex items-center justify-between">
                      <span className="font-medium text-slate-300 text-sm">
                        🌱 {item.crop}
                      </span>

                      <span className="text-xs font-semibold text-slate-200">
                        {item.count}
                      </span>
                    </div>

                    <div className="h-3 overflow-hidden rounded-full bg-slate-900 border border-slate-800">
                      <div
                        className="h-full rounded-full bg-emerald-500 transition-all"
                        style={{
                          width: `${percentage}%`,
                        }}
                      />
                    </div>

                  </div>
                );
              })}

            </div>
          )}
        </div>

        {/* Summary */}
        <div className="mt-6 rounded-2xl border border-emerald-900/50 bg-emerald-950/30 p-6 shadow-lg">
          <h2 className="text-base font-bold text-emerald-400">
            📈 Agriculture Summary
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-300">
            You currently have{" "}
            <strong className="text-white">{analytics.total_farms}</strong>{" "}
            registered farm
            {analytics.total_farms !== 1 ? "s" : ""} and{" "}
            <strong className="text-white">{analytics.total_crops}</strong>{" "}
            registered crop
            {analytics.total_crops !== 1 ? "s" : ""}.
            {" "}
            {analytics.healthy_crops > 0
              ? `${analytics.healthy_crops} crop${
                  analytics.healthy_crops !== 1 ? "s are" : " is"
                } currently healthy.`
              : "No healthy crops are currently recorded."}
          </p>
        </div>

      </div>
    </div>
  );
};

export default Analytics;