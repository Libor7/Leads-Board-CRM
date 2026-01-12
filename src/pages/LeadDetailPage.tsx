import { lazy, Suspense } from "react";

import { useLeadsContext } from "@/context/leads/use-leads-context";
import { selectLeadById } from "@/context/leads/selectors/leads.selectors";
import NotFoundPage from "./NotFoundPage";
import LeadDetails from "@/features/leads/components/LeadDetails/LeadDetails";
import { leadDetailRoute } from "@/routes/leads";

const LeadHistory = lazy(
  () => import("@/features/leads/components/LeadHistory/LeadHistory")
);

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
      <Suspense fallback={null}>
        <LeadHistory leadId={lead.id} />
      </Suspense>
    </>
  );
};

export default LeadDetailPage;
