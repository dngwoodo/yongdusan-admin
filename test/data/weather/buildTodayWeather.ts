import { faker } from "@faker-js/faker";

const date = new Date();

export const buildTodayWeather = () => {
  const getTemperature = () =>
    faker.datatype.float({
      min: 35,
      max: 40,
      precision: 0.1,
    });

  return {
    PartitionKey: String(new Date(date.setHours(date.getHours() + 1))),
    date: String(new Date(date.setHours(date.getHours() + 1))),
    RowKey: String(faker.datatype.bigInt()),
    wind_deg: faker.datatype.number({
      min: 0,
      max: 360,
    }),
    wind_speed: faker.datatype.number({
      min: 100,
      max: 300,
    }),
    temperature: {
      min: getTemperature(),
      max: getTemperature(),
      current: getTemperature(),
    },
    humidity: faker.datatype.number({
      min: 0,
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
    find_dust: faker.datatype.number({ min: 10, max: 100 }),
    ultra_find_dust: faker.datatype.number({ min: 10, max: 100 }),
  };
};
