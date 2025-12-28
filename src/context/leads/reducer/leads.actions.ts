import type { LeadDraft } from "@/types";

type AddLeadAction = { type: "ADD_LEAD"; payload: LeadDraft };

type UpdateLeadAction = {
  type: "UPDATE_LEAD";
  payload: {
    leadId: string;
    lead: LeadDraft;
  };
};

export type LeadsAction = AddLeadAction | UpdateLeadAction;
