import type { PeriodWeather } from "~/apis/weather";

export type Source = Omit<PeriodWeather, "PartitionKey" | "RowKey" | "wind"> & {
  wind_speed?: number;
};

export type Dimensions = keyof Source;
