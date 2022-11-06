import { rest } from "msw";
import { buildWeather } from "../../data/weather/buildWeather";

const BASE_URL = "http://localhost:3000";

const getApiUrl = (url: string) => `${BASE_URL}/api/v1/${url}`;

export const weatherHandler = [
  rest.get(getApiUrl("weather"), (req, res, ctx) => {
    return res(ctx.json(buildWeather()));
  }),
];