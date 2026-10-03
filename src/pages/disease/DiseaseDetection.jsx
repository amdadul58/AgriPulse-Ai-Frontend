import { useState } from "react";
import axios from "../../api/axios";

const DiseaseDetection = () => {
  const [cropName, setCropName] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleDetect = async () => {
    if (!cropName || !symptoms) {
      setResult({
        message: "Please enter crop name and symptoms",
      });
      return;
    }

    try {
      setLoading(true);
      setResult(null);

      const response = await axios.post(
        "/api/v1/diseases/detect",
        {
          crop_name: cropName,
          symptoms: symptoms,
        }
      );

      console.log(response.data);
      setResult(response.data);
    } catch (error) {
      console.error(error);

      setResult({
        message:
          error.response?.data?.detail ||
          "Disease detection failed",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-48px)] bg-[#0b132b] text-slate-100 p-6 overflow-y-auto">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-white">
          🩺 Disease Detection
        </h1>

        <div className="bg-[#111c38] border border-slate-800 rounded-2xl shadow-lg p-6">
          <label className="block mb-2 font-medium text-slate-300">
            Crop Name
          </label>

          <input
            type="text"
            value={cropName}
            onChange={(e) => setCropName(e.target.value)}
            placeholder="Example: Tomato"
            className="w-full bg-[#0b132b] border border-slate-800 rounded-xl p-3 mb-4 text-slate-200 placeholder-slate-500 focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/10 outline-none transition"
          />

          <label className="block mb-2 font-medium text-slate-300">
            Symptoms
          </label>

          <textarea
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            placeholder="Example: Yellow leaves, brown spots..."
            className="w-full bg-[#0b132b] border border-slate-800 rounded-xl p-3 h-32 text-slate-200 placeholder-slate-500 focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/10 outline-none transition resize-none"
          />

          <button
            onClick={handleDetect}
            disabled={loading}
            className="mt-4 bg-emerald-600 text-white px-5 py-2.5 rounded-xl hover:bg-emerald-500 disabled:bg-slate-800 disabled:text-slate-600 disabled:cursor-not-allowed transition shadow-lg shadow-emerald-950/20 font-medium"
          >
            {loading ? "Checking..." : "Detect Disease"}
          </button>

          {result && (
            <div className="mt-6 bg-[#0b132b] border border-slate-800 p-5 rounded-2xl">
              {result.message ? (
                <p className="text-red-400 font-semibold">
                  {result.message}
                </p>
              ) : (
                <>
                  <h2 className="text-xl font-bold text-emerald-400 mb-3">
                    🦠 Disease Result
                  </h2>

                  <p className="text-slate-300 mb-1">
                    <strong className="text-slate-200">Name:</strong> {result.name}
                  </p>

                  <p className="text-slate-300 mb-1">
                    <strong className="text-slate-200">Scientific Name:</strong> {result.scientific_name}
                  </p>

                  <p className="text-slate-300 mb-1">
                    <strong className="text-slate-200">Category:</strong> {result.category}
                  </p>

                  <p className="text-slate-300 mb-1">
                    <strong className="text-slate-200">Severity:</strong> {result.severity_level}
                  </p>

                  <p className="text-slate-300 mb-1">
                    <strong className="text-slate-200">Symptoms:</strong> {result.symptoms}
                  </p>

                  <p className="text-slate-300 mb-1">
                    <strong className="text-slate-200">Causes:</strong> {result.causes}
                  </p>

                  {result.treatments &&
                    result.treatments.length > 0 && (
                      <div className="mt-5">
                        <h3 className="font-bold text-lg text-emerald-400 mb-3">
                          💊 Treatment
                        </h3>

                        {result.treatments.map((item) => (
                          <div
                            key={item.id}
                            className="bg-[#111c38] border border-slate-800 mt-3 p-4 rounded-xl space-y-1 text-slate-300"
                          >
                            <p>
                              <strong className="text-slate-200">Type:</strong> {item.recommendation_type}
                            </p>

                            <p>
                              <strong className="text-slate-200">Description:</strong> {item.description}
                            </p>

                            <p>
                              <strong className="text-slate-200">Product:</strong> {item.products.join(", ")}
                            </p>

                            <p>
                              <strong className="text-slate-200">Dosage:</strong> {item.dosage}
                            </p>

                            <p>
                              <strong className="text-slate-200">Method:</strong> {item.application_method}
                            </p>

                            <p>
                              <strong className="text-slate-200">Precautions:</strong> {item.precautions}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DiseaseDetection;