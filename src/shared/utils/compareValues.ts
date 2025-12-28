/**
 * Compares two values, handling arrays with deep equality.
 */
export const compareValues = (a: unknown, b: unknown): boolean => {
  if (Array.isArray(a) && Array.isArray(b)) {
    return JSON.stringify(a) !== JSON.stringify(b);
  }
  return a !== b;
};
