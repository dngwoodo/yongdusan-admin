export type Weather = {
  PartitionKey: string;
  RowKey: string;
  wind_deg: number;
  wind_speed: number;
  temperature: number;
  humidity: number;
  wind_deg_status:
    | "W"
    | "WSW"
    | "SW"
    | "SSW"
    | "S"
    | "SSE"
    | "SE"
    | "ESE"
    | "E"
    | "ENE"
    | "NE"
    | "NNE"
    | "N"
    | "NNW"
    | "NW"
    | "WNW";
};

export type TodayWeather = {
  PartitionKey: string;
  RowKey: string;
  date: string;
  wind_deg: number;
  wind_speed: number;
  temperature: {
    min: number;
    max: number;
    current: number;
  };
  humidity: number;
  wind_deg_status:
    | "W"
    | "WSW"
    | "SW"
    | "SSW"
    | "S"
    | "SSE"
    | "SE"
    | "ESE"
    | "E"
    | "ENE"
    | "NE"
    | "NNE"
    | "N"
    | "NNW"
    | "NW"
    | "WNW";
  find_dust: number;
  ultra_find_dust: number;
};

export async function loadWeather(): Promise<Weather> {
  const data = await fetch("http://localhost:3000/api/v1/weather", {
    method: "GET",
  });

  return data.json();
}

export async function loadTodayWeather(): Promise<TodayWeather> {
  const data = await fetch("http://localhost:3000/api/v1/weather-today", {
    method: "GET",
  });

  return data.json();
}
