import { useContext } from "react";

import { LeadDetailContext } from "./lead-detail-context";

export const useLeadDetailContext = () => {
  const ctx = useContext(LeadDetailContext);
  if (!ctx) {
    throw new Error(
      "useLeadDetailContext must be used within LeadDetailContext.Provider"
    );
  }
  return ctx;
};
