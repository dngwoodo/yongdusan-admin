import type { PeriodType } from "~/components/card/RealTimeVisitorCountCard/context/RealTimeVisitorCountCardContext";

export const PERIOD: { title: string; value: PeriodType }[] = [
  {
    title: "하루 방문자",
    value: "day",
  },
  {
    title: "일주일 방문자",
    value: "week",
  },
  {
    title: "한달 방문자",
    value: "month",
  },
];
