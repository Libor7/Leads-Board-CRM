import { useState, useEffect, useRef } from "react";
import debounce from "lodash.debounce";

export const useDebouncedValue = (value: string, delay = 300) => {
  const [debounced, setDebounced] = useState(value);

  const handler = useRef(debounce((val: string) => setDebounced(val), delay));

  useEffect(() => {
    handler.current = debounce((val: string) => setDebounced(val), delay);

    return () => {
      handler.current.cancel();
    };
  }, [delay]);

  useEffect(() => {
    handler.current(value);
  }, [value]);

  return debounced;
};
