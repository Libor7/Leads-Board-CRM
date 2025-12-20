import type { Lead } from "../../types";

type AddLeadAction = { type: "ADD_LEAD"; payload: Lead };

type UpdateLeadAction = {
  type: "UPDATE_LEAD";
  payload: {
    leadId: string;
    changes: Partial<Lead>;
  };
};

export type LeadsAction = AddLeadAction | UpdateLeadAction;
