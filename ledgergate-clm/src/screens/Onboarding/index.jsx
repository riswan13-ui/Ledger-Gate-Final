import React, { useState } from "react";
import { ShieldCheck, Check, ChevronLeft, ArrowRight, Upload, CircleCheck, Loader, Clock, Plus } from "lucide-react";
import { tokens as F, fonts } from "../../design-system/tokens";
import { GlobalStyles } from "../../design-system";
import { Button } from "../../design-system/Button";

const STEPS = ["Connect contracts", "Connect AP & ERP", "Review & finish"];

const SOURCE_GROUPS = [
  { title: "Contracts & e-sign", items: ["Ironclad", "SpotDraft", "DocuSign"] },
  { title: "AP & ERP", items: ["Coupa", "SAP Ariba", "NetSuite", "SAP S/4HANA"] },
  { title: "Document stores", items: ["SharePoint", "Google Drive"] },
];
const STEP_GROUPS = [[SOURCE_GROUPS[0], SOURCE_GROUPS[2]], [SOURCE_GROUPS[1]], []];

const FINISH_TASKS = ["Ingesting contracts & building CES", "Syncing vendor master & POs", "Arming the invoice compliance gate"];

export default function OnboardingWizard({ onDone }) {
  const [step, setStep] = useState(0);
  const [connected, setConnected] = useState(() => new Set());

  const toggle = (name) => setConnected((s) => { const n = new Set(s); n.has(name) ? n.delete(name) : n.add(name); return n; });

  return (
    <div style={{ minHeight: "100vh", background: F.canvas, fontFamily: fonts.body, display: "flex", flexDirection: "column" }}>
      <GlobalStyles />
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 28px", borderBottom: `1px solid ${F.line}`, background: F.surface }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 30, height: 30, borderRadius: F.rSm, background: F.ink, display: "grid", placeItems: "center" }}>
            <ShieldCheck size={17} color="#fff" strokeWidth={2.3} />
          </div>
          <span style={{ fontSize: 15, fontWeight: 600, color: F.ink }}>Ledger Gate</span>
        </div>
        <Button variant="plain" tone="ink" style={{ fontSize: 13.5, color: F.ink3 }} onClick={onDone}>Skip setup →</Button>
      </div>

      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", padding: "48px 24px" }}>
        <div style={{ width: "100%", maxWidth: 720 }}>
          {/* stepper */}
          <div style={{ display: "flex", alignItems: "center", gap: 0, marginBottom: 36 }}>
            {STEPS.map((s, i) => (
              <React.Fragment key={s}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div
                    style={{
                      width: 28, height: 28, borderRadius: 999, display: "grid", placeItems: "center", flexShrink: 0,
                      background: i < step ? F.green : i === step ? F.ink : F.chip,
                      color: i <= step ? "#fff" : F.ink3, fontSize: 13, fontWeight: 600,
                    }}
                  >
                    {i < step ? <Check size={15} strokeWidth={3} /> : i + 1}
                  </div>
                  <span style={{ fontSize: 13.5, fontWeight: i === step ? 600 : 500, color: i === step ? F.ink : F.ink3, whiteSpace: "nowrap" }}>{s}</span>
                </div>
                {i < STEPS.length - 1 && <div style={{ flex: 1, height: 1, background: F.line, margin: "0 16px" }} />}
              </React.Fragment>
            ))}
          </div>

          <div style={{ background: F.surface, border: `1px solid ${F.line}`, borderRadius: F.r, padding: 32 }}>
            {step < 2 ? (
              <>
                <h2 style={{ fontFamily: fonts.display, fontSize: 24, fontWeight: 600, color: F.ink, margin: "0 0 8px", letterSpacing: "-0.01em" }}>
                  {step === 0 ? "Where do your contracts live?" : "Connect AP & ERP"}
                </h2>
                <p style={{ fontSize: 14.5, color: F.ink3, margin: "0 0 24px", lineHeight: 1.55 }}>
                  {step === 0
                    ? "Connect your CLMs, e-signature, and document stores. We'll ingest every contract and build the Contract Effective State."
                    : "Connect your AP and ERP systems so we can audit invoices and pull vendor, PO, and transaction data."}
                </p>
                {STEP_GROUPS[step].map((grp) => (
                  <div key={grp.title} style={{ marginBottom: 22 }}>
                    <div style={{ fontSize: 11.5, fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase", color: F.ink4, marginBottom: 12 }}>{grp.title}</div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 10 }}>
                      {grp.items.map((name) => {
                        const tint = F.brand[name] || { fg: F.ink2, bg: F.chip };
                        const on = connected.has(name);
                        return (
                          <button
                            key={name}
                            onClick={() => toggle(name)}
                            className="clm-press"
                            style={{ display: "flex", alignItems: "center", gap: 11, padding: "12px 14px", borderRadius: F.rSm, border: `1px solid ${on ? F.ink : F.line}`, background: on ? F.hover : F.surface, cursor: "pointer", textAlign: "left" }}
                          >
                            <div style={{ width: 32, height: 32, borderRadius: F.rXs, background: tint.bg, display: "grid", placeItems: "center", flexShrink: 0, fontFamily: fonts.display, fontWeight: 700, fontSize: 14, color: tint.fg }}>
                              {name[0]}
                            </div>
                            <span style={{ flex: 1, fontSize: 13.5, fontWeight: 500, color: F.ink }}>{name}</span>
                            {on ? <CircleCheck size={18} color={F.green} strokeWidth={2} /> : <Plus size={16} color={F.ink3} />}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
                <div style={{ display: "flex", alignItems: "center", gap: 9, padding: "12px 14px", borderRadius: F.rSm, border: `1px dashed ${F.line}`, marginTop: 4 }}>
                  <Upload size={16} color={F.ink3} />
                  <span style={{ fontSize: 13.5, color: F.ink2 }}>Or upload contract PDFs / DOCX manually</span>
                </div>
              </>
            ) : (
              <>
                <div style={{ width: 52, height: 52, borderRadius: 999, background: F.greenSoft, display: "grid", placeItems: "center", margin: "0 auto 18px" }}>
                  <CircleCheck size={28} color={F.green} strokeWidth={2} />
                </div>
                <h2 style={{ fontFamily: fonts.display, fontSize: 24, fontWeight: 600, color: F.ink, margin: "0 0 8px", textAlign: "center", letterSpacing: "-0.01em" }}>
                  You're all set
                </h2>
                <p style={{ fontSize: 14.5, color: F.ink3, margin: "0 auto 22px", lineHeight: 1.55, textAlign: "center", maxWidth: 440 }}>
                  {connected.size > 0
                    ? `${connected.size} source${connected.size === 1 ? "" : "s"} connected. We're ingesting your contracts and building the Contract Effective State now.`
                    : "You can connect sources anytime from the Connectors screen. We'll start with manual uploads."}
                </p>
                <div style={{ background: F.canvas, border: `1px solid ${F.line}`, borderRadius: F.rSm, padding: 16, maxWidth: 440, margin: "0 auto" }}>
                  {FINISH_TASKS.map((t, i) => (
                    <div key={t} style={{ display: "flex", alignItems: "center", gap: 10, padding: "7px 0" }}>
                      {i === 0 ? <Loader size={16} className="clm-spin" color={F.ink2} /> : <Clock size={16} color={F.ink4} />}
                      <span style={{ fontSize: 13.5, color: i === 0 ? F.ink : F.ink3 }}>{t}</span>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 24 }}>
            <Button variant="outline" Icon={ChevronLeft} onClick={() => (step === 0 ? onDone() : setStep(step - 1))}>
              {step === 0 ? "Back" : "Previous"}
            </Button>
            <Button
              variant="solid"
              Icon={step < 2 ? ArrowRight : undefined}
              iconPosition="right"
              onClick={() => (step === 2 ? onDone() : setStep(step + 1))}
            >
              {step === 2 ? "Go to dashboard" : step === 0 && connected.size === 0 ? "Skip for now" : "Continue"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
