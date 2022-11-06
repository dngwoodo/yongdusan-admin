import ECharts from "echarts-for-react";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { buildWeather } from "../../../test/data/weather/buildWeather";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { DEFAULT_CHART_OPTIONS } from "~/components/chart/configs/defaultChartOptions";
import type { Weather } from "~/apis/weather";

type Props = {
  xData: string;
  yData: number;
  y1Data: Weather["wind_deg_status"];
};

export function WindSpeedChart({ xData, yData, y1Data }: Props) {
  const [options, setOptions] = useState<any>({
    ...DEFAULT_CHART_OPTIONS,
    dataset: {
      ...DEFAULT_CHART_OPTIONS.dataset,
      source: Array(20)
        .fill(0)
        .map(() => {
          const weather = buildWeather();
          return [
            weather.PartitionKey,
            weather.wind_speed,
            weather.wind_deg_status,
          ];
        }),
    },
    series: [
      {
        ...DEFAULT_CHART_OPTIONS.series[0],
        label: {
          ...DEFAULT_CHART_OPTIONS.series[0].label,
          formatter: (value: any) => {
            const windSpeed = value.data[1];
            return `${windSpeed}m/s`;
          },
        },
        encode: {
          x: 0,
          y: 1,
        },
      },
      {
        type: "custom",
        encode: {
          x: 0,
          y: 1,
        },
        renderItem: renderArrow,
      },
    ],
    tooltip: {
      ...DEFAULT_CHART_OPTIONS.tooltip,
      formatter: (value: any) => {
        dayjs.extend(localizedFormat);
        const [time, windSpeed, windDirection] = value[0].data;
        return [
          `${dayjs(time).format("lll")}: `,
          `풍속: ${windSpeed}m/s`,
          `풍향: ${windDirection}`,
        ].join("<br>");
      },
    },
  });

  useEffect(() => {
    setOptions((prev: any) => {
      const source = [...prev.dataset.source];

      return {
        ...prev,
        dataset: {
          source: [...source, [xData, yData, y1Data]],
        },
      };
    });
  }, [xData, yData, y1Data]);

  return <ECharts option={options} opts={{ renderer: "svg" }} />;
}

// 풍향에 따른 각도 데이터
const directionMap = {};
[
  "W",
  "WSW",
  "SW",
  "SSW",
  "S",
  "SSE",
  "SE",
  "ESE",
  "E",
  "ENE",
  "NE",
  "NNE",
  "N",
  "NNW",
  "NW",
  "WNW",
].forEach((name, index) => {
  // @ts-ignore
  directionMap[name] = (Math.PI / 8) * index;
});

const renderArrow = (_: any, api: any) => {
  const arrowSize = 18;
  // api.value(0) <- weather.PartitionKey
  // api.value(1) <- weather.wind_speed
  // api.value(2) <- weather.wind_deg_status
  const position = api.coord([api.value(0), api.value(1)]);

  return {
    type: "path",
    shape: {
      pathData: "M31 16l-15-15v9h-26v12h26v9z",
      x: -arrowSize / 2,
      y: -arrowSize / 2,
      width: arrowSize,
      height: arrowSize,
    },
    position,
    // @ts-ignore
    rotation: directionMap[api.value(2)], // arrow 를 각도에 따라 돌린다.
    style: api.style({
      stroke: "#555",
      lineWidth: 1,
    }),
  };
};
