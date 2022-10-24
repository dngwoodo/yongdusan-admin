import { faker } from "@faker-js/faker";

const date = new Date();

export const buildWeather = () => {
  const newDate = new Date(date);
  return {
    PartitionKey: newDate.setDate(newDate.getHours() + 1),
    RowKey: String(faker.datatype.bigInt()),
    wind_deg: faker.datatype.number(),
    wind_speed: faker.datatype.number(),
    temperature: faker.datatype.float({
      min: 0,
      max: 40,
      precision: 0.1,
    }),
    humidity: faker.datatype.number(),
    wind_deg_status: faker.helpers.arrayElements(["동", "서", "남", "북"]),
  };
};
