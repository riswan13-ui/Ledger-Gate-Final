import React, { useState, useRef, useEffect } from "react";
import { Plus, Layers, ChevronDown, ArrowUp } from "lucide-react";
import { tokens as F, fonts } from "../../design-system/tokens";
import { IconButton } from "../../design-system/Button";
import { CHAT_SESSIONS, SEED_THREAD, FOLLOW_UP_REPLY } from "../../data/chat";
import Message, { AgentAvatar } from "./Message";
import SourceDrawer from "./SourceDrawer";

export default function ChatScreen() {
  const [thread, setThread] = useState(SEED_THREAD);
  const [draft, setDraft] = useState("");
  const [openDoc, setOpenDoc] = useState(null);
  const [thinking, setThinking] = useState(false);
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [thread, thinking]);

  const send = () => {
    const q = draft.trim();
    if (!q) return;
    setThread((t) => [...t, { role: "user", text: q }]);
    setDraft("");
    setThinking(true);
    setTimeout(() => {
      setThinking(false);
      setThread((t) => [...t, FOLLOW_UP_REPLY]);
    }, 1100);
  };

  return (
    <div style={{ display: "flex", height: "100%", minHeight: 0, background: F.surface, fontFamily: fonts.body }}>
      {/* history sidebar */}
      <div className="clm-chat-history" style={{ width: 264, flexShrink: 0, borderRight: `1px solid ${F.line}`, background: F.paper, display: "flex", flexDirection: "column" }}>
        <div style={{ padding: "20px 16px 14px" }}>
          <button
            className="clm-press"
            style={{ width: "100%", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "10px 0", borderRadius: F.rSm, border: `1px solid ${F.line}`, background: F.surface, color: F.ink, fontFamily: fonts.body, fontSize: 14, fontWeight: 500, cursor: "pointer" }}
          >
            <Plus size={16} strokeWidth={2.2} /> New question
          </button>
        </div>
        <div style={{ padding: "0 18px 10px", fontSize: 11.5, color: F.ink3, fontWeight: 500 }}>History</div>
        <div className="clm-scroll" style={{ overflowY: "auto", padding: "0 10px 16px", display: "flex", flexDirection: "column", gap: 1 }}>
          {CHAT_SESSIONS.map((s) => (
            <button
              key={s.id}
              className="clm-linear-card"
              style={{ textAlign: "left", display: "flex", flexDirection: "column", gap: 2, padding: "9px 12px", borderRadius: F.rSm, border: "1px solid transparent", cursor: "pointer", background: s.active ? F.hover : "transparent" }}
            >
              <span style={{ fontFamily: fonts.body, fontSize: 13.5, fontWeight: s.active ? 600 : 500, color: s.active ? F.ink : F.ink2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: 210 }}>
                {s.title}
              </span>
              <span style={{ fontFamily: fonts.body, fontSize: 11.5, color: F.ink3 }}>{s.when}</span>
            </button>
          ))}
        </div>
      </div>

      {/* thread */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        <div className="clm-chat-pad" style={{ padding: "16px 24px", borderBottom: `1px solid ${F.line}`, display: "flex", alignItems: "center", gap: 10 }}>
          <AgentAvatar />
          <div>
            <div style={{ fontFamily: fonts.body, fontSize: 15, fontWeight: 600, color: F.ink }}>Contract Q&amp;A</div>
            <div style={{ fontFamily: fonts.body, fontSize: 12, color: F.ink3 }}>Answers from the live CES · amendment-aware</div>
          </div>
        </div>

        <div className="clm-scroll clm-chat-pad" style={{ flex: 1, overflowY: "auto", padding: "24px 24px 8px" }}>
          <div style={{ maxWidth: 720, margin: "0 auto", display: "flex", flexDirection: "column", gap: 22 }}>
            {thread.map((m, i) => (
              <Message key={i} m={m} onCite={setOpenDoc} />
            ))}
            {thinking && (
              <div style={{ display: "flex", gap: 12 }}>
                <AgentAvatar />
                <div style={{ display: "flex", alignItems: "center", gap: 5, padding: "14px 16px", background: F.paper, borderRadius: F.r, border: `1px solid ${F.line}` }}>
                  {[0, 1, 2].map((d) => (
                    <span key={d} style={{ width: 7, height: 7, borderRadius: 999, background: F.ink3, opacity: 0.5, animation: `clmpulse 1s ${d * 0.15}s infinite` }} />
                  ))}
                </div>
              </div>
            )}
            <div ref={endRef} />
          </div>
        </div>

        {/* composer */}
        <div className="clm-chat-pad" style={{ padding: "12px 24px 22px" }}>
          <div style={{ maxWidth: 720, margin: "0 auto", background: F.surface, border: `1px solid ${F.line}`, borderRadius: F.r, padding: "12px 12px 10px 16px", boxShadow: "0 1px 2px rgba(16,16,26,.04), 0 4px 16px -10px rgba(16,16,26,.06)" }}>
            <textarea
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              rows={1}
              onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
              placeholder="Ask a follow-up…"
              aria-label="Ask a question"
              style={{ width: "100%", border: "none", outline: "none", resize: "none", fontFamily: fonts.body, fontSize: 15, color: F.ink, lineHeight: 1.5, background: "transparent", padding: "2px 0 10px", maxHeight: 140 }}
            />
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <button
                className="clm-press"
                style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "6px 11px", borderRadius: F.rSm, border: `1px solid ${F.line}`, background: F.surface, color: F.ink2, fontFamily: fonts.body, fontSize: 13, fontWeight: 500, cursor: "pointer" }}
              >
                <Layers size={14} color={F.ink3} /> Skills <ChevronDown size={13} color={F.ink4} />
              </button>
              <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 6 }}>
                <IconButton Icon={Plus} variant="plain" size={30} ariaLabel="Attach file" />
                <button
                  onClick={send}
                  className="clm-press"
                  aria-label="Send"
                  style={{
                    width: 30, height: 30, borderRadius: F.rSm, border: `1px solid ${F.line}`,
                    background: draft.trim() ? F.ink : F.surface, color: draft.trim() ? "#fff" : F.ink4,
                    display: "grid", placeItems: "center", cursor: draft.trim() ? "pointer" : "default",
                  }}
                >
                  <ArrowUp size={16} strokeWidth={2.3} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* source document drawer */}
      {openDoc && <SourceDrawer cite={openDoc} onClose={() => setOpenDoc(null)} />}
    </div>
  );
}
