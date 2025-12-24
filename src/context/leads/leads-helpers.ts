import type { Lead, LeadHistoryEntry, ChangeDetails, LeadField } from "@/types";

/**
 * Generates a unique ID for leads or history entries.
 * TODO: Replace with backend-generated ID.
 */
export const generateId = () => Math.random().toString(36).substring(2, 9);

/**
 * Type for field definitions used in change detection.
 */
type FieldDefinition = {
  field: LeadField;
  get: (lead: Lead) => unknown;
};

/**
 * Extendible field definitions for comparing leads.
 */
const leadFields: FieldDefinition[] = [
  { field: "status", get: (lead) => lead.status },
  { field: "company", get: (lead) => lead.company },
  { field: "contact.name", get: (lead) => lead.contact.name },
  { field: "contact.email", get: (lead) => lead.contact.email },
  { field: "details.value", get: (lead) => lead.details.value },
  { field: "details.tags", get: (lead) => lead.details.tags },
  { field: "details.notes", get: (lead) => lead.details.notes },
];

/**
 * Compares two values, handling arrays with deep equality.
 */
const compareValues = (a: unknown, b: unknown): boolean => {
  if (Array.isArray(a) && Array.isArray(b)) {
    return JSON.stringify(a) !== JSON.stringify(b);
  }
  return a !== b;
};

/**
 * Creates a default (empty) lead for comparison purposes.
 */
const createDefaultLead = (): Lead => ({
  id: "",
  company: "",
  contact: { name: "", email: "" },
  status: "New",
  details: { value: 0, tags: [], notes: "" },
});

/**
 * Creates an array of change details by comparing old and new leads.
 */
export const createChangeDetails = (
  oldLead: Lead,
  newLead: Lead
): ChangeDetails[] => {
  const changes: ChangeDetails[] = [];

  for (const { field, get } of leadFields) {
    const oldValue = get(oldLead);
    const newValue = get(newLead);
    if (compareValues(oldValue, newValue)) {
      changes.push({ field, oldValue, newValue });
    }
  }

  return changes;
};

/**
 * Creates a history entry for a lead change or new lead.
 * If oldLead is not provided, assumes it's a new lead and uses a default empty lead for comparison.
 */
export const createLeadHistoryEntry = (
  newLead: Lead,
  oldLead?: Lead
): LeadHistoryEntry => {
  const effectiveOldLead = oldLead ?? createDefaultLead();
  return {
    id: generateId(),
    leadId: newLead.id,
    date: new Date().toISOString(),
    changes: createChangeDetails(effectiveOldLead, newLead),
  };
};
