import type { LeadValues } from "@/features/leads/schemas/lead.schema";

export const LEAD_STATUSES = [
  "New",
  "Contacted",
  "Qualified",
  "Won",
  "Lost",
] as const;

export interface Lead extends LeadValues {
  id: string;
}

export type LeadStatus = (typeof LEAD_STATUSES)[number];
export type updateLeadPayload = {
  leadId: string;
  updater: (lead: Lead) => Lead;
};
