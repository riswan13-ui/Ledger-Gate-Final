import React, { useState } from "react";
import ContractsList from "./ContractsList";
import CESDetail from "./CESDetail";

export default function ContractsScreen() {
  const [selected, setSelected] = useState(null);
  if (selected) return <CESDetail contract={selected} back={() => setSelected(null)} />;
  return <ContractsList onOpen={setSelected} />;
}
