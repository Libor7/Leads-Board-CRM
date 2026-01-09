import type { Lead } from "@/types";

export const getTagsFromLeads = (leads: Lead[]) => {
  const set = new Set<string>();
  leads.forEach((lead) => {
    lead.details.tags
      ?.split(",")
      .map((t) => t.trim())
      .filter(Boolean)
      .forEach((t) => set.add(t));
  });
  return Array.from(set);
};
