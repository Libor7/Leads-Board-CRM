import type { LeadsState } from "../reducer/leads.reducer";
import type { Lead, LeadStatus } from "@/types";

export const selectLeads = ({ leads }: LeadsState): Lead[] => leads;

export const selectLeadById =
  (id: string) =>
  ({ leads }: LeadsState): Lead | undefined =>
    leads.find((l) => l.id === id);

export const selectLeadsByStatus =
  (status: LeadStatus) =>
  ({ leads }: LeadsState): Lead[] =>
    leads.filter((l) => l.status === status);
