import { type PropsWithChildren, useReducer } from "react";

import { LeadsContext } from "./leads-context";
import { leadsReducer, type LeadsState } from "./reducer/leads.reducer";
import type { Lead } from "@/types";

const seedLeads: Lead[] = [
  {
    id: "1",
    company: "Acme Corp",
    contact: { name: "John Doe", email: "john@acme.com" },
    status: "New",
    details: {
      value: 1000,
      tags: "b2b",
      notes: "",
    },
  },
  {
    id: "2",
    company: "Globex",
    contact: { name: "Jane Smith", email: "" },
    status: "Contacted",
    details: {
      value: 2500,
      tags: "enterprise",
      notes: "Follow up next week",
    },
  },
];

const initialState: LeadsState = {
  leads: seedLeads, // TODO - change back to empty array
  history: [],
};

export const LeadsProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(leadsReducer, initialState);

  return (
    <LeadsContext.Provider value={{ state, dispatch }}>
      {children}
    </LeadsContext.Provider>
  );
};
