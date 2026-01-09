import { useEffect, useMemo, useState } from "react";
import debounce from "lodash.debounce";

import type { Lead } from "@/types";
import type { LeadSearchField } from "../model/search.types";
import { matchSearch } from "../utils/matchSearch";
import { LEAD_SEARCH_FIELDS } from "../model/search.config";

const DEBOUNCE_MS = 300;

const DEFAULT_FIELDS: readonly LeadSearchField[] = LEAD_SEARCH_FIELDS.map(
  (f) => f.field
);

export const useLeadSearch = (leads: Lead[]) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFields, setActiveFields] =
    useState<readonly LeadSearchField[]>(DEFAULT_FIELDS);

  const [debouncedQuery, setDebouncedQuery] = useState(searchQuery);

  useEffect(() => {
    const handler = debounce(
      (value: string) => setDebouncedQuery(value),
      DEBOUNCE_MS
    );

    handler(searchQuery);
    return () => handler.cancel();
  }, [searchQuery]);

  const searchedLeads = useMemo(() => {
    if (!debouncedQuery) return leads;

    return leads.filter((lead) =>
      matchSearch(lead, debouncedQuery, activeFields)
    );
  }, [leads, debouncedQuery, activeFields]);

  const toggleField = (field: LeadSearchField) => {
    setActiveFields((prev) => {
      if (prev.includes(field)) {
        return prev.length > 1 ? prev.filter((f) => f !== field) : prev;
      }
      return [...prev, field];
    });
  };

  const resetSearch = () => {
    setSearchQuery("");
    setActiveFields(DEFAULT_FIELDS);
  };

  return {
    searchedLeads,
    searchQuery,
    setSearchQuery,
    activeFields,
    toggleField,
    resetSearch,
  };
};
