import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";

import { LeadsProvider } from "@/context/leads/leads-provider";
import { useLeadsContext } from "@/context/leads/use-leads-context";
import type { Lead } from "@/types";

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <LeadsProvider>{children}</LeadsProvider>
);

describe("leads-context", () => {
  describe("LeadsProvider", () => {
    it("should provide initial state", () => {
      const { result } = renderHook(() => useLeadsContext((ctx) => ctx.state), {
        wrapper,
      });

      expect(result.current.leads).toEqual([]);
      expect(result.current.history).toEqual([]);
    });
  });

  describe("useAppContext", () => {
    it("should allow selecting state", () => {
      const { result } = renderHook(
        () => useLeadsContext((ctx) => ctx.state.leads),
        { wrapper }
      );

      expect(result.current).toEqual([]);
    });

    it("should allow selecting dispatch", () => {
      const { result } = renderHook(
        () => useLeadsContext((ctx) => ctx.dispatch),
        { wrapper }
      );

      expect(typeof result.current).toBe("function");
    });
  });

  describe("dispatch actions", () => {
    it("should update lead status", () => {
      const { result } = renderHook(() => useLeadsContext((ctx) => ctx), {
        wrapper,
      });

      const newLead: Lead = {
        id: "1",
        company: "ABC Corp",
        contact: { name: "John Doe", email: "john@abc.com" },
        status: "New",
        details: { value: 50000, tags: ["urgent"], notes: "High potential" },
      };

      act(() => {
        result.current.dispatch({ type: "ADD_LEAD", payload: newLead });
      });

      act(() => {
        result.current.dispatch({
          type: "UPDATE_LEAD",
          payload: { leadId: "1", changes: { status: "Contacted" } },
        });
      });

      expect(result.current.state.leads[0].status).toBe("Contacted");
      expect(result.current.state.history).toHaveLength(2);
      expect(result.current.state.history[1].changes).toEqual([
        { field: "status", oldValue: "New", newValue: "Contacted" },
      ]);
    });

    it("should update multiple fields of a lead", () => {
      const { result } = renderHook(() => useLeadsContext((ctx) => ctx), {
        wrapper,
      });

      const newLead: Lead = {
        id: "1",
        company: "ABC Corp",
        contact: { name: "John Doe", email: "john@abc.com" },
        status: "New",
        details: { value: 50000, tags: ["urgent"], notes: "High potential" },
      };

      act(() => {
        result.current.dispatch({ type: "ADD_LEAD", payload: newLead });
      });

      act(() => {
        result.current.dispatch({
          type: "UPDATE_LEAD",
          payload: {
            leadId: "1",
            changes: {
              company: "XYZ Corp",
              contact: { name: "Jane Doe" },
              details: { value: 75000, tags: ["urgent", "hot"] },
            },
          },
        });
      });

      const updatedLead = result.current.state.leads[0];
      expect(updatedLead.company).toBe("XYZ Corp");
      expect(updatedLead.contact.name).toBe("Jane Doe");
      expect(updatedLead.contact.email).toBe("john@abc.com"); // unchanged
      expect(updatedLead.details.value).toBe(75000);
      expect(updatedLead.details.tags).toEqual(["urgent", "hot"]);

      expect(result.current.state.history[1].changes).toHaveLength(4);
    });

    it("should not update if lead not found", () => {
      const { result } = renderHook(() => useLeadsContext((ctx) => ctx), {
        wrapper,
      });

      act(() => {
        result.current.dispatch({
          type: "UPDATE_LEAD",
          payload: { leadId: "nonexistent", changes: { status: "Contacted" } },
        });
      });

      expect(result.current.state.leads).toEqual([]);
    });
  });
});
