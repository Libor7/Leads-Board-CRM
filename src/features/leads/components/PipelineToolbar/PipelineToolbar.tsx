import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";

import type { PipelineToolbarProps } from "./PipelineToolbar.types";
import { LeadFilterPanel } from "@/features/leads/filtering/components/LeadFilterPanel";
import LeadSearchPanel from "@/features/leads/search/components/LeadSearchPanel";

const PipelineToolbar = ({
  searchQuery,
  onSearchChange,
  activeSearchFields,
  onToggleSearchField,
  filters,
  onFilterChange,
  allTags,
  onResetAll,
}: PipelineToolbarProps) => {
  return (
    <Stack spacing={2} mb={3}>
      <LeadSearchPanel
        value={searchQuery}
        activeFields={activeSearchFields}
        onChange={onSearchChange}
        onToggleField={onToggleSearchField}
      />
      <Divider />
      <LeadFilterPanel
        filters={filters}
        onChange={onFilterChange}
        allTags={allTags}
      />
      <Divider />
      <Button color="secondary" onClick={onResetAll}>
        Reset all
      </Button>
    </Stack>
  );
};

export default PipelineToolbar;
