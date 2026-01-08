import type { LeadValues } from "@/features/leads/schemas/lead.schema";
import type { Lead } from "@/types";

type AddLeadAction = { type: "ADD_LEAD"; payload: LeadValues };

type UpdateLeadAction = {
  type: "UPDATE_LEAD";
  payload: {
    leadId: string;
    updater: (lead: Lead) => Lead;
  };
};

export type LeadsAction = AddLeadAction | UpdateLeadAction;
