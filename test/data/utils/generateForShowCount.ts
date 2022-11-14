export const generateForShowCount = <T>(
  showCount: number,
  getMockData: () => T
) => Array(showCount).fill(0).map(getMockData);
