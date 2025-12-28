import { Box, Stack, Typography } from "@mui/material";
import type { HistoryItemView } from "@/context/leads/adapters/lead-history.adapter";

interface LeadHistoryItemProps {
  item: HistoryItemView;
}

const LeadHistoryItem = ({ item }: LeadHistoryItemProps) => {
  return (
    <Stack direction="row" spacing={2}>
      <Box
        width={10}
        height={10}
        mt={1}
        borderRadius="50%"
        bgcolor="primary.main"
        flexShrink={0}
      />
      <Box>
        <Typography variant="caption" color="text.secondary">
          {item.date.toLocaleString()}
        </Typography>
        <Stack spacing={0.5} mt={0.5}>
          {item.changes.map(({ id, from, label, to }) => (
            <Typography key={id} variant="body2">
              <strong>{label}</strong>{" "}
              <span style={{ color: "#888" }}>{from}</span> →{" "}
              <span style={{ color: "#2e7d32", fontWeight: 500 }}>{to}</span>
            </Typography>
          ))}
        </Stack>
      </Box>
    </Stack>
  );
};

export default LeadHistoryItem;
