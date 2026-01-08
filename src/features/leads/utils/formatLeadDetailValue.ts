import type { LeadFieldValue } from "../components/LeadDetail/lead-detail.types";
import {
  LEAD_DETAIL_FALLBACK,
  LEAD_DETAIL_MULTIPLE,
} from "../constants/lead.constants";

export const formatLeadDetailValue = (value: LeadFieldValue) => {
  if (value === undefined || value === "") return LEAD_DETAIL_FALLBACK;

  if (Array.isArray(value)) {
    return value.length === 0
      ? LEAD_DETAIL_FALLBACK
      : value.length === 1
      ? String(value[0])
      : LEAD_DETAIL_MULTIPLE;
  }

  return String(value);
};
