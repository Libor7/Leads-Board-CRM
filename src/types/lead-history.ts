export interface ChangeDetails {
  field: LeadField;
  oldValue: unknown;
  newValue: unknown;
}

export interface LeadHistoryEntry {
  id: string;
  changes: ChangeDetails[];
  date: string; // ISO date
  leadId: string;
}

export type LeadField =
  | "status"
  | "company"
  | "contact.name"
  | "contact.email"
  | "details.value"
  | "details.tags"
  | "details.notes";

export type LeadHistory = LeadHistoryEntry[];
