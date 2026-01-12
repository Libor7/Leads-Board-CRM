import { createContext } from "use-context-selector";
import type { LeadDetailContextValue } from "../lead-detail.types";

export const LeadDetailContext = createContext<
  LeadDetailContextValue | undefined
>(undefined);
