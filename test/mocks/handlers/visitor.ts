import { rest } from "msw";
import { buildTodayVisitorCount } from "../../data/count/buildTodayVisitorCount";

const BASE_URL = "http://localhost:3000";

const getApiUrl = (url: string) => `${BASE_URL}/api/v1/${url}`;

export const visitorCount = [
  rest.get(getApiUrl("today-visitor"), (req, res, ctx) => {
    return res(ctx.json(buildTodayVisitorCount()));
  }),
];
