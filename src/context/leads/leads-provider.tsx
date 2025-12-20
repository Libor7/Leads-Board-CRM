import { type PropsWithChildren, useReducer } from "react";

import { LeadsContext } from "./leads-context";
import { leadsReducer, type LeadsState } from "./leads-reducer";

const initialState: LeadsState = {
  leads: [],
  history: [],
};

export function LeadsProvider({ children }: PropsWithChildren) {
  const [state, dispatch] = useReducer(leadsReducer, initialState);

  return (
    <LeadsContext.Provider value={{ state, dispatch }}>
      {children}
    </LeadsContext.Provider>
  );
}
