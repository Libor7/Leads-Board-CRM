import { memo, type ReactNode } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

type PipelineColumnProps = {
  title: string;
  children: ReactNode;
};

const PipelineColumn = memo(({ title, children }: PipelineColumnProps) => {
  return (
    <Box width={280}>
      <Typography variant="subtitle1" mb={1}>
        {title}
      </Typography>
      <Stack spacing={1}>{children}</Stack>
    </Box>
  );
});

PipelineColumn.whyDidYouRender = true;

export default PipelineColumn;
