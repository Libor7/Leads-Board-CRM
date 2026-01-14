import Stack from "@mui/material/Stack";

import { LEAD_STATUSES, type LeadField } from "@/types";
import { FilterCheckboxGroup } from "./FilterCheckboxGroup";
import { FilterToggleAll } from "./FilterToggleAll";
import type { FilterRule } from "../model/filter.types";

type LeadFilterPanelProps = {
  filters: FilterRule<string>[];
  onChange: (field: LeadField, values: readonly string[]) => void;
  allTags: string[];
};

const LeadFilterPanel = ({
  filters,
  onChange,
  allTags,
}: LeadFilterPanelProps) => {
  const statusFilter = filters.find((f) => f.field === "status")?.values ?? [];
  const tagFilter =
    filters.find((f) => f.field === "details.tags")?.values ?? [];

  return (
    <Stack spacing={3}>
      <FilterToggleAll
        all={LEAD_STATUSES}
        selected={statusFilter as string[]}
        onChange={(v) => onChange("status", v)}
      />
      <FilterCheckboxGroup
        label="Status"
        options={LEAD_STATUSES}
        selected={statusFilter as string[]}
        onChange={(v) => onChange("status", v)}
      />
      <FilterToggleAll
        all={allTags}
        selected={tagFilter as string[]}
        onChange={(v) => onChange("details.tags", v)}
      />
      <FilterCheckboxGroup
        label="Tags"
        options={allTags}
        selected={tagFilter as string[]}
        onChange={(v) => onChange("details.tags", v)}
      />
    </Stack>
  );
};

export default LeadFilterPanel;
