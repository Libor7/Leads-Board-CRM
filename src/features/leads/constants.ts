import type { PipelineColumnDef } from "@/shared/ui/features/pipeline/types";
import type { LeadStatus } from "@/types";

export const LEAD_COLUMNS: PipelineColumnDef<LeadStatus>[] = [
  { id: "New", title: "New" },
  { id: "Contacted", title: "Contacted" },
  { id: "Qualified", title: "Qualified" },
  { id: "Won", title: "Won" },
  { id: "Lost", title: "Lost" },
];
