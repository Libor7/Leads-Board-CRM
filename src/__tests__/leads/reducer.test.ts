import { describe, it, expect } from "vitest";

import {
  leadsReducer,
  type LeadsState,
} from "../../context/leads/leads-reducer";
import type { Lead } from "../../types";
import type { LeadsAction } from "../../context/leads/leads-actions";

const initialState: LeadsState = {
  leads: [],
  history: [],
};

describe("leads-reducer", () => {
  describe("ADD_LEAD", () => {
    it("should add a lead with generated id if not provided", () => {
      const lead: Lead = {
        id: "generated-id", // Provide id as required
        company: "ABC Corp",
        contact: { name: "John Doe" },
        status: "New",
        details: { value: 50000, tags: [], notes: "" },
      };

      const newState = leadsReducer(initialState, {
        type: "ADD_LEAD",
        payload: lead,
      });

      expect(newState.leads).toHaveLength(1);
      expect(newState.leads[0].id).toBe("generated-id");
      expect(newState.leads[0]).toMatchObject(lead);
      expect(newState.history).toHaveLength(1);
    });

    it("should use provided id", () => {
      const lead: Lead = {
        id: "custom-id",
        company: "ABC Corp",
        contact: { name: "John Doe" },
        status: "New",
        details: { value: 50000, tags: [], notes: "" },
      };

      const newState = leadsReducer(initialState, {
        type: "ADD_LEAD",
        payload: lead,
      });

      expect(newState.leads[0].id).toBe("custom-id");
    });
  });

  describe("UPDATE_LEAD", () => {
    it("should update lead fields", () => {
      const stateWithLead: LeadsState = {
        leads: [
          {
            id: "1",
            company: "ABC Corp",
            contact: { name: "John Doe", email: "john@abc.com" },
            status: "New",
            details: { value: 50000, tags: ["urgent"], notes: "Note" },
          },
        ],
        history: [],
      };

      const newState = leadsReducer(stateWithLead, {
        type: "UPDATE_LEAD",
        payload: {
          leadId: "1",
          changes: {
            status: "Contacted",
            company: "XYZ Corp",
            details: { value: 75000 },
          },
        },
      });

      expect(newState.leads[0].status).toBe("Contacted");
      expect(newState.leads[0].company).toBe("XYZ Corp");
      expect(newState.leads[0].details.value).toBe(75000);
      expect(newState.leads[0].contact.email).toBe("john@abc.com"); // unchanged
      expect(newState.history).toHaveLength(1);
    });

    it("should merge nested objects", () => {
      const stateWithLead: LeadsState = {
        leads: [
          {
            id: "1",
            company: "ABC Corp",
            contact: { name: "John Doe", email: "john@abc.com" },
            status: "New",
            details: { value: 50000, tags: [], notes: "" },
          },
        ],
        history: [],
      };

      const newState = leadsReducer(stateWithLead, {
        type: "UPDATE_LEAD",
        payload: {
          leadId: "1",
          changes: {
            contact: { name: "Jane Doe" }, // partial update
          },
        },
      });

      expect(newState.leads[0].contact.name).toBe("Jane Doe");
      expect(newState.leads[0].contact.email).toBe("john@abc.com"); // preserved
    });

    it("should return unchanged state if lead not found", () => {
      const newState = leadsReducer(initialState, {
        type: "UPDATE_LEAD",
        payload: { leadId: "nonexistent", changes: { status: "Contacted" } },
      });

      expect(newState).toBe(initialState);
    });
  });

  describe("unknown action", () => {
    it("should return unchanged state", () => {
      const newState = leadsReducer(initialState, {
        type: "UNKNOWN",
      } as unknown as LeadsAction);

      expect(newState).toBe(initialState);
    });
  });
});
