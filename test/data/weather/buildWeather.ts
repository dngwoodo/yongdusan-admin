import { faker } from "@faker-js/faker";

const date = new Date();

export const buildWeather = () => {
  return {
    PartitionKey: new Date(date.setHours(date.getHours() + 1)),
    RowKey: String(faker.datatype.bigInt()),
    wind_deg: faker.datatype.number({
      min: 0,
      max: 360,
    }),
    wind_speed: faker.datatype.number({
      min: 100,
      max: 300,
    }),
    temperature: faker.datatype.float({
      min: 35,
      max: 40,
      precision: 0.1,
    }),
    humidity: faker.datatype.number({
      min: 50,
      max: 100,
    }),
    wind_deg_status: faker.helpers.arrayElements(
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
    )[0],
  };
};
