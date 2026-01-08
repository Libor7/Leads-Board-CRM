import { Box, Stack, Typography } from "@mui/material";

import { useLeadsContext } from "@/context/leads/use-leads-context";
import { selectHistoryByLeadId } from "@/context/leads/selectors/history.selectors";
import { adaptLeadHistory } from "@/context/leads/adapters/lead-history.adapter";
import type * as LeadHistoryTypes from "./LeadHistory.types";
import { formatDateTime } from "@/shared/utils/date";

const Header = ({ label = "Recent changes" }: LeadHistoryTypes.HeaderProps) => (
  <Typography variant="h6">{label}</Typography>
);

const Content = ({ items }: LeadHistoryTypes.ContentProps) => (
  <Stack spacing={2}>
    {items.map((item) => (
      <Item key={item.id} item={item} />
    ))}
  </Stack>
);

const Empty = ({
  message = "No changes have been made so far",
}: LeadHistoryTypes.EmptyProps) => (
  <Typography variant="body2" color="text.secondary">
    {message}
  </Typography>
);

const ItemHeader = () => (
  <Box width={10} height={10} borderRadius="50%" bgcolor="primary.main" />
);

const LeadChange = ({ from, label, to }: LeadHistoryTypes.LeadChangeProps) => (
  <Stack direction="row" spacing={1}>
    <Typography variant="body2" fontWeight={600}>
      {label}
    </Typography>
    <Typography variant="body2" color="text.secondary">
      {from}
    </Typography>
    <Typography variant="body2" color="success.main" fontWeight={500}>
      → {to}
    </Typography>
  </Stack>
);

const ItemContent = ({ changes }: LeadHistoryTypes.ItemContentProps) => (
  <Stack spacing={0.5} mt={0.5}>
    {changes.map((change) => (
      <Item.Change key={change.id} {...change} />
    ))}
  </Stack>
);

const Item = ({ item }: LeadHistoryTypes.ItemProps) => (
  <Stack direction="row" spacing={2}>
    <Item.Header />
    <Box>
      <Typography variant="caption" color="text.secondary">
        {formatDateTime(item.date)}
      </Typography>
      <Item.Content changes={item.changes} />
    </Box>
  </Stack>
);

const LeadHistory = ({ leadId }: LeadHistoryTypes.Props) => {
  const history = useLeadsContext(({ state }) =>
    selectHistoryByLeadId(leadId)(state)
  );
  const historyItems = adaptLeadHistory(history);

  return (
    <Stack spacing={3} mt={4}>
      {historyItems.length === 0 ? (
        <LeadHistory.Empty />
      ) : (
        <>
          <LeadHistory.Header />
          <LeadHistory.Content items={historyItems} />
        </>
      )}
    </Stack>
  );
};

LeadHistory.Header = Header;
LeadHistory.Content = Content;
LeadHistory.Empty = Empty;
LeadHistory.Item = Item;
Item.Header = ItemHeader;
Item.Content = ItemContent;
Item.Change = LeadChange;

LeadHistory.whyDidYouRender = true;

export default LeadHistory;
