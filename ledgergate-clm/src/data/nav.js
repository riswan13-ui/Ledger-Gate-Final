import { Home, MessageSquare, FileText, FileStack, Handshake, Plug, Settings } from "lucide-react";

export const NAV_GROUPS = [
  {
    items: [
      { key: "home", label: "Home", Icon: Home },
      { key: "chat", label: "Ask Ledger Gate", Icon: MessageSquare },
    ],
  },
  {
    title: "Workspace",
    items: [
      { key: "contracts", label: "Contracts", Icon: FileText },
      { key: "invoices", label: "Invoices", Icon: FileStack },
      { key: "negotiation", label: "Renewals", Icon: Handshake },
    ],
  },
  {
    title: "Setup",
    items: [
      { key: "connectors", label: "Connectors", Icon: Plug },
      { key: "admin", label: "Settings", Icon: Settings },
    ],
  },
];
