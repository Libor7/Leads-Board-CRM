import { useParams } from "@tanstack/react-router";

import { useLeadsContext } from "@/context/leads/use-leads-context";
import { selectLeadById } from "@/context/leads/selectors/leads.selectors";
import LeadForm from "@/features/leads/components/LeadForm/LeadForm";
import NotFoundPage from "./NotFoundPage";
import type { LeadDraft } from "@/types";
import LeadHistory from "@/features/leads/components/LeadHistory/LeadHistory";

const LeadDetailPage = () => {
  const { id } = useParams({ from: "/pipeline/leads/$id" });
  const lead = useLeadsContext(({ state }) => selectLeadById(id)(state));
  const dispatch = useLeadsContext(({ dispatch }) => dispatch);

  if (!lead) {
    return (
      <NotFoundPage
        title="Lead not found"
        message={`The lead you are looking for (ID: ${id}) no longer exists or is unavailable.`}
      />
    );
  }

  const submitHandler = (draft: LeadDraft) => {
    dispatch({
      type: "UPDATE_LEAD",
      payload: {
        leadId: lead.id,
        lead: draft,
      },
    });
  };

  return (
    <>
      <LeadForm lead={lead} onSubmit={submitHandler} />
      <LeadHistory leadId={lead.id} />
    </>
  );
};

export default LeadDetailPage;
