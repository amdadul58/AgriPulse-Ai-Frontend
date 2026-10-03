import { useState } from "react";
import axios from "../../api/axios";

const RAGSearch = () => {
  const [query, setQuery] = useState("");
  const [answer, setAnswer] = useState("");
  const [searchedQuery, setSearchedQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ============================================================
  // Search RAG
  // ============================================================

  const handleSearch = async (event) => {
    event?.preventDefault();

    const text = query.trim();

    if (!text || loading) {
      return;
    }

    try {
      setLoading(true);
      setError("");
      setAnswer("");
      setSearchedQuery(text);

      const token = localStorage.getItem("token");

      if (!token) {
        setError("Authentication token not found. Please login again.");
        return;
      }

      const response = await axios.post(
        "/api/v1/rag/ask",
        null,
        {
          params: {
            query: text,
          },
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      console.log("RAG Response:", response.data);

      setAnswer(
        response.data?.answer ||
          "No answer was returned from the knowledge base."
      );
    } catch (err) {
      console.error("RAG Search Error:", err);

      if (err.response?.status === 401) {
        setError("Authentication failed. Please login again.");
      } else if (err.response?.status === 403) {
        setError("You are not authorized to access the RAG knowledge base.");
      } else {
        setError(
          err.response?.data?.detail ||
            err.response?.data?.message ||
            "Failed to search the knowledge base."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  // ============================================================
  // Clear Search
  // ============================================================

  const handleClear = () => {
    setQuery("");
    setAnswer("");
    setSearchedQuery("");
    setError("");
  };

  // ============================================================
  // UI
  // ============================================================

  return (
    <div className="min-h-[calc(100vh-48px)] bg-[#0b132b] text-slate-100 p-4 md:p-6 overflow-y-auto">

      {/* ========================================================
          Header
      ======================================================== */}

      <div className="max-w-5xl mx-auto">

        <div className="mb-6">

          <div className="flex items-center gap-3">

            <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-emerald-950/60 border border-emerald-900/50 text-2xl">
              📚
            </div>

            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white">
                RAG Search
              </h1>

              <p className="text-sm text-slate-400 mt-1">
                Search information from the AgriPulse AI knowledge base.
              </p>
            </div>

          </div>

        </div>


        {/* ======================================================
            Search Box
        ====================================================== */}

        <div className="bg-[#111c38] border border-slate-800 rounded-2xl shadow-lg p-5 md:p-6">

          <div className="flex items-center gap-2 mb-4">

            <span className="text-xl">
              🔎
            </span>

            <h2 className="text-lg font-bold text-white">
              Knowledge Base Search
            </h2>

          </div>


          <form onSubmit={handleSearch}>

            <div className="flex flex-col md:flex-row gap-3">

              <div className="relative flex-1">

                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                  🔍
                </span>

                <input
                  type="text"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Ask about crops, diseases, fertilizers..."
                  disabled={loading}
                  className="w-full pl-11 pr-4 py-3.5 bg-[#0b132b] border border-slate-800 rounded-xl outline-none text-slate-200 placeholder-slate-500 focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/10 disabled:opacity-60 transition"
                />

              </div>


              <button
                type="submit"
                disabled={!query.trim() || loading}
                className="md:w-32 px-6 py-3.5 bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-800 disabled:text-slate-600 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition shadow-lg shadow-emerald-950/20"
              >
                {loading ? "Searching..." : "🔎 Search"}
              </button>

            </div>

          </form>


          <div className="mt-3 flex flex-wrap gap-2">

            <button
              type="button"
              onClick={() => setQuery("Tomato late blight")}
              disabled={loading}
              className="px-3 py-1.5 text-xs rounded-full bg-emerald-950/40 border border-emerald-900/40 text-emerald-400 hover:bg-emerald-950/70 transition disabled:opacity-50"
            >
              🍅 Tomato disease
            </button>

            <button
              type="button"
              onClick={() => setQuery("fertilizer recommendation")}
              disabled={loading}
              className="px-3 py-1.5 text-xs rounded-full bg-blue-950/40 border border-blue-900/40 text-blue-400 hover:bg-blue-950/70 transition disabled:opacity-50"
            >
              🌱 Fertilizer
            </button>

            <button
              type="button"
              onClick={() => setQuery("crop disease treatment")}
              disabled={loading}
              className="px-3 py-1.5 text-xs rounded-full bg-amber-950/40 border border-amber-900/40 text-amber-400 hover:bg-amber-950/70 transition disabled:opacity-50"
            >
              🩺 Disease treatment
            </button>

          </div>

        </div>


        {/* ======================================================
            Error
        ====================================================== */}

        {error && (

          <div className="mt-5 bg-red-950/40 border border-red-900/50 rounded-2xl p-5">

            <div className="flex items-start gap-3">

              <div className="text-xl">
                ⚠️
              </div>

              <div>

                <h3 className="font-bold text-red-400">
                  RAG Search Error
                </h3>

                <p className="mt-1 text-sm text-red-300">
                  {error}
                </p>

              </div>

            </div>

          </div>

        )}


        {/* ======================================================
            Loading
        ====================================================== */}

        {loading && (

          <div className="mt-5 bg-[#111c38] border border-slate-800 rounded-2xl shadow-lg p-8">

            <div className="flex flex-col items-center justify-center">

              <div className="w-10 h-10 border-4 border-emerald-950 border-t-emerald-500 rounded-full animate-spin" />

              <p className="mt-4 font-medium text-slate-200">
                Searching knowledge base...
              </p>

              <p className="mt-1 text-sm text-slate-500">
                Finding relevant agricultural information
              </p>

            </div>

          </div>

        )}


        {/* ======================================================
            Result
        ====================================================== */}

        {!loading && answer && (

          <div className="mt-5 bg-[#111c38] border border-slate-800 rounded-2xl shadow-lg overflow-hidden">

            {/* Result Header */}

            <div className="flex items-center justify-between px-5 md:px-6 py-4 bg-[#0b132b]/50 border-b border-slate-800">

              <div className="flex items-center gap-3">

                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-emerald-950/60 border border-emerald-900/50 text-xl">
                  📚
                </div>

                <div>

                  <h2 className="font-bold text-white">
                    RAG Result
                  </h2>

                  <p className="text-xs text-slate-400">
                    Retrieved from knowledge base
                  </p>

                </div>

              </div>


              <button
                type="button"
                onClick={handleClear}
                className="px-3 py-2 text-sm text-slate-300 border border-slate-800 rounded-lg hover:bg-slate-800 transition"
              >
                🗑️ Clear
              </button>

            </div>


            {/* Query */}

            <div className="px-5 md:px-6 pt-5">

              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                Your Query
              </p>

              <div className="mt-2 bg-emerald-950/30 border border-emerald-900/30 rounded-xl px-4 py-3">

                <p className="text-slate-200">
                  {searchedQuery}
                </p>

              </div>

            </div>


            {/* Answer */}

            <div className="px-5 md:px-6 py-5">

              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                Answer
              </p>

              <div className="mt-2 bg-[#0b132b] border border-slate-800 rounded-xl p-5">

                <p className="text-slate-300 text-sm md:text-base leading-7 whitespace-pre-wrap break-words">
                  {answer}
                </p>

              </div>

            </div>

          </div>

        )}


        {/* ======================================================
            Empty State
        ====================================================== */}

        {!loading && !answer && !error && (

          <div className="mt-5 bg-[#111c38] border border-slate-800 rounded-2xl shadow-lg p-10 text-center">

            <div className="flex items-center justify-center w-20 h-20 mx-auto rounded-3xl bg-emerald-950/40 border border-emerald-900/40 text-4xl">
              📖
            </div>

            <h2 className="mt-5 text-xl font-bold text-white">
              Search the Agricultural Knowledge Base
            </h2>

            <p className="max-w-xl mx-auto mt-2 text-sm text-slate-400 leading-6">
              Ask questions about crops, plant diseases, fertilizers,
              pesticides, treatments, and other agricultural topics.
            </p>

          </div>

        )}

      </div>

    </div>
  );
};

export default RAGSearch;