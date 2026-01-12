import Box from "@mui/material/Box";

import type { PipelineColumnDef } from "../types";
import PipelineColumn from "../PipelineColumn/PipelineColumn";
import styles from "./PipelineBoard.module.scss";
import { memo } from "react";

type PipelineBoardProps<TItem, TColumnId extends string = string> = {
  columns: PipelineColumnDef<TColumnId>[];
  groupedItems: Record<TColumnId, TItem[]>;
  renderItem: (item: TItem) => React.ReactNode;
};

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
PipelineBoard.whyDidYouRender = true;

export default memo(PipelineBoard) as typeof PipelineBoard;
