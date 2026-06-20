import React, { useState } from "react";
import { ChevronLeft, ShieldCheck, CircleAlert, CheckCircle2, AlertTriangle, XCircle, Clock, Quote, Check, Send, ShieldAlert } from "lucide-react";
import { tokens as F, fonts } from "../../design-system/tokens";
import { Eyebrow } from "../../design-system/ScreenHeader";
import { VerdictBadge } from "../../design-system/Badge";
import { Panel } from "../../design-system/Panel";
import { LabelValue } from "../../design-system/Stats";
import { Button } from "../../design-system/Button";
import { ConfirmDialog } from "../../design-system/Overlay";
import { AUDIT_CHECKS, DEFAULT_AUDIT } from "../../data/invoices";
import { fmtFullMoney } from "../../utils/format";

const VERDICT_ICON_BG = { Cleared: F.greenSoft, Flagged: F.amberSoft, Rejected: F.redSoft, Pending: F.chip };

/* DeltaCell — one cell of the 3-up "Contracted / Billed / Delta" grid on
 * a finding. Specific enough to this layout that it stays local rather
 * than joining the shared design system. */
function DeltaCell({ label, value, billed, delta }) {
  const color = delta ? F.red : billed ? F.ink : F.ink2;
  return (
    <div style={{ background: F.surface, padding: "10px 12px" }}>
      <div style={{ fontFamily: fonts.body, fontSize: 11, color: F.ink3, marginBottom: 4 }}>{label}</div>
      <div className="num" style={{ fontSize: 13.5, color, fontWeight: 600 }}>{value || "—"}</div>
    </div>
  );
}

export default function AuditReport({ invoice, back }) {
  const audit = AUDIT_CHECKS[invoice.id] || DEFAULT_AUDIT;
  const [decision, setDecision] = useState(null); // 'accept' | 'dispute' | 'override'
  const [confirm, setConfirm] = useState(null); // pending action awaiting confirm
  const findings = audit.modules.flatMap((m) => m.checks.filter((c) => !c.pass).map((c) => ({ ...c, module: m.name })));

  const act = (kind) => {
    if (kind === "override") { setConfirm("override"); return; } // destructive-ish → confirm
    setDecision(kind);
  };

  return (
    <div style={{ maxWidth: 1080, margin: "0 auto", padding: "8px 4px 64px" }}>
      <button
        onClick={back}
        className="clm-press"
        style={{ display: "inline-flex", alignItems: "center", gap: 7, background: "none", border: "none", cursor: "pointer", fontFamily: fonts.body, fontSize: 13.5, color: F.ink3, fontWeight: 600, padding: "4px 0", marginBottom: 14 }}
      >
        <ChevronLeft size={16} /> Invoices
      </button>

      {/* verdict summary */}
      <div style={{ background: F.surface, border: `1px solid ${F.line}`, borderRadius: F.r, padding: 22, marginBottom: 18 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 16 }}>
          <div>
            <Eyebrow>Audit report</Eyebrow>
            <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "12px 0 6px" }}>
              <h1 className="num" style={{ fontFamily: fonts.mono, fontSize: 26, fontWeight: 600, color: F.ink, margin: 0 }}>{invoice.id}</h1>
              <VerdictBadge state={invoice.verdict} size="lg" />
            </div>
            <div style={{ display: "flex", gap: 18, flexWrap: "wrap", marginTop: 8 }}>
              <LabelValue label="Vendor" value={invoice.vendor} />
              <LabelValue label="Amount" value={fmtFullMoney(invoice.amount)} mono />
              <LabelValue label="Received" value={invoice.date} mono />
              <LabelValue label="Checks run" value={`${invoice.checks} applicable`} mono />
            </div>
          </div>
          <div style={{ width: 56, height: 56, borderRadius: F.rSm, display: "grid", placeItems: "center", flexShrink: 0, background: VERDICT_ICON_BG[invoice.verdict] }}>
            {invoice.verdict === "Cleared" && <CheckCircle2 size={28} color={F.green} strokeWidth={2.2} />}
            {invoice.verdict === "Flagged" && <AlertTriangle size={28} color={F.amber} strokeWidth={2.2} />}
            {invoice.verdict === "Rejected" && <XCircle size={28} color={F.red} strokeWidth={2.2} />}
            {invoice.verdict === "Pending" && <Clock size={28} color={F.ink3} strokeWidth={2.2} />}
          </div>
        </div>
        <p style={{ fontFamily: fonts.body, fontSize: 14.5, color: F.ink2, margin: "16px 0 0", lineHeight: 1.55, maxWidth: 720 }}>{audit.summary}</p>
      </div>

      <div className="clm-detail-2col" style={{ gridTemplateColumns: "minmax(320px, 1.1fr) minmax(300px, 1fr)", alignItems: "start" }}>
        {/* checks run */}
        <Panel title="Checks run" Icon={ShieldCheck} hint={`${invoice.checks} applicable of 37`}>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {audit.modules.map((m) => (
              <div key={m.name}>
                <div style={{ fontFamily: fonts.mono, fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", color: F.ink3, fontWeight: 600, marginBottom: 8 }}>{m.name}</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  {m.checks.map((c) => (
                    <div key={c.n} style={{ display: "flex", alignItems: "center", gap: 9, padding: "7px 8px", borderRadius: F.rSm, background: c.pass ? "transparent" : F.redSoft + "80" }}>
                      {c.pass ? <Check size={15} color={F.green} strokeWidth={2.6} style={{ flexShrink: 0 }} /> : <XCircle size={15} color={F.red} strokeWidth={2.4} style={{ flexShrink: 0 }} />}
                      <span style={{ fontFamily: fonts.body, fontSize: 13.5, color: c.pass ? F.ink2 : F.ink, fontWeight: c.pass ? 400 : 600 }}>{c.n}</span>
                      {!c.pass && c.sev && (
                        <span style={{ marginLeft: "auto", fontFamily: fonts.body, fontSize: 10.5, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.04em", color: c.sev === "high" ? F.red : F.amber }}>{c.sev}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Panel>

        {/* findings + actions */}
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <Panel title="Findings" Icon={CircleAlert} hint={`${findings.length} issue${findings.length === 1 ? "" : "s"}`}>
            {findings.length === 0 ? (
              <div style={{ padding: "20px 8px", textAlign: "center" }}>
                <CheckCircle2 size={26} color={F.green} style={{ marginBottom: 8 }} />
                <div style={{ fontFamily: fonts.body, fontSize: 14, color: F.ink2, fontWeight: 600 }}>No findings</div>
                <div style={{ fontFamily: fonts.body, fontSize: 13, color: F.ink3, marginTop: 4 }}>Every applicable check passed against the CES.</div>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {findings.map((f) => (
                  <div key={f.n} style={{ border: `1px solid ${F.line}`, borderRadius: F.r, overflow: "hidden" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 14px", background: F.redSoft + "66", borderBottom: `1px solid ${F.line}` }}>
                      <XCircle size={15} color={F.red} strokeWidth={2.4} />
                      <span style={{ fontFamily: fonts.body, fontSize: 13.5, fontWeight: 600, color: F.ink }}>{f.n}</span>
                      <span style={{ marginLeft: "auto", fontFamily: fonts.body, fontSize: 11.5, color: F.ink3 }}>{f.module}</span>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 1, background: F.lineSoft }}>
                      <DeltaCell label="Contracted" value={f.contracted} />
                      <DeltaCell label="Billed" value={f.billed} billed />
                      <DeltaCell label="Delta" value={f.delta} delta />
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "9px 14px", background: F.surface }}>
                      <Quote size={12} color={F.ink3} />
                      <span style={{ fontFamily: fonts.body, fontSize: 12, color: F.ink3 }}>Source: {f.clause}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Panel>

          {/* AP actions */}
          <section style={{ background: F.surface, border: `1px solid ${F.line}`, borderRadius: F.r, padding: 18 }}>
            <div style={{ fontFamily: fonts.display, fontSize: 15, fontWeight: 600, color: F.ink, marginBottom: 4 }}>AP decision</div>
            <div style={{ fontFamily: fonts.body, fontSize: 13, color: F.ink3, marginBottom: 14, lineHeight: 1.5 }}>
              Recorded with a reason code for the audit trail.
            </div>
            {decision ? (
              <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 14px", borderRadius: F.rSm, background: decision === "accept" ? F.greenSoft : decision === "dispute" ? F.amberSoft : F.chip }}>
                {decision === "accept" && (
                  <>
                    <CheckCircle2 size={18} color={F.green} />
                    <span style={{ fontFamily: fonts.body, fontSize: 13.5, color: F.ink, fontWeight: 600 }}>Findings accepted — routed to payment with adjustment.</span>
                  </>
                )}
                {decision === "dispute" && (
                  <>
                    <Send size={18} color={F.amber} />
                    <span style={{ fontFamily: fonts.body, fontSize: 13.5, color: F.ink, fontWeight: 600 }}>Dispute drafted with finding details — ready to send to vendor.</span>
                  </>
                )}
                {decision === "override" && (
                  <>
                    <ShieldAlert size={18} color={F.ink2} />
                    <span style={{ fontFamily: fonts.body, fontSize: 13.5, color: F.ink, fontWeight: 600 }}>Verdict overridden — released to payment queue with reason code.</span>
                  </>
                )}
                <Button variant="plain" size="sm" style={{ marginLeft: "auto", fontWeight: 600, textDecoration: "underline" }} onClick={() => setDecision(null)}>Undo</Button>
              </div>
            ) : (
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <Button variant="solid" Icon={Check} onClick={() => act("accept")}>Accept findings</Button>
                <Button variant="outline" Icon={Send} onClick={() => act("dispute")}>Draft dispute</Button>
                <Button variant="ghost" Icon={ShieldAlert} onClick={() => act("override")}>Override</Button>
              </div>
            )}
          </section>
        </div>
      </div>

      {/* override confirm dialog (destructive action confirmation) */}
      {confirm === "override" && (
        <ConfirmDialog
          Icon={ShieldAlert}
          title="Override the compliance verdict?"
          body={`This releases ${invoice.id} to the payment queue despite ${findings.length} open finding${findings.length === 1 ? "" : "s"}. The override and your reason code are written to the immutable audit trail.`}
          confirmLabel="Override and release"
          onCancel={() => setConfirm(null)}
          onConfirm={() => { setConfirm(null); setDecision("override"); }}
        />
      )}
    </div>
  );
}
