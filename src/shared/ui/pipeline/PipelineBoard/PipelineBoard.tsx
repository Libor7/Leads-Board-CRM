import { Box } from "@mui/material";

import PipelineColumn from "../PipelineColumn/PipelineColumn";
import type { PipelineColumnDef } from "../types";

interface PipelineBoardProps<TItem, TColumnId extends string = string> {
  columns: PipelineColumnDef<TColumnId>[];
  items: TItem[];
  getItemColumnId: (item: TItem) => TColumnId;
  renderItem: (item: TItem) => React.ReactNode;
}

const PipelineBoard = <TItem, TColumnId extends string = string>({
  columns,
  items,
  getItemColumnId,
  renderItem,
}: PipelineBoardProps<TItem, TColumnId>) => {
  return (
    <Box>
      {columns.map((column) => {
        const columnItems = items.filter(
          (item) => getItemColumnId(item) === column.id
        );

        return (
          <PipelineColumn key={column.id} title={column.title}>
            {columnItems.map(renderItem)}
          </PipelineColumn>
        );
      })}
    </Box>
  );
};

export default PipelineBoard;
