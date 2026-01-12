import { useEffect, useState } from "react";

export const usePipelineToolbarState = () => {
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    requestIdleCallback(() => setSearchOpen(true));
  }, []);

  useEffect(() => {
    if ("requestIdleCallback" in window) {
      const id = (window as Window & typeof globalThis).requestIdleCallback(
        () => setSearchOpen(true)
      );
      return () =>
        (window as Window & typeof globalThis).cancelIdleCallback?.(id);
    }

    const timeout = setTimeout(() => setSearchOpen(true), 0);
    return () => clearTimeout(timeout);
  }, []);

  return { filtersOpen, setFiltersOpen, searchOpen };
};
