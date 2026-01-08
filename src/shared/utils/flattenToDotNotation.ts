export const flattenToDotNotation = (obj: unknown, prefix = "") => {
  if (obj === null || typeof obj !== "object") return {};

  return Object.entries(obj).reduce<Record<string, unknown>>(
    (acc, [key, value]) => {
      const fullKey = prefix ? `${prefix}.${key}` : key;

      if (
        value !== null &&
        typeof value === "object" &&
        !Array.isArray(value)
      ) {
        Object.assign(acc, flattenToDotNotation(value, fullKey));
      } else {
        acc[fullKey] = value;
      }

      return acc;
    },
    {}
  );
};
