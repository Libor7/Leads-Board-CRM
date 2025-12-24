import type { LeadsState } from "./leads-reducer";
import type { Lead, LeadDraft, updateLeadPayload } from "@/types";
import { createLeadHistoryEntry, generateId } from "./leads-helpers";

export const addLeadHandler = (
  state: LeadsState,
  draft: LeadDraft
): LeadsState => {
  const lead: Lead = {
    id: generateId(), // TODO: Use backend-generated ID
    ...draft,
  };

  const historyEntry = createLeadHistoryEntry(lead);

  return {
    leads: [...state.leads, lead],
    history: [...state.history, historyEntry],
  };
};

export const updateLeadHandler = (
  state: LeadsState,
  { lead, leadId }: updateLeadPayload
): LeadsState => {
  const oldLead = state.leads.find(({ id }) => id === leadId);
  if (!oldLead) return state;

  const newLead: Lead = {
    id: oldLead.id,
    ...lead,
  };

  const historyEntry = createLeadHistoryEntry(newLead, oldLead);
  if (historyEntry.changes.length === 0) return state;

  return {
    leads: state.leads.map((lead) => (lead.id === newLead.id ? newLead : lead)),
    history: [...state.history, historyEntry],
  };
};
