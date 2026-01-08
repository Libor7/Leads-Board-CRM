import Check from "@mui/icons-material/Check";
import Close from "@mui/icons-material/Close";
import Edit from "@mui/icons-material/Edit";

export const SUPPORTED_ICONS = {
  Check,
  Close,
  Edit,
} as const;

export type SupportedIcons = keyof typeof SUPPORTED_ICONS;
