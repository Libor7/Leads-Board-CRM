export const stringifyValue = (value: unknown) => {
  if (Array.isArray(value)) {
    return value.join(", ");
  } else if (value == null) {
    return "";
  } else {
    return String(value);
  }
};
