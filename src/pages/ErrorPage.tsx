import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useRouter } from "@tanstack/react-router";

import { leadsIndexRoute } from "@/routes/leads";
import { hasMessageProperty } from "@/shared/utils/errors";

type ErrorPageProps = {
  error?: unknown;
};

const ErrorPage = ({ error }: ErrorPageProps) => {
  const { navigate } = useRouter();

  const errorMessage = hasMessageProperty(error)
    ? error.message
    : String(error ?? "Unexpected error occured");

  return (
    <Box textAlign="center">
      <Typography variant="h4" color="error" gutterBottom>
        Something went wrong
      </Typography>
      <Typography variant="body1" mb={2}>
        {errorMessage}
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate({ to: leadsIndexRoute.id })}
      >
        Back to Leads
      </Button>
    </Box>
  );
};

export default ErrorPage;
