const breakPoints = {
  mobile: 768,
  tablet: 1024,
  desktop: 1365,
};

const mediaQuery = (maxWidth: number) => `(max-width: ${maxWidth}px)`;

export const mediaQueries = {
  mobile: mediaQuery(breakPoints.mobile), // 0 - 768
  tablet: mediaQuery(breakPoints.tablet), // 0 - 1024
  desktop: mediaQuery(breakPoints.desktop), // 0 - 1365
};
