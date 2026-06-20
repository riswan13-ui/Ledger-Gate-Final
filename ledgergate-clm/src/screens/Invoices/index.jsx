import React, { useState } from "react";
import InvoiceQueue from "./InvoiceQueue";
import AuditReport from "./AuditReport";

export default function InvoicesScreen() {
  const [selected, setSelected] = useState(null);
  if (selected) return <AuditReport invoice={selected} back={() => setSelected(null)} />;
  return <InvoiceQueue onOpen={setSelected} />;
}
