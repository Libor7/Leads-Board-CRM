import { useContextSelector } from "use-context-selector";

import { LeadsContext, type LeadsContextValue } from "./leads-context";

export const useLeadsContext = <T>(
  selector: (value: LeadsContextValue) => T
): T => {
  const selected = useContextSelector(LeadsContext, (ctx) => {
    if (!ctx) {
      throw new Error("useLeadsContext must be used within a LeadsProvider");
    }
    return selector(ctx);
  });
  return selected;
};
