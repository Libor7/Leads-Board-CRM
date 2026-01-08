import { Box, Typography } from "@mui/material";
import type { PropsWithChildren } from "react";

type LeadDetailLayoutProps = {
  label: string;
};

const LeadDetailLayout = ({
  label,
  children,
}: PropsWithChildren<LeadDetailLayoutProps>) => {
  return (
    <Box display="flex" flexDirection="column" mb={2}>
      <Typography variant="subtitle2" color="textSecondary">
        {label}
      </Typography>
      <Box>{children}</Box>
    </Box>
  );
};

export default LeadDetailLayout;
