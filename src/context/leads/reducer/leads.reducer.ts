import type { Lead, LeadHistory } from "@/types";
import type { LeadsAction } from "./leads.actions";
import { addLeadHandler, updateLeadHandler } from "./leads.handlers";

export interface LeadsState {
  leads: Lead[];
  history: LeadHistory;
}

export const leadsReducer = (
  state: LeadsState,
  action: LeadsAction
): LeadsState => {
  switch (action.type) {
    case "ADD_LEAD":
      return addLeadHandler(state, action.payload);
    case "UPDATE_LEAD":
      return updateLeadHandler(state, action.payload);
    default:
      return state;
  }
};
