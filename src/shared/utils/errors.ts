export const hasMessageProperty = (err: unknown): err is { message: string } =>
  typeof err === "object" &&
  err !== null &&
  "message" in err &&
  typeof err.message === "string";
