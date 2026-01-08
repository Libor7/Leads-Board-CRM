import type {
  HistoryItemView,
  HistoryChangeView,
} from "@/context/leads/adapters/lead-history.adapter";

export type Props = {
  leadId: string;
};

export type HeaderProps = {
  label?: string;
};

export type ContentProps = {
  items: HistoryItemView[];
};

export type EmptyProps = {
  message?: string;
};

export type ItemProps = {
  item: HistoryItemView;
};

export type ItemContentProps = {
  changes: HistoryChangeView[];
};

export type LeadChangeProps = Omit<HistoryChangeView, "id">;
