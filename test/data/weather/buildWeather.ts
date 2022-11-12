import { faker } from "@faker-js/faker";

const date = new Date();

const SHOW_COUNT = 60;

const generateForShowCount = (getMockData: () => number | string) =>
  Array(SHOW_COUNT).fill(0).map(getMockData);

export const buildWeather = () => {
  return {
    PartitionKey: String(new Date()),
    date: generateForShowCount(() =>
      String(new Date(date.setHours(date.getHours() + 1)))
    ),
    RowKey: String(faker.datatype.bigInt()),
    wind_deg: generateForShowCount(() =>
      faker.datatype.number({
        min: 0,
        max: 360,
      })
    ),
    wind_speed: generateForShowCount(() =>
      faker.datatype.number({
        min: 100,
        max: 300,
      })
    ),
    temperature: generateForShowCount(() =>
      faker.datatype.float({
        min: 35,
        max: 40,
        precision: 0.1,
      })
    ),
    humidity: generateForShowCount(() =>
      faker.datatype.number({
        min: 50,
        max: 100,
      })
    ),
    wind_deg_status: generateForShowCount(
      () =>
        faker.helpers.arrayElements(
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
          ],
          1
        )[0]
    ),
  };
};
