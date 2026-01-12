import { lazy } from "react";

const Check = lazy(() => import("@mui/icons-material/Check"));
const Close = lazy(() => import("@mui/icons-material/Close"));
const Edit = lazy(() => import("@mui/icons-material/Edit"));

export const SUPPORTED_ICONS = {
  Check,
  Close,
  Edit,
} as const;

export type SupportedIcons = keyof typeof SUPPORTED_ICONS;
