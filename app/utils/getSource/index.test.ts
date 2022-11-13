import { getSource } from "~/utils/getSource/index";

describe("getSource", () => {
  it("", () => {
    const source = getSource({
      PartitionKey: "",
      RowKey: "",
      temperature: [36],
      humidity: [38],
      date: ["2022-11-13 13:00:00"],
      wind_deg: [360],
      wind_speed: [40],
      wind_deg_status: ["WNW"],
      find_dust: [50],
      ultra_find_dust: [60],
    });

    expect(source).toEqual([
      {
        date: "2022-11-13 13:00:00",
        temperature: 36,
        humidity: 38,
        wind_speed: 40,
        find_dust: 50,
        ultra_find_dust: 60,
        wind_deg_status: "WNW",
        wind_deg: 360,
      },
    ]);
  });

  it("", () => {
    const source = getSource({
      PartitionKey: "",
      RowKey: "",
      temperature: [36, 40, 52],
      humidity: [38, 50, 51],
      date: [
        "2022-11-13 13:00:00",
        "2022-11-13 14:00:00",
        "2022-11-13 15:00:00",
      ],
      wind_deg: [360, 270, 250],
      wind_speed: [40, 50, 60],
      wind_deg_status: ["WNW", "WNW", "WNW"],
      find_dust: [50, 60, 70],
      ultra_find_dust: [60, 70, 70],
    });

    expect(source).toEqual([
      {
        date: "2022-11-13 13:00:00",
        temperature: 36,
        humidity: 38,
        wind_speed: 40,
        find_dust: 50,
        ultra_find_dust: 60,
        wind_deg_status: "WNW",
        wind_deg: 360,
      },
      {
        date: "2022-11-13 14:00:00",
        temperature: 40,
        humidity: 50,
        wind_speed: 50,
        find_dust: 60,
        ultra_find_dust: 70,
        wind_deg_status: "WNW",
        wind_deg: 270,
      },
      {
        date: "2022-11-13 15:00:00",
        temperature: 52,
        humidity: 51,
        wind_speed: 60,
        find_dust: 70,
        ultra_find_dust: 70,
        wind_deg_status: "WNW",
        wind_deg: 250,
      },
    ]);
  });
});
