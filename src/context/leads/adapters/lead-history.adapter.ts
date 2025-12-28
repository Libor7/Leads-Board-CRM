import { LEAD_FIELD_LABELS } from "@/shared/constants/lead-fields";
import { stringifyValue } from "@/shared/utils/stringifyValue";
import type { ChangeDetails, LeadHistoryEntry } from "@/types";

export interface HistoryChangeView {
  id: string;
  label: string;
  from: string;
  to: string;
}

export interface HistoryItemView {
  id: string;
  date: Date;
  changes: HistoryChangeView[];
}

export const adaptLeadHistory = (
  history: LeadHistoryEntry[]
): HistoryItemView[] => {
  return history.map((entry) => ({
    id: entry.id,
    date: new Date(entry.date),
    changes: entry.changes.map(adaptChange),
  }));
};

const adaptChange = (change: ChangeDetails): HistoryChangeView => {
  return {
    id: change.id,
    label: LEAD_FIELD_LABELS[change.field] ?? change.field,
    from: stringifyValue(change.oldValue),
    to: stringifyValue(change.newValue),
  };
};
