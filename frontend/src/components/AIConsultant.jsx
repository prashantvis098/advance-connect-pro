import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X, Send, MessageCircle, CalendarCheck } from "lucide-react";
import { BUSINESS } from "../config/business";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const SUGGESTIONS = [
  "How can you grow my Amazon sales?",
  "What does the free audit include?",
  "Do you manage Flipkart & Meesho too?",
  "How does your pricing work?",
];

const sid = () => `web-${Math.random().toString(36).slice(2, 10)}-${Date.now().toString(36)}`;

export const AIConsultant = ({ onBookAudit }) => {
  const [open, setOpen] = useState(false);
  const [sessionId] = useState(sid);
  const [messages, setMessages] = useState([
    { role: "assistant", text: "Hi! I'm the Advance Connect marketplace consultant. Ask me anything about growing your business on Amazon, Flipkart or Meesho." },
  ]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  const send = async (text) => {
    const msg = (text || input).trim();
    if (!msg || streaming) return;
    setInput("");
    setMessages((m) => [...m, { role: "user", text: msg }, { role: "assistant", text: "", pending: true }]);
    setStreaming(true);
    try {
      const res = await fetch(`${API}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ session_id: sessionId, message: msg }),
      });
      if (!res.ok) throw new Error("chat failed");
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = "";
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        setMessages((m) => {
          const copy = [...m];
          copy[copy.length - 1] = { role: "assistant", text: acc, pending: false };
          return copy;
        });
      }
    } catch (e) {
      setMessages((m) => {
        const copy = [...m];
        copy[copy.length - 1] = {
          role: "assistant",
          text: `I'm having trouble connecting right now. WhatsApp us directly at ${BUSINESS.phone} — we reply fast.`,
        };
        return copy;
      });
    } finally {
      setStreaming(false);
    }
  };

  const showSuggestions = messages.length <= 1;

  return (
    <>
      <motion.button
        data-testid="ai-consultant-launcher"
        onClick={() => setOpen(!open)}
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.2, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        className="ai-launcher"
        aria-label="Open AI marketplace consultant"
      >
        {open ? <X size={22} /> : <Sparkles size={22} />}
        {!open && <span className="ai-launcher-ping" aria-hidden="true" />}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            data-testid="ai-consultant-panel"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="ai-panel"
          >
            <div className="ai-header">
              <span className="ai-avatar font-heading">AC</span>
              <div className="flex-1 min-w-0">
                <p className="font-heading font-bold text-white text-sm leading-tight">Marketplace Consultant</p>
                <p className="text-[11px] text-slate-400 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" /> Advance Connect AI · Online
                </p>
              </div>
            </div>

            <div className="ai-messages" data-testid="ai-messages">
              {messages.map((m, i) => (
                <div key={i} className={`ai-bubble ${m.role === "user" ? "ai-bubble-user" : "ai-bubble-bot"}`}>
                  {m.pending && !m.text ? (
                    <span className="ai-typing"><span /><span /><span /></span>
                  ) : (
                    <>
                      {m.text}
                      {m.role === "assistant" && streaming && i === messages.length - 1 && <span className="ai-cursor" />}
                    </>
                  )}
                </div>
              ))}
              {showSuggestions && (
                <div className="flex flex-wrap gap-2 mt-2" data-testid="ai-suggestions">
                  {SUGGESTIONS.map((s) => (
                    <button key={s} className="ai-chip" onClick={() => send(s)} data-testid={`ai-suggestion-${SUGGESTIONS.indexOf(s)}`}>
                      {s}
                    </button>
                  ))}
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            <div className="ai-input-row">
              <input
                data-testid="ai-chat-input"
                className="ai-input"
                placeholder="Ask about your marketplace…"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send()}
                disabled={streaming}
              />
              <button className="ai-send" onClick={() => send()} disabled={streaming} data-testid="ai-chat-send" aria-label="Send message">
                <Send size={16} />
              </button>
            </div>

            <div className="ai-ctas">
              <button
                data-testid="ai-book-consultation-cta"
                className="ai-cta-primary"
                onClick={() => { setOpen(false); onBookAudit(); }}
              >
                <CalendarCheck size={15} /> Book Consultation
              </button>
              <a
                data-testid="ai-whatsapp-cta"
                href={BUSINESS.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="ai-cta-whatsapp"
              >
                <MessageCircle size={15} /> WhatsApp
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
