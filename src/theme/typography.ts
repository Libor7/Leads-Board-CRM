import type { Components, Theme } from "@mui/material";

export const typographyConfig: Components<Theme> = {
  MuiTypography: {
    styleOverrides: {
      body2: {
        minHeight: "1.5em",
      },
    },
  },
};
