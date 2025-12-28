import { Stack, Typography } from "@mui/material";

import { useLeadsContext } from "@/context/leads/use-leads-context";
import { adaptLeadHistory } from "@/context/leads/adapters/lead-history.adapter";
import LeadHistoryItem from "./LeadHistoryItem";
import { selectHistoryByLeadId } from "@/context/leads/selectors/history.selectors";

interface LeadHistoryProps {
  leadId: string;
}

const LeadHistory = ({ leadId }: LeadHistoryProps) => {
  const history = useLeadsContext(({ state }) =>
    selectHistoryByLeadId(leadId)(state)
  );

  if (history.length === 0) {
    return (
      <Typography variant="body2" color="text.secondary">
        No changes recorded yet.
      </Typography>
    );
  }

  const viewItems = adaptLeadHistory(history);

  return (
    <Stack spacing={3} mt={4}>
      <Typography variant="h6">Change history</Typography>
      <Stack spacing={2}>
        {viewItems.map((item) => (
          <LeadHistoryItem key={item.id} item={item} />
        ))}
      </Stack>
    </Stack>
  );
};

export default LeadHistory;
