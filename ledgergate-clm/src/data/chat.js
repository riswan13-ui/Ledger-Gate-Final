export const CHAT_SESSIONS = [
  { id: "s1", title: "Acme payment terms", when: "Today", active: true },
  { id: "s2", title: "Contracts expiring in Q3", when: "Today" },
  { id: "s3", title: "AWS liability cap history", when: "Yesterday" },
  { id: "s4", title: "Net 60 vendors comparison", when: "Mon" },
  { id: "s5", title: "Deloitte consultant rates", when: "Last week" },
];

export const SEED_THREAD = [
  { role: "user", text: "What are the payment terms for Acme Corp?" },
  {
    role: "agent",
    text: "Acme Corp is on Net 30 payment terms with a 2% early-payment discount if paid within 10 days. The Net 30 term reflects Amendment 2 — the original MSA specified Net 45.",
    amended: true,
    citations: [
      { doc: "Acme MSA — Amendment 2", section: "§1 Payment", id: "am2" },
      { doc: "Acme MSA", section: "§7.2 Early payment", id: "msa" },
    ],
  },
];

export const FOLLOW_UP_REPLY = {
  role: "agent",
  text: "Based on the current Contract Effective State, here's what I found. Three vendors are on Net 60 terms: AWS, Deloitte, and Workday. The remaining active contracts use Net 30 or shorter.",
  citations: [
    { doc: "AWS MSA", section: "§9 Payment", id: "msa" },
    { doc: "Deloitte MSA", section: "§6 Fees", id: "msa" },
  ],
};
