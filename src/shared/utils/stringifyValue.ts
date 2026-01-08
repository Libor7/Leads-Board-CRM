export const stringifyValue = (value: unknown) => {
  if (Array.isArray(value)) {
    return value.join(", ");
  } else if (value == null) {
    return "";
  } else if (typeof value === "object") {
    return JSON.stringify(value);
  } else {
    return String(value);
  }
};
