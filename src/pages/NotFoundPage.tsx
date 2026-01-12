import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import type { NotFoundRouteProps } from "@tanstack/react-router";

type NotFoundPageProps = Partial<NotFoundRouteProps> & {
  message?: string;
  title?: string;
};

const NotFoundPage = ({
  message = "The requested page or content does not exist",
  title = "Page or content not found",
}: NotFoundPageProps) => {
  return (
    <Box mt={8} textAlign={"center"}>
      <Typography variant="h5">{title}</Typography>
      <Typography variant="body2" mt={2}>
        {message}
      </Typography>
    </Box>
  );
};

export default NotFoundPage;
