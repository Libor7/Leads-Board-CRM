import { describe, it, expect, vi } from "vitest";
import type { LeadsAction } from "@/context/leads/reducer/leads.actions";
import type { LeadValues } from "@/features/leads/schemas/lead.schema";
import {
  leadsReducer,
  type LeadsState,
} from "@/context/leads/reducer/leads.reducer";

const initialState: LeadsState = {
  leads: [],
  history: [],
};

describe("leads-reducer", () => {
  describe("ADD_LEAD", () => {
    it("should add a lead with generated id", () => {
      vi.spyOn(Math, "random").mockReturnValue(0.123456);

      const draft: LeadValues = {
        company: "ABC Corp",
        contact: { name: "John Doe", email: "john@abc.com" },
        status: "New",
        details: { value: 50000, tags: "", notes: "" },
      };

      const newState = leadsReducer(initialState, {
        type: "ADD_LEAD",
        payload: draft,
      });

      expect(newState.leads).toHaveLength(1);
      expect(newState.leads[0].company).toBe("ABC Corp");
      expect(newState.history).toHaveLength(1);
    });
  });

  describe("UPDATE_LEAD", () => {
    it("should replace lead with new data", () => {
      const stateWithLead: LeadsState = {
        leads: [
          {
            id: "1",
            company: "ABC Corp",
            contact: { name: "John Doe", email: "john@abc.com" },
            status: "New",
            details: { value: 50000, tags: "", notes: "" },
          },
        ],
        history: [],
      };

      const updatedDraft: LeadValues = {
        company: "XYZ Corp",
        contact: { name: "Jane Doe", email: "jane@xyz.com" },
        status: "Contacted",
        details: { value: 75000, tags: "hot", notes: "Updated" },
      };

      const newState = leadsReducer(stateWithLead, {
        type: "UPDATE_LEAD",
        payload: {
          leadId: "1",
          updater: (lead) => ({ ...updatedDraft, id: lead.id }),
        },
      });

      expect(newState.leads[0]).toMatchObject({
        id: "1",
        ...updatedDraft,
      });

      expect(newState.history).toHaveLength(1);
    });

    it("should return unchanged state if lead not found", () => {
      const newState = leadsReducer(initialState, {
        type: "UPDATE_LEAD",
        payload: {
          leadId: "nonexistent",
          updater: (lead) => ({
            id: lead.id,
            company: "X",
            contact: { name: "Y", email: "" },
            status: "New",
            details: { value: 0, tags: "", notes: "" },
          }),
        },
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
