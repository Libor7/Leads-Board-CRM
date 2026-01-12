import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

const PageLoader = () => (
  <Box
    display="flex"
    justifyContent="center"
    alignItems="center"
    minHeight="40vh"
  >
    <CircularProgress />
  </Box>
);

export default PageLoader;
