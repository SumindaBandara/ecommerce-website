import React, { useState } from "react";
import { Send, Bot, User, Zap, ShoppingBag, Star } from "lucide-react";

export default function AIProductFinder({ products }) {
  const [q, setQ] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);

  async function send() {
    if (!q.trim()) return;
    const userMsg = q.trim();
    setChat((c) => [...c, { from: "user", text: userMsg }]);
    setQ("");
    setLoading(true);

    try {
      const res = await fetch("https://storebackend-2.onrender.com/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: userMsg, products }),
      });
      const data = await res.json();

      const recommended = products.filter((p) =>
        data.recommendedIds?.includes(p._id)
      );

      setChat((c) => [
        ...c,
        { from: "bot", text: data.answer, recommended },
      ]);
    } catch (err) {
      console.error(err);
      setChat((c) => [
        ...c,
        { from: "bot", text: "⚠️ Network error", recommended: [] },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full bg-gradient-to-br from-indigo-50/95 via-white/95 to-cyan-50/95 backdrop-blur-xl border-0 shadow-2xl shadow-indigo-500/10 rounded-lg sm:rounded-xl">
      {/* Header with animated gradient */}
      <div className="relative overflow-hidden rounded-t-lg sm:rounded-t-xl">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 opacity-10"></div>
        <div className="relative p-4 sm:p-6 pb-3 sm:pb-4">
          <div className="flex items-center gap-2 sm:gap-3 mb-1">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-full animate-pulse opacity-20"></div>
              <div className="relative bg-gradient-to-r from-indigo-500 to-cyan-500 p-1.5 sm:p-2 rounded-full">
                <Bot className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
              </div>
            </div>
            <div>
              <h2 className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
                AI Product Finder
              </h2>
              <div className="flex items-center gap-1 text-xs sm:text-sm text-gray-600">
                <Zap className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-yellow-500" />
                <span>Powered by advanced AI</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Container */}
      <div className="p-4 sm:p-6 pt-0 sm:pt-0">
        <div className="max-h-60 sm:max-h-80 overflow-auto mb-4 p-3 sm:p-4 bg-white/60 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-white/20 shadow-inner">
          <div className="space-y-3 sm:space-y-4">
            {chat.map((m, i) => (
              <div 
                key={i}
                className={`animate-in slide-in-from-bottom-2 duration-300 ${
                  m.from === "user" ? "flex justify-end" : "flex justify-start"
                }`}
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className={`max-w-[90%] sm:max-w-[85%] ${m.from === "user" ? "order-2" : "order-1"}`}>
                  {/* Message bubble */}
                  <div className={`flex items-start gap-2 sm:gap-3 ${m.from === "user" ? "flex-row-reverse" : "flex-row"}`}>
                    {/* Avatar */}
                    <div className={`flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center ${
                      m.from === "user" 
                        ? "bg-gradient-to-r from-indigo-500 to-purple-500" 
                        : "bg-gradient-to-r from-cyan-500 to-indigo-500"
                    }`}>
                      {m.from === "user" ? (
                        <User className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                      ) : (
                        <Bot className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                      )}
                    </div>

                    {/* Message content */}
                    <div className={`relative px-3 py-2 sm:px-4 sm:py-3 rounded-xl sm:rounded-2xl shadow-lg ${
                      m.from === "user"
                        ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white"
                        : "bg-white/80 backdrop-blur-sm border border-white/20 text-gray-800"
                    }`}>
                      <p className="text-xs sm:text-sm leading-relaxed">{m.text}</p>
                      
                      {/* Message tail */}
                      <div className={`absolute top-2 sm:top-3 w-0 h-0 ${
                        m.from === "user"
                          ? "right-[-4px] sm:right-[-6px] border-l-[4px] sm:border-l-[6px] border-l-purple-500 border-t-[4px] sm:border-t-[6px] border-t-transparent border-b-[4px] sm:border-b-[6px] border-b-transparent"
                          : "left-[-4px] sm:left-[-6px] border-r-[4px] sm:border-r-[6px] border-r-white border-t-[4px] sm:border-t-[6px] border-t-transparent border-b-[4px] sm:border-b-[6px] border-b-transparent"
                      }`}></div>
                    </div>
                  </div>

                  {/* Recommended products */}
                  {m.recommended && m.recommended.length > 0 && (
                    <div className="mt-3 sm:mt-4 space-y-2 sm:space-y-3">
                      <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm font-medium text-gray-600">
                        <ShoppingBag className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span>Recommended for you</span>
                      </div>
                      <div className="grid gap-2 sm:gap-3">
                        {m.recommended.map((p, idx) => (
                          <div
                            key={p._id}
                            className="group relative overflow-hidden bg-white/80 backdrop-blur-sm border border-white/20 rounded-lg sm:rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] cursor-pointer"
                            style={{ animationDelay: `${idx * 100}ms` }}
                          >
                            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 via-purple-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            
                            <div className="relative flex gap-3 sm:gap-4 p-3 sm:p-4">
                              <div className="relative overflow-hidden rounded-md sm:rounded-lg bg-gray-50 p-1.5 sm:p-2 group-hover:bg-white transition-colors duration-300">
                                <img
                                  src={p.image}
                                  alt={p.name}
                                  className="w-12 h-12 sm:w-16 sm:h-16 object-contain transition-transform duration-300 group-hover:scale-110"
                                />
                              </div>
                              
                              <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between gap-2">
                                  <h4 className="text-sm sm:text-base font-semibold text-gray-900 truncate group-hover:text-indigo-600 transition-colors duration-300">
                                    {p.name}
                                  </h4>
                                  <div className="flex items-center gap-1 text-yellow-500 flex-shrink-0">
                                    <Star className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-current" />
                                    <span className="text-xs text-gray-600">4.5</span>
                                  </div>
                                </div>
                                
                                <p className="text-xs sm:text-sm text-gray-600 mt-1 line-clamp-2">
                                  {p.description}
                                </p>
                                
                                <div className="flex items-center justify-between mt-2 sm:mt-3">
                                  <div className="text-lg sm:text-xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                                    ${p.price}
                                  </div>
                                  <div className="px-2 py-1 sm:px-3 sm:py-1 bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-xs font-medium rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    View Details
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start animate-in slide-in-from-bottom-2 duration-300">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-r from-cyan-500 to-indigo-500 flex items-center justify-center">
                    <Bot className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                  </div>
                  <div className="bg-white/80 backdrop-blur-sm border border-white/20 rounded-xl sm:rounded-2xl px-3 py-2 sm:px-4 sm:py-3 shadow-lg">
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1">
                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full animate-bounce"></div>
                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gradient-to-r from-cyan-500 to-indigo-500 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                      </div>
                      <span className="text-xs sm:text-sm text-gray-600">AI is thinking...</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {chat.length === 0 && (
              <div className="text-center py-6 sm:py-8 animate-in fade-in duration-500">
                <div className="mb-3 sm:mb-4">
                  <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-r from-indigo-100 to-cyan-100 mb-3 sm:mb-4">
                    <Bot className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-indigo-500 to-cyan-500 bg-clip-text text-transparent" />
                  </div>
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">
                  Ready to help you find the perfect product!
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">
                  Ask me about phones, earphones, speakers, or any electronics...
                </p>
                <div className="flex flex-wrap justify-center gap-1 sm:gap-2">
                  {["Latest smartphones", "Wireless earbuds", "Gaming laptops"].map((suggestion) => (
                    <button
                      key={suggestion}
                      onClick={() => setQ(suggestion)}
                      className="px-2 py-1 sm:px-3 sm:py-1 text-xs bg-gradient-to-r from-indigo-50 to-cyan-50 border border-indigo-200 rounded-full text-indigo-700 hover:from-indigo-100 hover:to-cyan-100 transition-colors duration-200"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Input Section */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-cyan-500/10 rounded-xl sm:rounded-2xl blur-xl"></div>
          <div className="relative bg-white/80 backdrop-blur-sm border border-white/20 rounded-xl sm:rounded-2xl shadow-xl p-2">
            <div className="flex gap-2 sm:gap-3">
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send()}
                className="flex-1 px-3 py-2 sm:px-4 sm:py-3 bg-transparent border-0 outline-none placeholder-gray-500 text-gray-800 text-sm"
                placeholder="Ask me anything about our products..."
              />
              <button
                onClick={send}
                disabled={loading}
                className="group relative overflow-hidden px-4 py-2 sm:px-6 sm:py-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 text-white rounded-lg sm:rounded-xl font-medium shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-105"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex items-center gap-1 sm:gap-2">
                  {loading ? (
                    <div className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    <Send className="w-3 h-3 sm:w-4 sm:h-4" />
                  )}
                  <span className="text-xs sm:text-sm">{loading ? "Asking..." : "Ask AI"}</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}