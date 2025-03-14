// Hook that retrieves a required parameter from the URL path
import { useOptionalPathParam } from './useOptionalPathParam';

// Returns a string value from the URL path parameter
// Throws an error if the parameter is not found
export const useRequiredPathParam = (key: string): string => {
  // Get the optional path parameter
  const value = useOptionalPathParam(key);

  // Throw error if the value is not present
  if (!value) {
    throw new Error(`Missing required path param: ${key}`);
  }

  return value;
};
