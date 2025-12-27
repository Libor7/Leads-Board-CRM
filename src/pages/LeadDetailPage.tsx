import { useParams } from "@tanstack/react-router";
import { Typography } from "@mui/material";

import { useLeadsContext } from "@/context/leads/use-leads-context";
import NotFoundPage from "./NotFoundPage";

const LeadDetailPage = () => {
  const { id } = useParams({ from: "/pipeline/leads/$id" });
  const lead = useLeadsContext(({ state }) =>
    state.leads.find((lead) => lead.id === id)
  );

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
      <Typography variant="h6">{lead.company}</Typography>
      <Typography>{lead.contact.name}</Typography>
      <Typography>{lead.contact.email}</Typography>
    </>
  );
};

export default LeadDetailPage;
