import dayjs from "dayjs";

export const DEFAULT_CHART_OPTIONS = {
  xAxis: {
    type: "category",
    axisLine: {
      show: false,
    },
    axisTick: {
      show: false,
    },
    axisLabel: {
      formatter: (value: string) => dayjs(value).format("HH:mm"),
    },
  },
  yAxis: {
    type: "value",
    axisLine: {
      show: false,
    },
    axisTick: {
      show: false,
    },
    axisLabel: {
      show: false,
    },
    splitLine: {
      show: false,
    },
  },
  series: [
    {
      type: "line",
      showSymbol: false,
      label: {
        show: true,
        position: "top",
      },
    },
  ],
  grid: {
    left: "50",
    right: "50",
  },
  dataset: {
    source: [],
  },
  animationDuration: 1200,
  tooltip: {
    trigger: "axis",
  },
};
