import { useLeadsContext } from "@/context/leads/use-leads-context";
import { selectLeadById } from "@/context/leads/selectors/leads.selectors";
import LeadHistory from "@/features/leads/components/LeadHistory/LeadHistory";
import NotFoundPage from "./NotFoundPage";
import LeadDetails from "@/features/leads/components/LeadDetails/LeadDetails";
import { leadDetailRoute } from "@/routes/leads";

const LeadDetailPage = () => {
  const { id } = leadDetailRoute.useParams() as { id: string };
  const lead = useLeadsContext(({ state }) => selectLeadById(id)(state));

  if (!lead) {
    return (
      <NotFoundPage
        title="Lead not found"
        message={`The lead you are looking for (ID: ${id}) no longer exists or is unavailable.`}
      />
    );
  }

  return (
    <>
      <LeadDetails lead={lead} />
      <LeadHistory leadId={lead.id} />
    </>
  );
};

export default LeadDetailPage;
