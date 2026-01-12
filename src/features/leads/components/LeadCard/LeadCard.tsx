import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useNavigate } from "@tanstack/react-router";

import type { Lead } from "@/types";
import { useClickable } from "@/shared/hooks/useClickable";
import styles from "./LeadCard.module.scss";

type LeadCardProps = {
  lead: Lead;
};

const LeadCard = ({
  lead: { id, company, contact, details },
}: LeadCardProps) => {
  const navigate = useNavigate();
  const { onClick, onKeyDown, role, tabIndex } = useClickable({
    onActivate: () =>
      navigate({
        to: "/pipeline/leads/$id",
        params: { id },
      }),
  });

  return (
    <Card
      className={styles.card}
      onClick={onClick}
      onKeyDown={onKeyDown}
      role={role}
      tabIndex={tabIndex}
      variant="outlined"
    >
      <CardContent>
        <Stack spacing={0.5}>
          <Typography variant="subtitle2">{company}</Typography>
          <Typography variant="body2">{contact.name}</Typography>
          <Typography variant="caption">Value: {details.value}</Typography>
        </Stack>
      </CardContent>
    </Card>
  );
};

LeadCard.whyDidYouRender = true;

export default LeadCard;
