export interface Lead {
  id: string;
  company: string;
  contact: LeadContact;
  status: LeadStatus;
  details: LeadDetails;
}

export interface LeadContact {
  name: string;
  email: string;
}

export interface LeadDetails {
  value: number;
  tags: string[];
  notes: string;
}

export type LeadDraft = Omit<Lead, "id">;
export type LeadStatus = "New" | "Contacted" | "Qualified" | "Won" | "Lost";
export type updateLeadPayload = {
  leadId: string;
  lead: LeadDraft;
};
