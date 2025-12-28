import type { LeadHistoryEntry } from "@/types";
import type { LeadsState } from "../reducer/leads.reducer";

export const selectHistoryByLeadId =
  (leadId: string) =>
  ({ history }: LeadsState): LeadHistoryEntry[] =>
    history.filter((h) => h.leadId === leadId);
