import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
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
      <Box minHeight={(theme) => theme.spacing(7)}>{children}</Box>
    </Box>
  );
};

export default LeadDetailLayout;
