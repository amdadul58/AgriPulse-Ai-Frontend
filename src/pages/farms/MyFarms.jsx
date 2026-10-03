import { useEffect, useState } from "react";
import axios from "../../api/axios";

const MyFarms = () => {
  const [farms, setFarms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    location: "",
    soil_type: "loam",
    area_hectares: "",
  });

  // ============================================================
  // Load Farms
  // ============================================================

  const loadFarms = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await axios.get("/api/v1/farms/");

      console.log("Farms API Response:", response.data);

      if (Array.isArray(response.data)) {
        setFarms(response.data);
      } else {
        setFarms([]);
        setError("Invalid farm data received from server.");
      }
    } catch (err) {
      console.error("Failed to load farms:", err);

      setError(
        err.response?.data?.detail ||
          err.response?.data?.message ||
          "Failed to load farms."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFarms();
  }, []);

  // ============================================================
  // Handle Input
  // ============================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // ============================================================
  // Create Farm
  // ============================================================

  const handleCreateFarm = async (e) => {
    e.preventDefault();

    setError("");

    if (!formData.name.trim()) {
      setError("Farm name is required.");
      return;
    }

    if (!formData.location.trim()) {
      setError("Location is required.");
      return;
    }

    if (!formData.area_hectares || Number(formData.area_hectares) <= 0) {
      setError("Area must be greater than 0.");
      return;
    }

    try {
      setCreating(true);

      const payload = {
        name: formData.name.trim(),
        location: formData.location.trim(),
        soil_type: formData.soil_type,
        area_hectares: Number(formData.area_hectares),
      };

      console.log("Creating Farm:", payload);

      const response = await axios.post("/api/v1/farms/", payload);

      console.log("Create Farm Response:", response.data);

      setFarms((previous) => [...previous, response.data]);

      setFormData({
        name: "",
        location: "",
        soil_type: "loam",
        area_hectares: "",
      });
    } catch (err) {
      console.error("Create farm error:", err);

      setError(
        err.response?.data?.detail ||
          err.response?.data?.message ||
          "Failed to create farm."
      );
    } finally {
      setCreating(false);
    }
  };

  // ============================================================
  // UI
  // ============================================================

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-6 md:p-8">

      {/* ======================================================
          Page Header
      ====================================================== */}

      <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

        <div>
          <div className="mb-2 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-2xl shadow-sm">
              🌱
            </div>

            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-emerald-400">
                Farm Management
              </p>

              <h1 className="text-3xl font-bold tracking-tight text-white">
                My Farms
              </h1>
            </div>
          </div>

          <p className="max-w-2xl text-sm leading-6 text-slate-400 md:ml-15">
            Manage your farms, soil information, locations and agricultural
            details from one place.
          </p>
        </div>

        {/* Farm Count */}
        <div className="flex w-fit items-center gap-3 rounded-2xl border border-slate-700/60 bg-slate-800/80 backdrop-blur-md px-5 py-3 shadow-sm">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-xl">
            🌾
          </div>

          <div>
            <p className="text-xs font-medium text-slate-400">
              Total Farms
            </p>

            <p className="text-xl font-bold text-white">
              {farms.length}
            </p>
          </div>
        </div>

      </div>

      {/* ======================================================
          Error
      ====================================================== */}

      {error && (
        <div className="mb-6 flex items-start gap-3 rounded-2xl border border-red-500/30 bg-red-500/10 p-4 shadow-sm backdrop-blur-md">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-red-500/20 text-red-400">
            ⚠️
          </div>

          <div>
            <p className="font-semibold text-red-400">
              Something went wrong
            </p>

            <p className="mt-1 text-sm text-red-300">
              {error}
            </p>
          </div>
        </div>
      )}

      {/* ======================================================
          Create Farm Section
      ====================================================== */}

      <div className="mb-10 overflow-hidden rounded-3xl border border-slate-700/60 bg-slate-800/80 backdrop-blur-md shadow-xl">

        {/* Section Header */}
        <div className="border-b border-slate-700/60 bg-gradient-to-r from-emerald-500/10 to-transparent px-6 py-5 md:px-8">

          <div className="flex items-center gap-4">

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-600 text-xl text-white shadow-sm">
              +
            </div>

            <div>
              <h2 className="text-xl font-bold text-white">
                Add New Farm
              </h2>

              <p className="mt-1 text-sm text-slate-400">
                Add your farm information to start managing it.
              </p>
            </div>

          </div>

        </div>

        {/* Form */}
        <div className="p-6 md:p-8">

          <form onSubmit={handleCreateFarm}>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

              {/* Farm Name */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-300">
                  Farm Name
                </label>

                <div className="relative">
                  <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-lg">
                    🌾
                  </span>

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. My Tomato Farm"
                    className="w-full rounded-xl border border-slate-700 bg-slate-900 py-3 pl-12 pr-4 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20"
                  />
                </div>
              </div>

              {/* Location */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-300">
                  Location
                </label>

                <div className="relative">
                  <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-lg">
                    📍
                  </span>

                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="e.g. Kishoreganj"
                    className="w-full rounded-xl border border-slate-700 bg-slate-900 py-3 pl-12 pr-4 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20"
                  />
                </div>
              </div>

              {/* Soil */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-300">
                  Soil Type
                </label>

                <div className="relative">
                  <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-lg">
                    🌱
                  </span>

                  <select
                    name="soil_type"
                    value={formData.soil_type}
                    onChange={handleChange}
                    className="w-full appearance-none rounded-xl border border-slate-700 bg-slate-900 py-3 pl-12 pr-10 text-sm text-white outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20"
                  >
                    <option value="clay" className="bg-slate-900 text-white">Clay</option>
                    <option value="loam" className="bg-slate-900 text-white">Loam</option>
                    <option value="sandy" className="bg-slate-900 text-white">Sandy</option>
                  </select>

                  <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
                    ▼
                  </span>
                </div>
              </div>

              {/* Area */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-300">
                  Area (Hectares)
                </label>

                <div className="relative">
                  <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-lg">
                    📐
                  </span>

                  <input
                    type="number"
                    name="area_hectares"
                    value={formData.area_hectares}
                    onChange={handleChange}
                    placeholder="e.g. 2.5"
                    min="0.01"
                    step="0.01"
                    className="w-full rounded-xl border border-slate-700 bg-slate-900 py-3 pl-12 pr-4 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20"
                  />
                </div>
              </div>

            </div>

            {/* Submit */}
            <div className="mt-7 flex justify-end">

              <button
                type="submit"
                disabled={creating}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-600/20 transition hover:bg-emerald-500 hover:shadow-emerald-500/30 disabled:cursor-not-allowed disabled:bg-slate-700"
              >
                {creating ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Creating...
                  </>
                ) : (
                  <>
                    <span>🌱</span>
                    Create Farm
                  </>
                )}
              </button>

            </div>

          </form>

        </div>
      </div>

      {/* ======================================================
          Farm List Header
      ====================================================== */}

      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">

        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
            Your Agriculture Space
          </p>

          <h2 className="mt-1 text-2xl font-bold text-white">
            Your Farms
          </h2>
        </div>

        <div className="rounded-full bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 text-sm font-semibold text-emerald-400">
          {farms.length} farm{farms.length !== 1 ? "s" : ""}
        </div>

      </div>

      {/* ======================================================
          Loading
      ====================================================== */}

      {loading && (
        <div className="rounded-3xl border border-slate-700/60 bg-slate-800/80 backdrop-blur-md p-12 text-center shadow-sm">

          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/10 text-2xl">
            🌱
          </div>

          <div className="mx-auto mb-3 h-2 w-32 animate-pulse rounded-full bg-slate-700" />

          <p className="text-sm text-slate-400">
            Loading your farms...
          </p>

        </div>
      )}

      {/* ======================================================
          Empty
      ====================================================== */}

      {!loading && farms.length === 0 && !error && (
        <div className="rounded-3xl border border-dashed border-slate-700 bg-slate-800/40 p-12 text-center shadow-sm">

          <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-3xl bg-emerald-500/10 text-4xl">
            🌱
          </div>

          <h3 className="text-xl font-bold text-white">
            No farms found
          </h3>

          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-400">
            You haven't added any farms yet. Create your first farm using the
            form above and start managing your agricultural data.
          </p>

        </div>
      )}

      {/* ======================================================
          Farm Cards
      ====================================================== */}

      {!loading && farms.length > 0 && (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">

          {farms.map((farm) => (

            <div
              key={farm.id}
              className="group overflow-hidden rounded-3xl border border-slate-700/60 bg-slate-800/80 backdrop-blur-md shadow-md transition duration-300 hover:-translate-y-1 hover:border-emerald-500/50 hover:shadow-xl"
            >

              {/* Card Top */}
              <div className="bg-gradient-to-br from-emerald-500/10 via-slate-800 to-slate-800 p-5 border-b border-slate-700/60">

                <div className="flex items-start justify-between">

                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-900 border border-slate-700 text-3xl shadow-sm">
                    🌾
                  </div>

                  <span className="flex items-center gap-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 text-xs font-semibold text-emerald-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    Active
                  </span>

                </div>

                <h3 className="mt-5 truncate text-xl font-bold text-white">
                  {farm.name}
                </h3>

                <p className="mt-1 flex items-center gap-1.5 text-sm text-slate-400">
                  <span>📍</span>
                  {farm.location}
                </p>

              </div>

              {/* Card Information */}
              <div className="p-5">

                <div className="grid grid-cols-2 gap-3">

                  {/* Soil */}
                  <div className="rounded-2xl bg-slate-900/60 border border-slate-700/50 p-4">
                    <div className="mb-2 text-lg">
                      🌱
                    </div>

                    <p className="text-xs font-medium text-slate-400">
                      Soil Type
                    </p>

                    <p className="mt-1 font-semibold capitalize text-white">
                      {farm.soil_type}
                    </p>
                  </div>

                  {/* Area */}
                  <div className="rounded-2xl bg-slate-900/60 border border-slate-700/50 p-4">
                    <div className="mb-2 text-lg">
                      📐
                    </div>

                    <p className="text-xs font-medium text-slate-400">
                      Farm Area
                    </p>

                    <p className="mt-1 font-semibold text-white">
                      {farm.area_hectares} ha
                    </p>
                  </div>

                </div>

                {/* Created Date */}
                {farm.created_at && (
                  <div className="mt-4 flex items-center justify-between border-t border-slate-700/60 pt-4">
                    <span className="text-xs text-slate-500">
                      Created
                    </span>

                    <span className="text-xs font-medium text-slate-400">
                      {new Date(farm.created_at).toLocaleDateString()}
                    </span>
                  </div>
                )}

              </div>

            </div>

          ))}

        </div>
      )}

    </div>
  );
};

export default MyFarms;