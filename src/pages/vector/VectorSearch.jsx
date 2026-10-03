import { useState } from "react";
import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000";

const VectorSearch = () => {
  const [query, setQuery] = useState("");
  const [topK, setTopK] = useState(3);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searched, setSearched] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) {
      setError("Please enter a search query.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setSearched(true);
      setResults([]);

     const token = localStorage.getItem("token");

      if (!token) {
        setError("Authentication token not found. Please login again.");
        return;
      }

      const response = await axios.post(
        `${API_BASE_URL}/api/v1/vector/search`,
        null,
        {
          params: {
            query: query.trim(),
            top_k: topK,
          },
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      setResults(response.data.results || []);
    } catch (err) {
      console.error("Vector Search Error:", err);

      if (err.response?.status === 401) {
        setError("Authentication failed. Please login again.");
      } else if (err.response?.status === 403) {
        setError("You are not authorized to use Vector Search.");
      } else {
        setError(
          err.response?.data?.detail ||
            err.response?.data?.error ||
            "Vector search failed."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setQuery("");
    setResults([]);
    setError("");
    setSearched(false);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="min-h-[calc(100vh-48px)] bg-[#0b132b] text-slate-100 p-6 overflow-y-auto">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-1 text-white">
            🔍 Vector Search
          </h1>

          <p className="text-slate-400">
            Search semantically similar information from the AgriPulse AI
            vector database.
          </p>
        </div>

        {/* Search Card */}
        <div className="bg-[#111c38] border border-slate-800 rounded-2xl shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold text-white">
            Vector Database Search
          </h2>

          <div className="mt-5 flex flex-col gap-4 md:flex-row">

            {/* Query */}
            <div className="flex-1">
              <label className="block mb-2 font-medium text-slate-300 text-sm">
                Search Query
              </label>

              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Example: tomato disease"
                className="w-full bg-[#0b132b] border border-slate-800 rounded-xl p-3 text-slate-200 placeholder-slate-500 outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/10 transition"
              />
            </div>

            {/* Top K */}
            <div className="w-full md:w-32">
              <label className="block mb-2 font-medium text-slate-300 text-sm">
                Results
              </label>

              <select
                value={topK}
                onChange={(e) => setTopK(Number(e.target.value))}
                className="w-full bg-[#0b132b] border border-slate-800 rounded-xl p-3 text-slate-200 outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/10 transition"
              >
                <option value={1} className="bg-[#0b132b] text-slate-200">1</option>
                <option value={3} className="bg-[#0b132b] text-slate-200">3</option>
                <option value={5} className="bg-[#0b132b] text-slate-200">5</option>
                <option value={10} className="bg-[#0b132b] text-slate-200">10</option>
              </select>
            </div>

          </div>

          {/* Buttons */}
          <div className="mt-5 flex gap-3">

            <button
              onClick={handleSearch}
              disabled={loading}
              className="bg-emerald-600 text-white px-6 py-2.5 rounded-xl hover:bg-emerald-500 transition shadow-lg shadow-emerald-950/20 font-medium disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Searching..." : "🔎 Search"}
            </button>

            <button
              onClick={handleClear}
              className="bg-slate-800 border border-slate-700 text-slate-300 px-6 py-2.5 rounded-xl hover:bg-slate-700 transition font-medium"
            >
              🗑️ Clear
            </button>

          </div>

          {/* Error */}
          {error && (
            <div className="mt-5 rounded-xl border border-red-900/50 bg-red-950/40 p-4 text-red-400">
              ⚠️ {error}
            </div>
          )}
        </div>

        {/* Results */}
        {searched && !loading && !error && (
          <div className="bg-[#111c38] border border-slate-800 rounded-2xl shadow-lg p-6">

            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-white">
                  📚 Vector Search Results
                </h2>

                <p className="mt-1 text-sm text-slate-400">
                  Results retrieved from ChromaDB
                </p>
              </div>

              <span className="rounded-full bg-emerald-950/60 border border-emerald-900/50 px-4 py-1.5 text-sm font-medium text-emerald-400">
                {results.length} result{results.length !== 1 ? "s" : ""}
              </span>
            </div>

            {results.length === 0 ? (
              <div className="rounded-xl border border-slate-800 bg-[#0b132b] p-6 text-center text-slate-400">
                No relevant documents found.
              </div>
            ) : (
              <div className="space-y-4">

                {results.map((result, index) => (
                  <div
                    key={`${result.metadata?.source || "result"}-${index}`}
                    className="rounded-xl border border-slate-800 bg-[#0b132b] p-5"
                  >

                    {/* Result Header */}
                    <div className="flex items-center justify-between gap-4">

                      <h3 className="font-semibold text-slate-200">
                        Result #{index + 1}
                      </h3>

                      {typeof result.distance === "number" && (
                        <span className="rounded-full bg-blue-950/60 border border-blue-900/50 px-3 py-1 text-xs font-medium text-blue-400">
                          Distance: {result.distance.toFixed(4)}
                        </span>
                      )}

                    </div>

                    {/* Document */}
                    <div className="mt-4 whitespace-pre-wrap rounded-xl border border-slate-800/60 bg-[#111c38]/50 p-4 text-sm leading-6 text-slate-300">
                      {result.document}
                    </div>

                    {/* Metadata */}
                    {result.metadata && (
                      <div className="mt-4 flex flex-wrap gap-2">

                        {result.metadata.source && (
                          <span className="rounded-full bg-emerald-950/40 border border-emerald-900/40 px-3 py-1 text-xs text-emerald-400">
                            📄 {result.metadata.source}
                          </span>
                        )}

                        {result.metadata.chunk !== undefined && (
                          <span className="rounded-full bg-purple-950/40 border border-purple-900/40 px-3 py-1 text-xs text-purple-400">
                            Chunk: {result.metadata.chunk}
                          </span>
                        )}

                        {result.metadata.crop && (
                          <span className="rounded-full bg-orange-950/40 border border-orange-900/40 px-3 py-1 text-xs text-orange-400">
                            🌱 {result.metadata.crop}
                          </span>
                        )}

                      </div>
                    )}

                  </div>
                ))}

              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
};

export default VectorSearch;