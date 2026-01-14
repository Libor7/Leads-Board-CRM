import { DndContext, type DragEndEvent } from "@dnd-kit/core";

import type { LeadStatus } from "@/types";

type PipelineDndContextProps = {
  children: React.ReactNode;
  onMoveLead: (leadId: string, toStatus: LeadStatus) => void;
};

export const PipelineDndContext = ({
  children,
  onMoveLead,
}: PipelineDndContextProps) => {
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const leadId = active.id.toString().replace("lead:", "");
    const status = over.id.toString().replace("column:", "") as LeadStatus;

    onMoveLead(leadId, status);
  };

  return <DndContext onDragEnd={handleDragEnd}>{children}</DndContext>;
};
