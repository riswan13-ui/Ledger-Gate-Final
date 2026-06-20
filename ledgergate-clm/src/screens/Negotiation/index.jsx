import React, { useState } from "react";
import RenewalsList from "./RenewalsList";
import RenewalBrief from "./RenewalBrief";

export default function NegotiationScreen() {
  const [selected, setSelected] = useState(null);
  if (selected) return <RenewalBrief renewal={selected} back={() => setSelected(null)} />;
  return <RenewalsList onOpen={setSelected} />;
}
