import { useMemo, useState } from "react";

import { LEAD_STATUSES, type Lead, type LeadField } from "@/types";
import type { FilterRule } from "../model/filter.types";
import { matchFilters } from "../helpers/matchFilters";
import { getTagsFromLeads } from "../helpers/getTags";

export const useLeadFilters = (leads: Lead[]) => {
  const allTags = useMemo(() => getTagsFromLeads(leads), [leads]);
  const initialFilters: FilterRule<string>[] = [
    { field: "status", values: LEAD_STATUSES },
    { field: "details.tags", values: allTags },
  ];
  const [filters, setFilters] = useState<FilterRule<string>[]>(initialFilters);

  const setFilterValues = (field: LeadField, values: readonly string[]) => {
    setFilters((prev) => {
      const rest = prev.filter((f) => f.field !== field);
      return [...rest, { field, values }];
    });
  };

  const filteredLeads = useMemo(
    () => leads.filter((lead) => matchFilters(lead, filters)),
    [leads, filters]
  );

  const resetFilters = () => {
    setFilters(initialFilters);
  };

  return {
    filters,
    filteredLeads,
    setFilterValues,
    resetFilters,
    allTags,
  };
};
