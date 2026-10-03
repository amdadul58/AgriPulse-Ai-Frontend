import { useState } from "react";
import axios from "../../api/axios";

const VisionDiseaseDetection = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) {
      return;
    }

    setImage(file);
    setPreview(URL.createObjectURL(file));
    setResult(null);
  };

  const handleDetect = async () => {
    if (!image) {
      setResult({
        error: "Please upload a leaf image first.",
      });
      return;
    }

    try {
      setLoading(true);
      setResult(null);

      const formData = new FormData();
      formData.append("image", image);

      const response = await axios.post(
        "/api/v1/vision/detect",
        formData
      );

      console.log("Vision API Response:", response.data);

      setResult(response.data);
    } catch (error) {
      console.error("Vision detection error:", error);

      setResult({
        error:
          error.response?.data?.detail ||
          error.response?.data?.message ||
          "Vision detection failed. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const isUncertain =
    result?.detected_disease?.toLowerCase() === "uncertain";

  return (
    <div className="min-h-[calc(100vh-48px)] bg-[#0b132b] text-slate-100 p-6 overflow-y-auto">
      <div className="max-w-3xl mx-auto">
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white">
            👁️ Vision Disease Detection
          </h1>

          <p className="mt-1 text-slate-400">
            Upload a plant leaf image and let the AI identify possible diseases.
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-[#111c38] border border-slate-800 shadow-lg rounded-2xl p-6">
          {/* Upload */}
          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-2">
              Upload Leaf Image
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full bg-[#0b132b] border border-slate-800 p-3 text-slate-300 rounded-xl cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-emerald-600 file:text-white hover:file:bg-emerald-500 transition"
            />
          </div>

          {/* Image Preview */}
          {preview && (
            <div className="mt-5">
              <p className="text-sm font-semibold text-slate-300 mb-2">
                Image Preview
              </p>

              <img
                src={preview}
                alt="Selected leaf"
                className="w-72 h-72 object-cover rounded-xl border border-slate-800"
              />
            </div>
          )}

          {/* Detect Button */}
          <button
            onClick={handleDetect}
            disabled={loading}
            className={`mt-5 px-6 py-2.5 rounded-xl text-white font-medium transition shadow-lg ${
              loading
                ? "bg-slate-800 text-slate-600 cursor-not-allowed"
                : "bg-emerald-600 hover:bg-emerald-500 shadow-emerald-950/20"
            }`}
          >
            {loading ? "🔍 Analyzing..." : "🔬 Detect Disease"}
          </button>

          {/* Error */}
          {result?.error && (
            <div className="mt-5 bg-red-950/40 border border-red-900/50 p-4 rounded-xl">
              <p className="text-red-400 font-medium">
                ❌ {result.error}
              </p>
            </div>
          )}

          {/* Result */}
          {result && !result.error && (
            <div className="mt-6">
              {/* Result Header */}
              <div
                className={`p-4 rounded-xl border ${
                  isUncertain
                    ? "bg-yellow-950/40 border-yellow-900/50 text-yellow-400"
                    : "bg-[#0b132b] border-slate-800 text-slate-200"
                }`}
              >
                <h2
                  className={`text-xl font-bold ${
                    isUncertain
                      ? "text-yellow-400"
                      : "text-emerald-400"
                  }`}
                >
                  {isUncertain
                    ? "⚠️ Uncertain Result"
                    : "✅ Detection Result"}
                </h2>

                {/* Plant */}
                {result.plant && (
                  <p className="mt-3 text-slate-300">
                    <strong className="text-slate-200">Plant:</strong>{" "}
                    {result.plant}
                  </p>
                )}

                {/* Disease */}
                <p className="mt-2 text-slate-300">
                  <strong className="text-slate-200">Disease:</strong>{" "}
                  {result.detected_disease || "Unknown"}
                </p>

                {/* Confidence */}
                {result.confidence !== undefined && (
                  <p className="mt-2 text-slate-300">
                    <strong className="text-slate-200">Confidence:</strong>{" "}
                    {typeof result.confidence === "number"
                      ? `${result.confidence.toFixed(2)}%`
                      : result.confidence}
                  </p>
                )}

                {/* Full Label */}
                {result.full_label && (
                  <p className="mt-2 text-slate-300">
                    <strong className="text-slate-200">Full Label:</strong>{" "}
                    {result.full_label}
                  </p>
                )}

                {/* Message */}
                {result.message && (
                  <p className="mt-3 text-slate-400">
                    {result.message}
                  </p>
                )}

                {/* Note */}
                {result.note && (
                  <p className="mt-3 text-slate-400">
                    <strong className="text-slate-200">Note:</strong>{" "}
                    {result.note}
                  </p>
                )}
              </div>

              {/* Top Predictions */}
              {result.top_predictions &&
                result.top_predictions.length > 0 && (
                  <div className="mt-5">
                    <h3 className="text-lg font-bold text-emerald-400 mb-3">
                      Top Predictions
                    </h3>

                    <div className="space-y-3">
                      {result.top_predictions.map(
                        (prediction, index) => (
                          <div
                            key={`${prediction.full_label}-${index}`}
                            className="border border-slate-800 rounded-xl p-4 bg-[#0b132b]"
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-semibold text-slate-200">
                                  {index + 1}.{" "}
                                  {prediction.disease}
                                </p>

                                <p className="text-sm text-slate-400">
                                  Plant: {prediction.plant}
                                </p>
                              </div>

                              <span className="font-bold text-emerald-400">
                                {Number(
                                  prediction.confidence
                                ).toFixed(2)}
                                %
                              </span>
                            </div>

                            {/* Confidence Bar */}
                            <div className="mt-2 w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                              <div
                                className="bg-emerald-500 h-2 rounded-full transition-all duration-500"
                                style={{
                                  width: `${Math.min(
                                    Number(
                                      prediction.confidence
                                    ),
                                    100
                                  )}%`,
                                }}
                              />
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VisionDiseaseDetection;