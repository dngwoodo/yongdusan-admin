import type { PeriodWeather } from "~/apis/weather";

export type Dimensions = keyof Source;

export const getDimensions = (value: PeriodWeather) => {
  const result: Dimensions[] = [];

  Object.keys(value).forEach((key) => {
    if (key === "PartitionKey" || key === "RowKey") {
      return;
    }

    if (key === "date") {
      result.unshift(key);
      return;
    }

    // @ts-ignore
    result.push(key);
  });

  return result;
};

export type Source = Omit<PeriodWeather, "PartitionKey" | "RowKey" | "wind"> & {
  wind_speed?: number;
};

export const getSource = (periodWeather: PeriodWeather) => {
  const source: Source[] = [];

  const periodWeatherKeys = Object.keys(periodWeather).filter(
    (key) => !(key === "PartitionKey" || key === "RowKey")
  );

  Array(periodWeather.date?.length || 0)
    .fill(0)
    .map((_, index) => {
      const result: Source = {};

      periodWeatherKeys.forEach((periodWeatherKey) => {
        // @ts-ignore
        result[periodWeatherKey] = periodWeather[periodWeatherKey][index];
      });

      source.push(result);
    });

  return source;
};
