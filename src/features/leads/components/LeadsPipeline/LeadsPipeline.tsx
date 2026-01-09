import { useMemo } from "react";

import { useLeadsContext } from "@/context/leads/use-leads-context";
import { selectLeads } from "@/context/leads/selectors/leads.selectors";
import PipelineBoard from "@/shared/ui/features/pipeline/PipelineBoard/PipelineBoard";
import type { Lead, LeadStatus } from "@/types";
import { LEAD_COLUMNS } from "../../constants";
import LeadCard from "../LeadCard/LeadCard";
import { useLeadFilters } from "@/features/leads/filtering/hooks/useLeadFilters";
import { useLeadSearch } from "@/features/leads/search/hooks/useLeadSearch";
import PipelineToolbar from "../PipelineToolbar/PipelineToolbar";
import EmptyState from "@/shared/ui/features/EmptyState/EmptyState";

const LeadsPipeline = () => {
  const leads = useLeadsContext(({ state }) => selectLeads(state));
  const { allTags, filteredLeads, filters, resetFilters, setFilterValues } =
    useLeadFilters(leads);
  const {
    searchedLeads,
    searchQuery,
    setSearchQuery,
    activeFields,
    toggleField,
    resetSearch,
  } = useLeadSearch(filteredLeads);

  const groupedLeads = useMemo(() => {
    return LEAD_COLUMNS.reduce((acc, col) => {
      acc[col.id] = searchedLeads.filter(({ status }) => status === col.id);
      return acc;
    }, {} as Record<LeadStatus, Lead[]>);
  }, [searchedLeads]);

  const resetAllHandler = () => {
    resetSearch();
    resetFilters();
  };

  const hasLeads = leads.length > 0;
  const hasResults = searchedLeads.length > 0;

  return (
    <>
      <PipelineToolbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        activeSearchFields={activeFields}
        onToggleSearchField={toggleField}
        filters={filters}
        onFilterChange={setFilterValues}
        allTags={allTags}
        onResetAll={resetAllHandler}
      />
      <PipelineBoard
        columns={LEAD_COLUMNS}
        groupedItems={groupedLeads}
        renderItem={(lead) => <LeadCard key={lead.id} lead={lead} />}
      />
      {hasLeads && !hasResults && (
        <EmptyState message="No results match your search or filters" />
      )}
      {!hasLeads && <EmptyState message="No leads exist yet" />}
    </>
  );
};

export default LeadsPipeline;
