import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { LeadsProvider } from "@/context/leads/leads-provider";
import { useLeadsContext } from "@/context/leads/use-leads-context";
import type { LeadDraft } from "@/types";

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <LeadsProvider>{children}</LeadsProvider>
);

describe("leads-context", () => {
  it("should provide seeded initial state", () => {
    const { result } = renderHook(() => useLeadsContext((ctx) => ctx.state), {
      wrapper,
    });

    expect(result.current.leads).toHaveLength(2);
    expect(result.current.history).toEqual([]);
  });

  it("should allow selecting dispatch", () => {
    const { result } = renderHook(
      () => useLeadsContext((ctx) => ctx.dispatch),
      { wrapper }
    );

    expect(typeof result.current).toBe("function");
  });

  it("should update lead via UPDATE_LEAD", () => {
    const { result } = renderHook(() => useLeadsContext((ctx) => ctx), {
      wrapper,
    });

    const updatedDraft: LeadDraft = {
      company: "Acme Corp Updated",
      contact: { name: "John Updated", email: "john@new.com" },
      status: "Qualified",
      details: { value: 9999, tags: ["vip"], notes: "Updated" },
    };

    act(() => {
      result.current.dispatch({
        type: "UPDATE_LEAD",
        payload: {
          leadId: "1",
          lead: updatedDraft,
        },
      });
    });

    const updatedLead = result.current.state.leads.find(
      (l) => l.id === "1"
    )!;

    expect(updatedLead.company).toBe("Acme Corp Updated");
    expect(updatedLead.status).toBe("Qualified");
    expect(result.current.state.history).toHaveLength(1);
  });

  it("should not update if lead not found", () => {
    const { result } = renderHook(() => useLeadsContext((ctx) => ctx), {
      wrapper,
    });

    act(() => {
      result.current.dispatch({
        type: "UPDATE_LEAD",
        payload: {
          leadId: "nonexistent",
          lead: {
            company: "X",
            contact: { name: "Y", email: "" },
            status: "New",
            details: { value: 0, tags: [], notes: "" },
          },
        },
      });
    });

    expect(result.current.state.history).toHaveLength(0);
  });
});
