import { createTheme } from "@mui/material/styles";
import { typographyConfig } from "./typography";

export const theme = createTheme({
  components: {
    ...typographyConfig,
  },
});
