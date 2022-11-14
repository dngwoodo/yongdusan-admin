import { describe, it, expect } from "vitest";
import type { PeriodWeather } from "~/apis/weather";
import { PeriodWeatherModel } from "~/models/PeriodWeatherModel/index";
import { buildPeriodWeather } from "../../../test/data/weather/buildPeriodWeather";

describe("PeriodWeatherModel", () => {
  describe("getDimessions", () => {
    it("그래프 축을 담당하는 dimensions 를 생성한다.", () => {
      const newPeriodWeather = buildPeriodWeather();
      const periodWeatherModel = new PeriodWeatherModel(newPeriodWeather);

      const { dimensions } = periodWeatherModel.toJson();

      expect(dimensions).toEqual([
        "date",
        "wind_deg",
        "wind_deg_status",
        "wind_speed",
        "temperature",
        "humidity",
        "find_dust",
        "ultra_find_dust",
      ]);
    });
  });

  it("date dimension 은 배열 가장 앞부분에 위치한다.", () => {
    const newPeriodWeather = buildPeriodWeather({
      date: [""],
    });
    const periodWeatherModel = new PeriodWeatherModel(newPeriodWeather);

    const { dimensions } = periodWeatherModel.toJson();

    expect(dimensions[0]).toBe("date");
  });

  it("Rowkey 와 PartitionKey 는 dimensions 에 포함하지 않는다.", () => {
    const newPeriodWeather = buildPeriodWeather();
    const periodWeatherModel = new PeriodWeatherModel(newPeriodWeather);

    const { dimensions } = periodWeatherModel.toJson();

    expect(
      dimensions.some(
        (dimension) =>
          dimension.includes("RowKey") || dimension.includes("PartitionKey")
      )
    ).toBeFalsy();
  });

  describe("getSource", () => {
    it("그래프 데이터를 담당하는 source 를 반환한다.", () => {
      const newPeriodWeather: PeriodWeather = {
        PartitionKey: "1",
        RowKey: "1",
        date: ["2022-01-03 13:00:00", "2022-01-03 14:00:00"],
        temperature: [1, 2],
        wind_deg: [360, 270],
      };
      const periodWeatherModel = new PeriodWeatherModel(newPeriodWeather);

      const { source } = periodWeatherModel.toJson();

      expect(source).toEqual([
        {
          date: "2022-01-03 13:00:00",
          temperature: 1,
          wind_deg: 360,
        },
        {
          date: "2022-01-03 14:00:00",
          temperature: 2,
          wind_deg: 270,
        },
      ]);
    });
  });
});
