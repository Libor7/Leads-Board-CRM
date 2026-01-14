import { memo, type ReactNode } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useDroppable } from "@dnd-kit/core";
import type { LeadStatus } from "@/types";

type PipelineColumnProps = {
  id: LeadStatus;
  title: string;
  children: ReactNode;
};

const PipelineColumn = memo(({ id, title, children }: PipelineColumnProps) => {
  const { setNodeRef } = useDroppable({
    id: `column:${id}`,
  });

  return (
    <Box ref={setNodeRef} width={280}>
      <Typography variant="subtitle1" mb={1}>
        {title}
      </Typography>
      <Stack spacing={1}>{children}</Stack>
    </Box>
  );
});

PipelineColumn.whyDidYouRender = true;

export default PipelineColumn;
