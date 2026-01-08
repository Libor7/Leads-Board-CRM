import type { ReactNode } from "react";
import { Box, Stack, Typography } from "@mui/material";

type PipelineColumnProps = {
  title: string;
  children: ReactNode;
};

const PipelineColumn = ({ title, children }: PipelineColumnProps) => {
  return (
    <Box width={280}>
      <Typography variant="subtitle1" mb={1}>
        {title}
      </Typography>
      <Stack spacing={1}>{children}</Stack>
    </Box>
  );
};

PipelineColumn.whyDidYouRender = true;

export default PipelineColumn;
