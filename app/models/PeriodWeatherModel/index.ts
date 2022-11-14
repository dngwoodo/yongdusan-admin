import type { Dimensions, Source } from "./types";
import type { PeriodWeather } from "~/apis/weather";
import type { Model } from "~/models/interface/Model";

export class PeriodWeatherModel implements Model {
  source: Source[] = [];
  dimensions: Dimensions[] = [];

  constructor(private periodWeather: PeriodWeather) {
    this.getDimensions();
    this.getSource();
  }

  private getDimensions() {
    Object.keys(this.periodWeather).forEach((key) => {
      const periodWeatherKey = key as keyof PeriodWeather;
      if (
        periodWeatherKey === "PartitionKey" ||
        periodWeatherKey === "RowKey"
      ) {
        return;
      }

      if (periodWeatherKey === "date") {
        this.dimensions.unshift(periodWeatherKey);
        return;
      }

      this.dimensions.push(periodWeatherKey);
    });
  }

  private getSource() {
    const periodWeatherKeys = Object.keys(this.periodWeather).filter(
      (key) => !(key === "PartitionKey" || key === "RowKey")
    );

    Array(this.periodWeather.date?.length || 0)
      .fill(0)
      .map((_, index) => {
        const result: Source = {};

        periodWeatherKeys.forEach((key) => {
          const periodWeatherKey = key as keyof Source;
          // @ts-ignore
          result[periodWeatherKey] =
            this.periodWeather?.[periodWeatherKey]?.[index];
        });

        this.source.push(result);
      });

    return this.source;
  }

  toJson() {
    return {
      source: this.source,
      dimensions: this.dimensions,
    };
  }
}
