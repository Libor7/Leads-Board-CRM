import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";

import { LEAD_STATUSES, type LeadField } from "@/types";
import type { FilterRule } from "../model/filter.types";
import { matchFilters } from "../helpers/matchFilters";
import { getTagsFromLeads } from "../helpers/getTags";
import { leadsIndexRoute } from "@/routes/leads";
import { selectLeads } from "@/context/leads/selectors/leads.selectors";
import { useLeadsContext } from "@/context/leads/use-leads-context";

export const useLeadFilters = () => {
  const leads = useLeadsContext(({ state }) => selectLeads(state));
  const navigate = useNavigate({ from: leadsIndexRoute.fullPath });
  const search = leadsIndexRoute.useSearch();
  const allTags = getTagsFromLeads(leads);

  const initialFilters: FilterRule<string>[] = [
    {
      field: "status",
      values: search.status?.length ? search.status : LEAD_STATUSES,
    },
    {
      field: "details.tags",
      values: search.tags?.length ? search.tags : allTags,
    },
  ];

  const [filters, setFilters] = useState<FilterRule<string>[]>(initialFilters);
  const filteredLeads = leads.filter((lead) => matchFilters(lead, filters));

  const setFilterValues = (field: LeadField, values: readonly string[]) => {
    setFilters((prev) => [
      ...prev.filter((f) => f.field !== field),
      { field, values },
    ]);
    navigate({
      search: (prev: typeof search) => ({
        ...prev,
        [field === "status" ? "status" : "tags"]: values,
      }),
    });
  };

  const resetFilters = () => {
    setFilters(initialFilters);
    navigate({
      search: () => ({
        status: LEAD_STATUSES,
        tags: allTags,
      }),
    });
  };

  return {
    filters,
    filteredLeads,
    setFilterValues,
    resetFilters,
    allTags,
    hasLeads: leads.length > 0,
  };
};
