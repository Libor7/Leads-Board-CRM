import type { LeadsState } from "./leads-reducer";
import type { Lead } from "../../types";
import { createLeadHistoryEntry, generateId } from "./leads-helpers";

export const addLeadHandler = (state: LeadsState, lead: Lead): LeadsState => {
  const leadWithId: Lead = {
    ...lead,
    id: lead.id ?? generateId(), // TODO: Use backend-generated ID
  };

  const historyEntry = createLeadHistoryEntry(leadWithId);

  return {
    leads: [...state.leads, leadWithId],
    history: [...state.history, historyEntry],
  };
};

export const updateLeadHandler = (
  state: LeadsState,
  payload: {
    leadId: string;
    changes: Partial<Lead>;
  }
): LeadsState => {
  const oldLead = state.leads.find((lead) => lead.id === payload.leadId);
  if (!oldLead) return state;

  const newLead: Lead = {
    ...oldLead,
    ...payload.changes,
    contact: {
      ...oldLead.contact,
      ...payload.changes.contact,
    },
    details: {
      ...oldLead.details,
      ...payload.changes.details,
    },
  };

  const historyEntry = createLeadHistoryEntry(newLead, oldLead);

  return {
    leads: state.leads.map((lead) => (lead.id === newLead.id ? newLead : lead)),
    history: [...state.history, historyEntry],
  };
};
