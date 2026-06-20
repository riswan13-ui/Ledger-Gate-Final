import React, { useState } from "react";
import { Clock, X } from "lucide-react";
import { tokens as F, fonts } from "./design-system/tokens";
import { GlobalStyles } from "./design-system";
import { Button } from "./design-system/Button";
import { useViewport } from "./hooks";

import Sidebar from "./layout/Sidebar";
import TopBar from "./layout/TopBar";
import NotificationsPanel from "./layout/NotificationsPanel";

import HomeScreen from "./screens/Home";
import ConnectorsScreen from "./screens/Connectors";
import ContractsScreen from "./screens/Contracts";
import InvoicesScreen from "./screens/Invoices";
import ChatScreen from "./screens/Chat";
import NegotiationScreen from "./screens/Negotiation";
import AdminScreen from "./screens/Admin";
import AuthScreen from "./screens/Auth";
import OnboardingWizard from "./screens/Onboarding";

export default function App() {
  const [appView, setAppView] = useState("app"); // "auth" | "onboarding" | "app"
  const [authMode, setAuthMode] = useState("login");
  const [route, setRoute] = useState(() => (typeof window !== "undefined" && window.location.hash) ? window.location.hash.slice(1) : "home");
  const [showTrial, setShowTrial] = useState(true);
  const [notifOpen, setNotifOpen] = useState(false);
  const [unread, setUnread] = useState(3);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const bp = useViewport();
  const go = (r) => { setRoute(r); if (bp !== "desktop") setSidebarOpen(false); };
  const chatFull = route === "chat";

  // Auth flow (standalone — app still opens directly by default)
  if (appView === "auth") {
    return (
      <AuthScreen
        mode={authMode}
        setMode={setAuthMode}
        onAuth={(isSignup) => setAppView(isSignup ? "onboarding" : "app")}
        onSkip={() => setAppView("app")}
      />
    );
  }
  if (appView === "onboarding") {
    return <OnboardingWizard onDone={() => { setAppView("app"); setRoute("home"); }} />;
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: F.canvas, fontFamily: fonts.body, color: F.ink }}>
      <GlobalStyles />

      <Sidebar route={route} go={go} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} onOpenAuth={() => setAppView("auth")} />

      {/* Main column */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0, height: "100vh" }}>
        <TopBar
          onOpenNotifs={() => { setNotifOpen(true); setUnread(0); }}
          unread={unread}
          onSignOut={() => { setAuthMode("login"); setAppView("auth"); }}
          go={go}
          onOpenSidebar={() => setSidebarOpen(true)}
        />

        {/* trial banner */}
        {showTrial && (
          <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 8, background: F.amberSoft, borderBottom: `1px solid ${F.line}`, padding: "10px 16px", flexShrink: 0 }}>
            <Clock size={16} color={F.amber} strokeWidth={2.2} style={{ flexShrink: 0 }} />
            <span style={{ fontFamily: fonts.body, fontSize: 13.5, color: F.ink, fontWeight: 600 }}>Trial ends in 6 days</span>
            <span style={{ fontFamily: fonts.body, fontSize: 13.5, color: F.ink2 }}>— upgrade to keep your compliance gate online</span>
            <Button variant="solid" size="sm" style={{ marginLeft: "auto" }}>Upgrade now</Button>
            <button
              onClick={() => setShowTrial(false)}
              aria-label="Dismiss"
              className="clm-press"
              style={{ width: 26, height: 26, borderRadius: F.rXs, border: "none", background: "transparent", color: F.ink3, display: "grid", placeItems: "center", cursor: "pointer", flexShrink: 0 }}
            >
              <X size={15} />
            </button>
          </div>
        )}

        {/* content */}
        <main
          className="clm-scroll clm-main-pad"
          style={{ flex: 1, overflowY: "auto", overflowX: "hidden", padding: chatFull ? 0 : undefined, background: route === "home" || route === "chat" ? F.canvas : F.paper }}
        >
          {route === "home" && <HomeScreen go={go} />}
          {route === "connectors" && <ConnectorsScreen />}
          {route === "contracts" && <ContractsScreen />}
          {route === "invoices" && <InvoicesScreen />}
          {route === "chat" && <ChatScreen />}
          {route === "negotiation" && <NegotiationScreen />}
          {route === "admin" && <AdminScreen />}
        </main>
      </div>

      {notifOpen && <NotificationsPanel onClose={() => setNotifOpen(false)} go={go} />}
    </div>
  );
}
