/**
 * Checks if a key is an "activation" key (Enter or Space)
 * for keyboard accessibility on interactive elements.
 * Covers both modern and older browsers.
 */
const ACTIVATION_KEYS = new Set(["Enter", " ", "Spacebar"]);
const ACTIVATION_CODES = new Set(["Space", "NumpadEnter"]);

export const isActivationKey = ({
  code,
  key,
}: KeyboardEvent | React.KeyboardEvent) =>
  ACTIVATION_KEYS.has(key) || ACTIVATION_CODES.has(code);
