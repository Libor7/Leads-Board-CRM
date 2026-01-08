export const setValueByPath = <T>(obj: T, path: string, value: unknown): T => {
  const keys = path.split(".");
  const result = structuredClone(obj);

  let current: Record<string, unknown> = result as Record<string, unknown>;

  keys.forEach((key, index) => {
    if (index === keys.length - 1) {
      current[key] = value;
    } else {
      current[key] = { ...(current[key] as Record<string, unknown>) };
      current = current[key] as Record<string, unknown>;
    }
  });

  return result as T;
};
