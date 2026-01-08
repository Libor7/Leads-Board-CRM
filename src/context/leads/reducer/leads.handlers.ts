import type { LeadsState } from "./leads.reducer";
import type {
  ChangeDetails,
  Lead,
  LeadField,
  LeadHistoryEntry,
  updateLeadPayload,
} from "@/types";
import { generateId } from "@/shared/utils/id";
import { areDifferent } from "@/shared/utils/compareValues";
import type { LeadValues } from "@/features/leads/schemas/lead.schema";

export const addLeadHandler = (
  state: LeadsState,
  draft: LeadValues
): LeadsState => {
  const lead: Lead = {
    id: generateId(), // TODO: Use backend-generated ID
    ...draft,
  };
  const historyEntry = createLeadHistoryEntry(lead);

  return {
    leads: [...state.leads, lead],
    history: [...state.history, historyEntry],
  };
};

export const updateLeadHandler = (
  state: LeadsState,
  { leadId, updater }: updateLeadPayload
): LeadsState => {
  const oldLead = state.leads.find(({ id }) => id === leadId);
  if (!oldLead) return state;

  const newLead = updater(oldLead);

  const historyEntry = createLeadHistoryEntry(newLead, oldLead);
  if (historyEntry.changes.length === 0) return state;

  return {
    leads: state.leads.map((lead) => (lead.id === leadId ? newLead : lead)),
    history: [...state.history, historyEntry],
  };
};

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
 * Creates a default (empty) lead for comparison purposes.
 */
const createDefaultLead = (): Lead => ({
  id: "",
  company: "",
  contact: { name: "", email: "" },
  status: "New",
  details: { value: 0, tags: "", notes: "" },
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
    if (areDifferent(oldValue, newValue)) {
      changes.push({ id: generateId(), field, oldValue, newValue });
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
