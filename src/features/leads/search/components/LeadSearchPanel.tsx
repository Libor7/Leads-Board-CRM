import Stack from "@mui/material/Stack";

import LeadSearchInput from "./LeadSearchInput";
import LeadSearchFields from "./LeadSearchFields";
import type { LeadSearchField } from "../model/search.types";

type LeadSearchPanelProps = {
  value: string;
  onChange: (value: string) => void;
  activeFields: readonly LeadSearchField[];
  onToggleField: (field: LeadSearchField) => void;
};

const LeadSearchPanel = ({
  value,
  onChange,
  activeFields,
  onToggleField,
}: LeadSearchPanelProps) => {
  return (
    <Stack spacing={2}>
      <LeadSearchInput value={value} onChange={onChange} />
      <LeadSearchFields activeFields={activeFields} onToggle={onToggleField} />
    </Stack>
  );
};

export default LeadSearchPanel;
