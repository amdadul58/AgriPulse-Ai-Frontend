import { useState } from "react";

const FertilizerRecommendation = () => {
  const [crop, setCrop] = useState("");
  const [soil, setSoil] = useState("");
  const [result, setResult] = useState("");

  const handleRecommend = (e) => {
    e.preventDefault();

    if (!crop || !soil) {
      setResult("Please select crop and soil type");
      return;
    }

    const fertilizers = {
      rice: {
        clay: "Urea + DAP",
        loam: "NPK 15-15-15",
        sandy: "Compost + Urea",
      },
      tomato: {
        clay: "NPK 10-10-10",
        loam: "NPK 12-12-17",
        sandy: "Compost + NPK",
      },
    };

    setResult(
      fertilizers[crop.toLowerCase()]?.[soil] || "Mixed fertilizer"
    );
  };

  return (
    <div className="min-h-[calc(100vh-48px)] bg-[#0b132b] text-slate-100 p-6 overflow-y-auto">
      <div className="max-w-xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-white">
          💧 Fertilizer Recommendation
        </h1>

        <div className="bg-[#111c38] border border-slate-800 rounded-2xl shadow-lg p-6">
          <form onSubmit={handleRecommend}>
            <label className="block mb-2 font-medium text-slate-300">
              Crop Name
            </label>

            <input
              type="text"
              value={crop}
              onChange={(e) => setCrop(e.target.value)}
              placeholder="Example: rice, tomato"
              className="w-full bg-[#0b132b] border border-slate-800 rounded-xl p-3 mb-4 text-slate-200 placeholder-slate-500 outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/10 transition"
            />

            <label className="block mb-2 font-medium text-slate-300">
              Soil Type
            </label>

            <select
              value={soil}
              onChange={(e) => setSoil(e.target.value)}
              className="w-full bg-[#0b132b] border border-slate-800 rounded-xl p-3 mb-4 text-slate-200 outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/10 transition"
            >
              <option value="" className="bg-[#0b132b] text-slate-500">
                Select Soil
              </option>
              <option value="clay" className="bg-[#0b132b] text-slate-200">
                Clay
              </option>
              <option value="loam" className="bg-[#0b132b] text-slate-200">
                Loam
              </option>
              <option value="sandy" className="bg-[#0b132b] text-slate-200">
                Sandy
              </option>
            </select>

            <button
              type="submit"
              className="mt-2 bg-emerald-600 text-white px-5 py-2.5 rounded-xl hover:bg-emerald-500 transition shadow-lg shadow-emerald-950/20 font-medium"
            >
              Get Advice
            </button>
          </form>

          {result && (
            <div className={`mt-6 p-5 rounded-2xl border ${
              result.includes("Please") 
                ? "bg-red-950/40 border-red-900/50 text-red-400" 
                : "bg-[#0b132b] border-slate-800 text-slate-200"
            }`}>
              <h3 className="font-bold text-lg text-emerald-400 mb-2">
                🌱 Recommended Fertilizer
              </h3>

              <p className="text-slate-300">
                {result}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FertilizerRecommendation;