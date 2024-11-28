export const validateJsonString = (value: string): boolean => {
  // from https://stackoverflow.com/a/20392392
  try {
    const parsedStr = JSON.parse(value);
    if (parsedStr && typeof parsedStr === 'object') {
      return true;
    }
  } catch (error) {}

  // an error is considered a non valid json
  return false;
};
