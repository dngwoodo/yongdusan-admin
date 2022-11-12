import type { Weather } from "~/apis/weather";

// TODO: 수정 필요
function getDirectionMap(): {
  [P in Weather["wind_deg_status"]]: number;
} {
  // 풍향에 따른 각도 데이터
  const result = {};

  [
    "W",
    "WSW",
    "SW",
    "SSW",
    "S",
    "SSE",
    "SE",
    "ESE",
    "E",
    "ENE",
    "NE",
    "NNE",
    "N",
    "NNW",
    "NW",
    "WNW",
  ].forEach((name, index) => {
    // @ts-ignore
    result[name] = (Math.PI / 8) * index;
  });

  return result as {
    [P in Weather["wind_deg_status"]]: number;
  };
}

export const DIRECTION_MAP = getDirectionMap();
