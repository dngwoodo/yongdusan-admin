export const generateForShowCount = (
  showCount: number,
  getMockData: () => number | string
) => Array(showCount).fill(0).map(getMockData);
