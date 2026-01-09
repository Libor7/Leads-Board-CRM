import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

type EmptyStateProps = {
  message: string;
};

const EmptyState = ({ message }: EmptyStateProps) => {
  return (
    <Box mt={6} textAlign="center">
      <Typography variant="body2" color="text.secondary">
        {message}
      </Typography>
    </Box>
  );
};

export default EmptyState;
