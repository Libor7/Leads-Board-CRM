import type { ReactNode } from "react";
import { Box, Typography } from "@mui/material";

interface PipelineColumnProps {
  title: string;
  children: ReactNode;
}

const PipelineColumn = ({ title, children }: PipelineColumnProps) => {
  return (
    <Box>
      <Typography variant="h6">{title}</Typography>

      <Box>{children}</Box>
    </Box>
  );
};

export default PipelineColumn;
