export const collectIds = <T>(items: { id?: T }[]): T[] => {
  const result: T[] = [];
  for (let item of items) {
    if (item.id) {
      result.push(item.id);
    }
  }
  return result;
};
