import { describe, it, expect } from "vitest";

import type { Lead } from "@/types";
import { generateId } from "@/shared/utils/id";
import { createChangeDetails, createLeadHistoryEntry } from "@/context/leads/reducer/leads.handlers";

describe("leads-helpers", () => {
  describe("generateId", () => {
    it("should generate a string id", () => {
      const id = generateId();
      expect(typeof id).toBe("string");
      expect(id.length).toBeGreaterThan(0);
    });

    it("should generate unique ids", () => {
      const id1 = generateId();
      const id2 = generateId();
      expect(id1).not.toBe(id2);
    });
  });

  describe("createChangeDetails", () => {
    it("should detect changes in status", () => {
      const oldLead: Lead = {
        id: "1",
        company: "ABC",
        contact: { name: "John", email: "john@abc.com" },
        status: "New",
        details: { value: 1000, tags: "", notes: "" },
      };
      const newLead: Lead = { ...oldLead, status: "Contacted" };

      const changes = createChangeDetails(oldLead, newLead);
      expect(changes).toEqual([
        { field: "status", oldValue: "New", newValue: "Contacted" },
      ]);
    });

    it("should detect multiple changes", () => {
      const oldLead: Lead = {
        id: "1",
        company: "ABC",
        contact: { name: "John", email: "john@abc.com" },
        status: "New",
        details: { value: 1000, tags: "", notes: "" },
      };
      const newLead: Lead = {
        ...oldLead,
        status: "Contacted",
        company: "XYZ",
        details: { ...oldLead.details, value: 2000 },
      };

      const changes = createChangeDetails(oldLead, newLead);
      expect(changes).toHaveLength(3);
      expect(changes).toContainEqual({
        field: "status",
        oldValue: "New",
        newValue: "Contacted",
      });
      expect(changes).toContainEqual({
        field: "company",
        oldValue: "ABC",
        newValue: "XYZ",
      });
      expect(changes).toContainEqual({
        field: "details.value",
        oldValue: 1000,
        newValue: 2000,
      });
    });

    it("should handle array changes", () => {
      const oldLead: Lead = {
        id: "1",
        company: "ABC",
        contact: { name: "John", email: "john@abc.com" },
        status: "New",
        details: { value: 1000, tags: "tag1", notes: "" },
      };
      const newLead: Lead = {
        ...oldLead,
        details: { ...oldLead.details, tags: "tag1, tag2" },
      };

      const changes = createChangeDetails(oldLead, newLead);
      expect(changes).toEqual([
        {
          field: "details.tags",
          oldValue: ["tag1"],
          newValue: ["tag1", "tag2"],
        },
      ]);
    });

    it("should return empty array if no changes", () => {
      const lead: Lead = {
        id: "1",
        company: "ABC",
        contact: { name: "John", email: "john@abc.com" },
        status: "New",
        details: { value: 1000, tags: "", notes: "" },
      };

      const changes = createChangeDetails(lead, lead);
      expect(changes).toEqual([]);
    });
  });

  describe("createLeadHistoryEntry", () => {
    it("should create history entry for updated lead", () => {
      const oldLead: Lead = {
        id: "1",
        company: "ABC",
        contact: { name: "John", email: "john@abc.com" },
        status: "New",
        details: { value: 1000, tags: "", notes: "" },
      };
      const newLead: Lead = { ...oldLead, status: "Contacted" };

      const entry = createLeadHistoryEntry(newLead, oldLead);
      expect(entry.leadId).toBe("1");
      expect(entry.changes).toEqual([
        { field: "status", oldValue: "New", newValue: "Contacted" },
      ]);
    });
  });
});

