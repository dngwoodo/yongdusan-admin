import { faker } from "@faker-js/faker";
import { generateForShowCount } from "../utils/generateForShowCount";

const date = new Date();

const SHOW_COUNT = 60;

export const buildWeather = () => {
  return {
    PartitionKey: String(new Date()),
    date: generateForShowCount(SHOW_COUNT, () =>
      String(new Date(date.setHours(date.getHours() + 1)))
    ),
    RowKey: String(faker.datatype.bigInt()),
    wind_deg: generateForShowCount(SHOW_COUNT, () =>
      faker.datatype.number({
        min: 0,
        max: 360,
      })
    ),
    wind_speed: generateForShowCount(SHOW_COUNT, () =>
      faker.datatype.number({
        min: 100,
        max: 300,
      })
    ),
    temperature: generateForShowCount(SHOW_COUNT, () =>
      faker.datatype.float({
        min: 35,
        max: 40,
        precision: 0.1,
      })
    ),
    humidity: generateForShowCount(SHOW_COUNT, () =>
      faker.datatype.number({
        min: 50,
        max: 100,
      })
    ),
    wind_deg_status: generateForShowCount(
      SHOW_COUNT,
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
