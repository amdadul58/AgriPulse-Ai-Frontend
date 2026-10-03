import { useEffect, useRef, useState } from "react";
import axios from "../../api/axios";

const AIChat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const textareaRef = useRef(null);
  const messagesEndRef = useRef(null);

  // ============================================================
  // Auto scroll
  // ============================================================

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  // ============================================================
  // Send Message
  // ============================================================

  const handleSend = async (event) => {
    event?.preventDefault();

    const text = message.trim();

    if (!text || loading) {
      return;
    }

    const userMessage = {
      id: Date.now(),
      role: "user",
      content: text,
    };

    setMessages((previous) => [...previous, userMessage]);
    setMessage("");
    setLoading(true);

    try {
      const response = await axios.post("/api/v1/chat", {
        message: text,
      });

      const reply =
        response.data?.reply ??
        response.data?.message ??
        "I couldn't generate a response.";

      const assistantMessage = {
        id: Date.now() + 1,
        role: "assistant",
        content: reply,
      };

      setMessages((previous) => [
        ...previous,
        assistantMessage,
      ]);
    } catch (error) {
      console.error("AI Chat Error:", error);

      const errorMessage =
        error.response?.data?.detail ||
        error.response?.data?.message ||
        "Sorry, I couldn't connect to the AI service.";

      setMessages((previous) => [
        ...previous,
        {
          id: Date.now() + 1,
          role: "assistant",
          content: errorMessage,
          error: true,
        },
      ]);
    } finally {
      setLoading(false);

      setTimeout(() => {
        textareaRef.current?.focus();
      }, 100);
    }
  };

  // ============================================================
  // Enter = Send
  // Shift + Enter = New line
  // ============================================================

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };

  // ============================================================
  // Clear conversation
  // ============================================================

  const clearChat = () => {
    setMessages([]);
    setMessage("");

    setTimeout(() => {
      textareaRef.current?.focus();
    }, 100);
  };

  // ============================================================
  // UI
  // ============================================================

  return (
    <div className="flex flex-col h-[calc(100vh-48px)] bg-[#0b132b] text-slate-100">

      {/* ========================================================
          Header
      ======================================================== */}

      <header className="flex items-center justify-between bg-[#111c38] border-b border-slate-800 px-6 py-4">

        <div className="flex items-center gap-3">

          <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-emerald-500/20 text-2xl border border-emerald-500/30">
            🤖
          </div>

          <div>
            <h1 className="text-xl font-bold text-white">
              AI Chat
            </h1>

            <p className="text-sm text-slate-400">
              General purpose AI assistant
            </p>
          </div>

        </div>

        {messages.length > 0 && (
          <button
            type="button"
            onClick={clearChat}
            className="px-4 py-2 text-sm font-medium text-slate-300 border border-slate-800 rounded-lg bg-[#0b132b] hover:bg-emerald-950/30 hover:border-emerald-500/50 hover:text-emerald-400 transition"
          >
            🗑️ Clear
          </button>
        )}

      </header>


      {/* ========================================================
          Conversation Area
      ======================================================== */}

      <main className="flex-1 overflow-y-auto px-4 md:px-8 py-6">

        <div className="max-w-4xl mx-auto">

          {/* ====================================================
              Empty Chat
          ==================================================== */}

          {messages.length === 0 && !loading && (
            <div className="flex flex-col items-center justify-center min-h-[calc(100vh-300px)] text-center">

              <div className="flex items-center justify-center w-20 h-20 mb-6 rounded-3xl bg-emerald-500/20 text-4xl shadow-sm border border-emerald-500/30">
                🤖
              </div>

              <h2 className="text-3xl font-bold text-white">
                How can I help you?
              </h2>

              <p className="max-w-lg mt-3 text-slate-400">
                Start a conversation with the AI assistant.
                Type your message below and press Send.
              </p>

            </div>
          )}


          {/* ====================================================
              Messages
          ==================================================== */}

          <div className="space-y-6">

            {messages.map((item) => (

              <div
                key={item.id}
                className={`flex ${
                  item.role === "user"
                    ? "justify-end"
                    : "justify-start"
                }`}
              >

                <div
                  className={`flex items-start gap-3 max-w-[85%] ${
                    item.role === "user"
                      ? "flex-row-reverse"
                      : ""
                  }`}
                >

                  {/* Avatar */}

                  <div
                    className={`flex-shrink-0 flex items-center justify-center w-9 h-9 rounded-full text-lg ${
                      item.role === "user"
                        ? "bg-emerald-600 text-white"
                        : "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                    }`}
                  >
                    {item.role === "user" ? "👤" : "🤖"}
                  </div>


                  {/* Bubble */}

                  <div
                    className={`px-4 py-3 rounded-2xl ${
                      item.role === "user"
                        ? "bg-emerald-600 text-white rounded-tr-sm shadow-md shadow-emerald-950/20"
                        : item.error
                        ? "bg-red-950/40 border border-red-900/50 text-red-300 rounded-tl-sm"
                        : "bg-[#111c38] border border-slate-800 text-slate-200 rounded-tl-sm shadow-sm"
                    }`}
                  >

                    <p className="text-sm leading-6 whitespace-pre-wrap break-words">
                      {item.content}
                    </p>

                  </div>

                </div>

              </div>

            ))}


            {/* ==================================================
                AI Loading
            ================================================== */}

            {loading && (

              <div className="flex justify-start">

                <div className="flex items-start gap-3">

                  <div className="flex items-center justify-center w-9 h-9 rounded-full bg-emerald-500/20 text-lg text-emerald-400 border border-emerald-500/30">
                    🤖
                  </div>

                  <div className="px-5 py-4 bg-[#111c38] border border-slate-800 rounded-2xl rounded-tl-sm shadow-sm">

                    <div className="flex items-center gap-2">

                      <span className="text-sm text-slate-400">
                        AI is thinking
                      </span>

                      <span className="flex gap-1">

                        <span className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" />

                        <span
                          className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce"
                          style={{ animationDelay: "150ms" }}
                        />

                        <span
                          className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce"
                          style={{ animationDelay: "300ms" }}
                        />

                      </span>

                    </div>

                  </div>

                </div>

              </div>

            )}

          </div>

          <div ref={messagesEndRef} />

        </div>

      </main>


      {/* ========================================================
          Chat Input
      ======================================================== */}

      <footer className="bg-[#111c38] border-t border-slate-800 px-4 md:px-8 py-4">

        <div className="max-w-4xl mx-auto">

          <form onSubmit={handleSend}>

            <div className="flex items-end gap-3 p-2 bg-[#0b132b] border border-slate-800 rounded-2xl focus-within:border-emerald-500/50 focus-within:ring-2 focus-within:ring-emerald-500/10 transition">

              <textarea
                ref={textareaRef}
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                onKeyDown={handleKeyDown}
                disabled={loading}
                rows={1}
                placeholder="Type your message..."
                className="flex-1 px-3 py-3 bg-transparent border-none outline-none resize-none text-slate-200 placeholder-slate-500 disabled:opacity-50"
              />

              <button
                type="submit"
                disabled={!message.trim() || loading}
                className="flex items-center justify-center flex-shrink-0 w-11 h-11 text-white bg-emerald-600 rounded-xl hover:bg-emerald-500 disabled:bg-slate-800 disabled:text-slate-600 disabled:cursor-not-allowed transition shadow-lg shadow-emerald-950/20"
                title="Send message"
              >
                {loading ? "⏳" : "➤"}
              </button>

            </div>

            <p className="mt-2 text-xs text-center text-slate-500">
              Press Enter to send • Shift + Enter for a new line
            </p>

          </form>

        </div>

      </footer>

    </div>
  );
};

export default AIChat;