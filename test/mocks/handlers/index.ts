import { weatherHandler } from "./weather";
import { visitorCount } from "./visitor";

export const handlers = [...weatherHandler, ...visitorCount];
