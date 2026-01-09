import { flattenToDotNotation } from "@/shared/utils/flattenToDotNotation";
import type { FilterRule } from "../model/filter.types";

export const matchFilters = <T extends object>(
  item: T,
  filters: readonly FilterRule<string>[]
): boolean => {
  if (filters.length === 0) return true;

  const flat = flattenToDotNotation(item);
  const nothingAllowed = filters.every((f) => f.values.length === 0);

  if (nothingAllowed) return false;

  return filters.some(({ field, values }) => {
    if (values.length === 0) return false;

    const itemValue = flat[field];
    if (Array.isArray(itemValue)) {
      return itemValue.some((v) => values.includes(String(v)));
    }

    return values.includes(String(itemValue));
  });
};
