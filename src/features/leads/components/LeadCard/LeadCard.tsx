import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useNavigate } from "@tanstack/react-router";
import { useDraggable } from "@dnd-kit/core";
import { useRef } from "react";

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
  const { setNodeRef, listeners, attributes, transform } = useDraggable({
    id: `lead:${id}`,
  });

  const pointerMoved = useRef(false);

  return (
    <Card
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={styles.card}
      onClick={onClick}
      onKeyDown={onKeyDown}
      role={role}
      tabIndex={tabIndex}
      variant="outlined"
      sx={{
        transform: transform
          ? `translate(${transform.x}px, ${transform.y}px)`
          : undefined,
        cursor: "grab",
      }}
      onMouseDown={() => (pointerMoved.current = false)}
      onMouseMove={() => (pointerMoved.current = true)}
      onMouseUp={() => {
        if (!pointerMoved.current) onClick();
      }}
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
