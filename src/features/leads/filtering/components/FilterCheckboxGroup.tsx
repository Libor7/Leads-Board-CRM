import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

type FilterCheckboxGroupProps<T extends string> = {
  label: string;
  options: readonly T[];
  selected: readonly T[];
  onChange: (values: readonly T[]) => void;
};

export const FilterCheckboxGroup = <T extends string>({
  label,
  options,
  selected,
  onChange,
}: FilterCheckboxGroupProps<T>) => {
  const toggle = (value: T) => {
    onChange(
      selected.includes(value)
        ? selected.filter((v) => v !== value)
        : [...selected, value]
    );
  };

  return (
    <Stack spacing={1}>
      <Typography variant="subtitle2">{label}</Typography>
      <FormGroup>
        {options.map((option) => (
          <FormControlLabel
            key={option}
            control={
              <Checkbox
                checked={selected.includes(option)}
                onChange={() => toggle(option)}
              />
            }
            label={option}
          />
        ))}
      </FormGroup>
    </Stack>
  );
};
