import type { SupportedIcons } from "@/shared/ui/components/Icon/icon.constants";
import type { LeadField } from "@/types";

export type LeadDetailAction = {
  icon: SupportedIcons;
  modes: LeadDetailMode[];
  execute: (ctx: LeadDetailContextValue) => void;
};

export type LeadDetailContextValue = {
  field: LeadField;
  inputType: LeadDetailInputType;
  leadId: string;
  mode: LeadDetailMode;
  registerSubmit: (fn: (() => void) | null) => void;
  submit: () => void;
  toggleMode: () => void;
  value: LeadFieldValue;
};

export type LeadDetailInputType =
  | "email"
  | "multiline"
  | "number"
  | "select"
  | "tags"
  | "text";

export type LeadDetailMode = "view" | "edit";

export type LeadFieldValue = number | string | string[] | undefined;
