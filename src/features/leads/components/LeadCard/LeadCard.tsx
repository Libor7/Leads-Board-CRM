import { Card, CardContent, Typography } from "@mui/material";
import type { Lead } from "@/types";

interface LeadCardProps {
  lead: Lead;
}

const LeadCard = ({ lead }: LeadCardProps) => {
  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="subtitle2">
          {lead.company}
        </Typography>
        <Typography variant="body2">
          {lead.contact.name}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default LeadCard;
