import type { LeadField } from "@/types";
import type { LeadDetailInputType } from "./lead-detail.types";

export const leadDetailInputMap: Record<LeadField, LeadDetailInputType> = {
  company: "text",
  "contact.name": "text",
  "contact.email": "email",
  status: "select",
  "details.value": "number",
  "details.notes": "multiline",
  "details.tags": "tags",
};
