import type { ReactNode } from "react";
import { Box, Stack, Typography } from "@mui/material";

interface PipelineColumnProps {
  title: string;
  children: ReactNode;
}

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

export default PipelineColumn;
