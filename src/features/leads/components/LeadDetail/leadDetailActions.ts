import type { LeadDetailAction } from "./lead-detail.types";

export const leadDetailActions: LeadDetailAction[] = [
  { icon: "Close", modes: ["edit"], execute: ({ toggleMode }) => toggleMode() },
  { icon: "Check", modes: ["edit"], execute: ({ submit }) => submit() },
  { icon: "Edit", modes: ["view"], execute: ({ toggleMode }) => toggleMode() },
];
