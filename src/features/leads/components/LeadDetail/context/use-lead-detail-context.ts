import { useContextSelector } from "use-context-selector";

import { LeadDetailContext } from "./lead-detail-context";
import type { LeadDetailContextValue } from "../lead-detail.types";

export const useLeadDetailContext = <T>(selector: (ctx: LeadDetailContextValue) => T): T => {
  const selected = useContextSelector(LeadDetailContext, (ctx) => {
    if (!ctx) {
      throw new Error("useLeadDetailContext must be used within LeadDetailContext.Provider");
    }
    return selector(ctx);
  });
  return selected;
};
