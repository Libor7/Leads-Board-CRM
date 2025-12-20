import { createContext } from "use-context-selector";

import { type LeadsState } from "./leads-reducer";
import type { LeadsAction } from "./leads-actions";

export interface LeadsContextValue {
  state: LeadsState;
  dispatch: React.Dispatch<LeadsAction>;
}

export const LeadsContext = createContext<LeadsContextValue | undefined>(
  undefined
);
