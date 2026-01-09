import Button from "@mui/material/Button";

type FilterToggleAllProps<T extends string> = {
  all: readonly T[];
  selected: readonly T[];
  onChange: (values: readonly T[]) => void;
};

export const FilterToggleAll = <T extends string>({
  all,
  selected,
  onChange,
}: FilterToggleAllProps<T>) => {
  const allSelected = selected.length === all.length;

  return (
    <Button size="small" onClick={() => onChange(allSelected ? [] : all)}>
      {allSelected ? "Clear all" : "Select all"}
    </Button>
  );
};
