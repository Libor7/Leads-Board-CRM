import type { LeadField } from "@/types";
import type { FilterRule } from "@/features/leads/filtering/model/filter.types";
import type { LeadSearchField } from "@/features/leads/search/model/search.types";

export type PipelineToolbarProps = {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  activeSearchFields: readonly LeadSearchField[];
  onToggleSearchField: (field: LeadSearchField) => void;
  filters: FilterRule<string>[];
  onFilterChange: (field: LeadField, values: readonly string[]) => void;
  allTags: string[];
  onResetAll: () => void;
};
