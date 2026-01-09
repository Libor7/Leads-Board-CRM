import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Stack from "@mui/material/Stack";

import { LEAD_SEARCH_FIELDS } from "../model/search.config";
import type { LeadSearchField } from "../model/search.types";

type LeadSearchFieldsProps = {
  activeFields: readonly LeadSearchField[];
  onToggle: (field: LeadSearchField) => void;
};

const LeadSearchFields = ({
  activeFields,
  onToggle,
}: LeadSearchFieldsProps) => {
  return (
    <Stack direction="row" spacing={2}>
      {LEAD_SEARCH_FIELDS.map(({ field, label }) => {
        const isActive = activeFields.includes(field);
        const isLastActive = isActive && activeFields.length === 1;

        return (
          <FormControlLabel
            key={field}
            control={
              <Checkbox
                checked={isActive}
                disabled={isLastActive}
                onChange={() => onToggle(field)}
              />
            }
            label={label}
          />
        );
      })}
    </Stack>
  );
};

export default LeadSearchFields;
