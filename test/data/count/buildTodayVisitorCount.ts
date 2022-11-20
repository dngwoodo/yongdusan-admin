import { faker } from "@faker-js/faker";

const date = new Date();

export const buildTodayVisitorCount = () => {
  const nextHourDate = String(new Date(date.setHours(date.getHours() + 1)));

  return {
    PartitionKey: nextHourDate,
    date: nextHourDate,
    RowKey: String(faker.datatype.bigInt()),
    // 총 방문자 수
    total_people_all: faker.datatype.number({
      min: 50000,
      max: 100000,
    }),
    // 오늘 방문자 수
    total_people_today: faker.datatype.number({
      min: 300,
      max: 1000,
    }),
    // gate1 방문자 수
    gate_1_people_today: faker.datatype.number({
      min: 100,
      max: 500,
    }),
    // gate1 차 방문자 수
    gate_1_car_today: faker.datatype.number({
      min: 100,
      max: 300,
    }),
    // gate2 방문자 수
    gate_2_people_today: faker.datatype.number({
      min: 100,
      max: 300,
    }),
  };
};
