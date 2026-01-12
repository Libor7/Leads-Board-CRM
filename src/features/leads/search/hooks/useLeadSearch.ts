import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "@tanstack/react-router";

import type { Lead, LeadStatus } from "@/types";
import type { LeadSearchField } from "../model/search.types";
import { matchSearch } from "../utils/matchSearch";
import { LEAD_SEARCH_FIELDS } from "../model/search.config";
import { leadsIndexRoute } from "@/routes/leads";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import { LEAD_COLUMNS } from "../../constants";

const DEFAULT_FIELDS: readonly LeadSearchField[] = LEAD_SEARCH_FIELDS.map(
  (f) => f.field
);

export const useLeadSearch = (leads: Lead[]) => {
  const navigate = useNavigate({ from: leadsIndexRoute.fullPath });
  const search = leadsIndexRoute.useSearch();
  const [searchQuery, setSearchQuery] = useState(search.search ?? "");
  const [activeFields, setActiveFields] =
    useState<readonly LeadSearchField[]>(DEFAULT_FIELDS);
  const debouncedQuery = useDebouncedValue(searchQuery);

  const toggleField = useCallback((field: LeadSearchField) => {
    setActiveFields((prev) => {
      if (prev.includes(field)) {
        if (prev.length === 1) return prev;
        return prev.filter((f) => f !== field);
      }
      return [...prev, field] as readonly LeadSearchField[];
    });
  }, []);

  const resetSearch = () => {
    setSearchQuery("");
    setActiveFields(DEFAULT_FIELDS);
    navigate({
      to: leadsIndexRoute.id,
      search: {},
    });
  };

  useEffect(() => {
    if (debouncedQuery) {
      navigate({
        to: leadsIndexRoute.id,
        search: {
          ...search,
          search: debouncedQuery,
        },
      });
    } else {
      const newSearch = { ...search };
      delete newSearch.search;
      navigate({
        to: leadsIndexRoute.id,
        search: newSearch,
      });
    }
  }, [debouncedQuery, navigate, search]);

  const searchedLeads = useMemo(() => {
    if (!debouncedQuery) return leads;
    return leads.filter((lead) =>
      matchSearch(lead, debouncedQuery, activeFields)
    );
  }, [leads, debouncedQuery, activeFields]);

  const groupedLeads = useMemo(() => {
    return LEAD_COLUMNS.reduce((acc, col) => {
      acc[col.id] = searchedLeads.filter(({ status }) => status === col.id);
      return acc;
    }, {} as Record<LeadStatus, Lead[]>);
  }, [searchedLeads]);

  return {
    groupedLeads,
    searchQuery,
    setSearchQuery,
    activeFields,
    toggleField,
    resetSearch,
    hasResults: searchedLeads.length > 0,
  };
};
