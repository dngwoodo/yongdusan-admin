import type { Count } from "~/apis/visitor";

export type VisitorCountSource = { [p in keyof Count]: number } & {
  date: string;
};

export type VisitorCountDimensions = keyof VisitorCountSource;
