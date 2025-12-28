import { Box } from "@mui/material";

import PipelineColumn from "../PipelineColumn/PipelineColumn";
import type { PipelineColumnDef } from "../types";
import styles from "./PipelineBoard.module.scss";

interface PipelineBoardProps<TItem, TColumnId extends string = string> {
  columns: PipelineColumnDef<TColumnId>[];
  groupedItems: Record<TColumnId, TItem[]>;
  renderItem: (item: TItem) => React.ReactNode;
}

const PipelineBoard = <TItem, TColumnId extends string>({
  columns,
  groupedItems,
  renderItem,
}: PipelineBoardProps<TItem, TColumnId>) => {
  return (
    <Box className={styles["board-container"]}>
      {columns.map((column) => (
        <PipelineColumn key={column.id} title={column.title}>
          {groupedItems[column.id]?.map(renderItem)}
        </PipelineColumn>
      ))}
    </Box>
  );
};

export default PipelineBoard;
