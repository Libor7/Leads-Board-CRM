import TextField from "@mui/material/TextField";
import { memo } from "react";

type LeadSearchInputProps = {
  value: string;
  onChange: (value: string) => void;
};

const LeadSearchInput = memo(({ value, onChange }: LeadSearchInputProps) => {
  return (
    <TextField
      fullWidth
      label="Search"
      placeholder="Type to search…"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
});

export default LeadSearchInput;
