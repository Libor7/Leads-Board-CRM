import PipelineBoard from "@/shared/ui/features/pipeline/PipelineBoard/PipelineBoard";
import { LEAD_COLUMNS } from "../../constants";
import LeadCard from "../LeadCard/LeadCard";
import { useLeadFilters } from "@/features/leads/filtering/hooks/useLeadFilters";
import { useLeadSearch } from "@/features/leads/search/hooks/useLeadSearch";
import PipelineToolbar from "../PipelineToolbar/PipelineToolbar";
import EmptyState from "@/shared/ui/features/EmptyState/EmptyState";
import { PipelineDndContext } from "@/shared/ui/features/pipeline/dnd/PipelineDndContext";
import { useLeadsContext } from "@/context/leads/use-leads-context";
import type { Lead, LeadStatus } from "@/types";

const LeadsPipeline = () => {
  const {
    allTags,
    filteredLeads,
    filters,
    hasLeads,
    resetFilters,
    setFilterValues,
  } = useLeadFilters();
  const {
    groupedLeads,
    searchQuery,
    setSearchQuery,
    activeFields,
    toggleField,
    resetSearch,
    hasResults,
  } = useLeadSearch(filteredLeads);
  const dispatch = useLeadsContext(({ dispatch }) => dispatch);

  const moveLead = (leadId: string, status: LeadStatus) => {
    dispatch({
      type: "UPDATE_LEAD",
      payload: {
        leadId,
        updater: (lead: Lead) =>
          lead.status === status ? lead : { ...lead, status },
      },
    });
  };

  let msg: string | undefined;
  if (!hasLeads) {
    msg = "No leads exist yet";
  } else if (!hasResults) {
    msg = "No results match your search or filters";
  }

  const resetAllHandler = () => {
    resetSearch();
    resetFilters();
  };

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
      <PipelineDndContext onMoveLead={moveLead}>
        <PipelineBoard
          columns={LEAD_COLUMNS}
          groupedItems={groupedLeads}
          renderItem={(lead) => <LeadCard key={lead.id} lead={lead} />}
        />
      </PipelineDndContext>
      {msg && <EmptyState message={msg} />}
    </>
  );
};

export default LeadsPipeline;
