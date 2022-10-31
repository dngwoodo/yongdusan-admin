import { faker } from "@faker-js/faker";

const date = new Date();

export const buildWeather = () => {
  return {
    PartitionKey: new Date(date.setHours(date.getHours() + 1)),
    RowKey: String(faker.datatype.bigInt()),
    wind_deg: faker.datatype.number(),
    wind_speed: faker.datatype.number(),
    temperature: faker.datatype.float({
      min: 35,
      max: 40,
      precision: 0.1,
    }),
    humidity: faker.datatype.number(),
    wind_deg_status: faker.helpers.arrayElements(["동", "서", "남", "북"]),
  };
};
