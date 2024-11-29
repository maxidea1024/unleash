import { useMemo } from 'react';

let counter = 0;

// Generate a globally unique ID that is stable across renders.
export const useId = (prefix = 'useId'): string => {
  return useMemo(() => {
    return `${prefix}-${counter++}`;
  }, [prefix]);
};
