import { useMemo } from "react";

import { useLeadsContext } from "@/context/leads/use-leads-context";
import { selectLeads } from "@/context/leads/selectors/leads.selectors";
import PipelineBoard from "@/shared/ui/pipeline/PipelineBoard/PipelineBoard";
import type { Lead, LeadStatus } from "@/types";
import { LEAD_COLUMNS } from "../../constants";
import LeadCard from "../LeadCard/LeadCard";

const LeadsPipeline = () => {
  const leads = useLeadsContext(({ state }) => selectLeads(state));
  const groupedLeads = useMemo(() => {
    return LEAD_COLUMNS.reduce((acc, col) => {
      acc[col.id] = leads.filter((l) => l.status === col.id);
      return acc;
    }, {} as Record<LeadStatus, Lead[]>);
  }, [leads]);

  return (
    <PipelineBoard
      columns={LEAD_COLUMNS}
      groupedItems={groupedLeads}
      renderItem={(lead) => <LeadCard key={lead.id} lead={lead} />}
    />
  );
};

export default LeadsPipeline;
