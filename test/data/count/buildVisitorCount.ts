import { faker } from "@faker-js/faker";
import { generateForShowCount } from "../utils/generateForShowCount";

const date = new Date();

const SHOW_COUNT = 60;

export const buildVisitorCount = () => {
  return {
    PartitionKey: String(new Date()),
    date: generateForShowCount(SHOW_COUNT, () =>
      String(new Date(date.setHours(date.getHours() + 1)))
    ),
    RowKey: String(faker.datatype.bigInt()),
    day: {
      // gate1 방문자 수
      gate_1_people: generateForShowCount(SHOW_COUNT, () =>
        faker.datatype.number({
          min: 100,
          max: 500,
        })
      ),
      // gate1 차 방문자 수
      gate_1_car: generateForShowCount(SHOW_COUNT, () =>
        faker.datatype.number({
          min: 100,
          max: 500,
        })
      ),
      // gate2 방문자 수
      gate_2_people: generateForShowCount(SHOW_COUNT, () =>
        faker.datatype.number({
          min: 100,
          max: 500,
        })
      ),
    },
    week: {
      // gate1 방문자 수
      gate_1_people: generateForShowCount(SHOW_COUNT, () =>
        faker.datatype.number({
          min: 100 * 7,
          max: 500 * 7,
        })
      ),
      // gate1 차 방문자 수
      gate_1_car: generateForShowCount(SHOW_COUNT, () =>
        faker.datatype.number({
          min: 100 * 7,
          max: 500 * 7,
        })
      ),
      // gate2 방문자 수
      gate_2_people: generateForShowCount(SHOW_COUNT, () =>
        faker.datatype.number({
          min: 100 * 7,
          max: 500 * 7,
        })
      ),
    },
    month: {
      // gate1 방문자 수
      gate_1_people: generateForShowCount(SHOW_COUNT, () =>
        faker.datatype.number({
          min: 100 * 30,
          max: 500 * 30,
        })
      ),
      // gate1 차 방문자 수
      gate_1_car: generateForShowCount(SHOW_COUNT, () =>
        faker.datatype.number({
          min: 100 * 30,
          max: 500 * 30,
        })
      ),
      // gate2 방문자 수
      gate_2_people: generateForShowCount(SHOW_COUNT, () =>
        faker.datatype.number({
          min: 100 * 30,
          max: 500 * 30,
        })
      ),
    },
  };
};
