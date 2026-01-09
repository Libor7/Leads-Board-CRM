import type { LeadSearchField } from "./search.types";
import { LEAD_FIELD_LABELS } from "@/shared/constants/lead-fields";

export const LEAD_SEARCH_FIELDS: {
  field: LeadSearchField;
  label: string;
}[] = [
  { field: "company", label: LEAD_FIELD_LABELS.company },
  { field: "contact.name", label: LEAD_FIELD_LABELS["contact.name"] },
  { field: "contact.email", label: LEAD_FIELD_LABELS["contact.email"] },
];
