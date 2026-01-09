import { flattenToDotNotation } from "@/shared/utils/flattenToDotNotation";

export const matchSearch = <T extends object>(
  item: T,
  query: string,
  fields: readonly string[]
): boolean => {
  if (!query.trim()) return true;
  if (fields.length === 0) return true;

  const normalizedQuery = query.toLowerCase();
  const flat = flattenToDotNotation(item);

  return fields.some((field) => {
    const value = flat[field];
    return (
      typeof value === "string" &&
      value.toLowerCase().includes(normalizedQuery)
    );
  });
};
