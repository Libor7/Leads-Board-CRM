import type { LeadStatus } from "@/types";

export const leadDragId = (id: string) => `lead:${id}` as const;
export const columnDropId = (status: LeadStatus) =>
  `column:${status}` as const;
