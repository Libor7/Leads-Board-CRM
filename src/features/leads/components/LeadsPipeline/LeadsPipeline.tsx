import { useLeadsContext } from "@/context/leads/use-leads-context";
import PipelineBoard from "@/shared/ui/pipeline/PipelineBoard/PipelineBoard";
import type { Lead, LeadStatus } from "@/types";
import { LEAD_COLUMNS } from "../../constants";
import LeadCard from "../LeadCard/LeadCard";

const LeadsPipeline = () => {
  const leads = useLeadsContext((ctx) => ctx.state.leads);

  return (
    <PipelineBoard<Lead, LeadStatus>
      columns={LEAD_COLUMNS}
      items={leads}
      getItemColumnId={(lead) => lead.status}
      renderItem={(lead) => <LeadCard key={lead.id} lead={lead} />}
    />
  );
};

export default LeadsPipeline;
