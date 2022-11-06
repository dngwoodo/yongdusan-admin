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

export async function loadWeather() {
  const data = await fetch("http://localhost:3000/api/v1/weather", {
    method: "GET",
  });

  return data.json();
}
