import type { LeadField } from "@/types";

export type FilterRule<TValue = string> = {
  field: LeadField;
  values: readonly TValue[];
};

export type FilterState<T> = {
  filters: FilterRule<T>[];
};
