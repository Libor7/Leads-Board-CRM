import { createContext } from "react";
import type { LeadDetailContextValue } from "../lead-detail.types";

export const LeadDetailContext = createContext<LeadDetailContextValue | null>(
  null
);
