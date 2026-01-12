import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import { lazy, Suspense } from "react";

import type { PipelineToolbarProps } from "./PipelineToolbar.types";
import LeadSearchPanel from "@/features/leads/search/components/LeadSearchPanel";
import { usePipelineToolbarState } from "./usePipelineToolbarState";

const LeadFilterPanel = lazy(
  () => import("@/features/leads/filtering/components/LeadFilterPanel")
);

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
  const { filtersOpen, setFiltersOpen, searchOpen } = usePipelineToolbarState();

  return (
    <Stack spacing={2} mb={3}>
      {searchOpen && (
        <LeadSearchPanel
          value={searchQuery}
          activeFields={activeSearchFields}
          onChange={onSearchChange}
          onToggleField={onToggleSearchField}
        />
      )}
      <Divider />
      {filtersOpen && (
        <Suspense fallback={null}>
          <LeadFilterPanel
            filters={filters}
            onChange={onFilterChange}
            allTags={allTags}
          />
        </Suspense>
      )}
      <Divider />
      <Button color="secondary" onClick={onResetAll}>
        Reset all
      </Button>
      <Button onClick={() => setFiltersOpen((prev) => !prev)}>
        {filtersOpen ? "Hide" : "Show"} Filters
      </Button>
    </Stack>
  );
};

PipelineToolbar.whyDidYouRender = true;

export default PipelineToolbar;
