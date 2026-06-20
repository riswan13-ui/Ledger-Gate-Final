import React, { useState } from "react";
import { ShieldCheck, CircleCheck, Mail, Lock, Eye, EyeOff, User, Building2 } from "lucide-react";
import { tokens as F, fonts } from "../../design-system/tokens";
import { GlobalStyles } from "../../design-system";
import { Button, IconButton } from "../../design-system/Button";
import { TextField } from "../../design-system/FormControls";

const PITCH_POINTS = [
  "Live compliance gate on every invoice",
  "Natural-language Q&A across your whole portfolio",
  "Data-backed renewal briefs before every expiry",
];

export default function AuthScreen({ mode, setMode, onAuth, onSkip }) {
  const isSignup = mode === "signup";
  const [showPw, setShowPw] = useState(false);
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = () => {
    setBusy(true);
    setTimeout(() => { setBusy(false); onAuth(isSignup); }, 700);
  };

  return (
    <div className="clm-auth-shell" style={{ display: "flex", minHeight: "100vh", background: F.surface, fontFamily: fonts.body }}>
      <GlobalStyles />
      {/* left brand panel */}
      <div className="clm-auth-brand" style={{ flex: "1 1 46%", background: F.canvas, borderRight: `1px solid ${F.line}`, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "44px 48px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
          <div style={{ width: 34, height: 34, borderRadius: F.rSm, background: F.ink, display: "grid", placeItems: "center" }}>
            <ShieldCheck size={19} color="#fff" strokeWidth={2.3} />
          </div>
          <span style={{ fontFamily: fonts.body, fontSize: 16, fontWeight: 600, color: F.ink }}>Ledger Gate</span>
        </div>

        <div className="clm-auth-pitch" style={{ maxWidth: 420 }}>
          <h1 style={{ fontFamily: fonts.display, fontSize: 34, fontWeight: 600, color: F.ink, lineHeight: 1.18, margin: "0 0 16px", letterSpacing: "-0.01em" }}>
            Every invoice, checked against every contract — before a dollar leaves.
          </h1>
          <p style={{ fontSize: 15, color: F.ink2, lineHeight: 1.6, margin: 0 }}>
            Ledger Gate intercepts invoices before payment and validates them in real time against your contracted terms.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 28 }}>
            {PITCH_POINTS.map((t) => (
              <div key={t} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <CircleCheck size={18} color={F.green} strokeWidth={2} />
                <span style={{ fontSize: 14, color: F.ink2 }}>{t}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ display: "flex" }}>
            {["#E9F4E2", "#EDF2FD", "#FAF1DE", "#F0ECFB"].map((c, i) => (
              <div key={i} style={{ width: 26, height: 26, borderRadius: 999, background: c, border: `2px solid ${F.canvas}`, marginLeft: i ? -8 : 0 }} />
            ))}
          </div>
          <span style={{ fontSize: 13, color: F.ink3 }}>Trusted by finance &amp; legal-ops teams</span>
        </div>
      </div>

      {/* right form panel */}
      <div style={{ flex: "1 1 54%", display: "flex", alignItems: "center", justifyContent: "center", padding: "44px 32px" }}>
        <div style={{ width: "100%", maxWidth: 380 }}>
          <h2 style={{ fontFamily: fonts.display, fontSize: 26, fontWeight: 600, color: F.ink, margin: "0 0 6px", letterSpacing: "-0.01em" }}>
            {isSignup ? "Create your account" : "Welcome back"}
          </h2>
          <p style={{ fontSize: 14.5, color: F.ink3, margin: "0 0 26px" }}>
            {isSignup ? "Start your 14-day trial — no card required." : "Sign in to your compliance workspace."}
          </p>

          <Button variant="outline" fullWidth style={{ marginBottom: 16, padding: "11px 0" }}>
            <span style={{ fontFamily: fonts.body, fontWeight: 700, fontSize: 15 }}>G</span> Continue with Google
          </Button>

          <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "4px 0 18px" }}>
            <div style={{ flex: 1, height: 1, background: F.line }} />
            <span style={{ fontSize: 12, color: F.ink4 }}>or</span>
            <div style={{ flex: 1, height: 1, background: F.line }} />
          </div>

          {isSignup && (
            <div style={{ marginBottom: 14 }}>
              <TextField label="Full name" Icon={User} value={name} onChange={setName} placeholder="Dana Whitfield" />
            </div>
          )}
          {isSignup && (
            <div style={{ marginBottom: 14 }}>
              <TextField label="Company" Icon={Building2} value={company} onChange={setCompany} placeholder="Northgate Inc." />
            </div>
          )}
          <div style={{ marginBottom: 14 }}>
            <TextField label="Work email" Icon={Mail} value={email} onChange={setEmail} placeholder="you@company.com" type="email" />
          </div>
          <div style={{ marginBottom: isSignup ? 20 : 10 }}>
            <TextField
              label="Password"
              Icon={Lock}
              value={pw}
              onChange={setPw}
              placeholder="••••••••"
              type={showPw ? "text" : "password"}
              suffix={<IconButton Icon={showPw ? EyeOff : Eye} variant="plain" size={28} ariaLabel={showPw ? "Hide password" : "Show password"} onClick={() => setShowPw((v) => !v)} />}
            />
          </div>

          {!isSignup && (
            <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 18 }}>
              <Button variant="plain" size="sm">Forgot password?</Button>
            </div>
          )}

          <Button variant="solid" fullWidth size="lg" loading={busy} onClick={submit} style={{ padding: "12px 0" }}>
            {isSignup ? "Create account" : "Sign in"}
          </Button>

          {isSignup && (
            <p style={{ fontSize: 12, color: F.ink4, textAlign: "center", margin: "14px 0 0", lineHeight: 1.5 }}>
              By creating an account you agree to our Terms and Privacy Policy.
            </p>
          )}

          <div style={{ textAlign: "center", marginTop: 22, fontSize: 14, color: F.ink3 }}>
            {isSignup ? "Already have an account? " : "New to Ledger Gate? "}
            <Button variant="plain" tone="ink" style={{ fontSize: 14, fontWeight: 600, color: F.ink, display: "inline-flex" }} onClick={() => setMode(isSignup ? "login" : "signup")}>
              {isSignup ? "Sign in" : "Create an account"}
            </Button>
          </div>

          <div style={{ textAlign: "center", marginTop: 16 }}>
            <Button variant="plain" tone="ink" style={{ fontSize: 13, color: F.ink4, fontWeight: 500 }} onClick={onSkip}>
              Skip to demo →
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
