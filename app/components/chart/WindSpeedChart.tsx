import ECharts from "echarts-for-react";
import dayjs from "~/libs/date";
import { useEffect, useState } from "react";
import { DEFAULT_CHART_OPTIONS } from "~/components/chart/configs/defaultChartOptions";
import type { Weather } from "~/apis/weather";
import { DIRECTION_MAP } from "~/fixtures/weather/directionMap";

type Props = {
  xData: string[];
  yData: number[];
  y1Data: Weather["wind_deg_status"];
};

export function WindSpeedChart({ xData, yData, y1Data }: Props) {
  const [options, setOptions] = useState<any>({
    ...DEFAULT_CHART_OPTIONS,
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
    const source = xData.map((value, index) => {
      return [value, yData[index], y1Data[index]];
    });

    setOptions((prev: any) => {
      return {
        ...prev,
        dataset: {
          source,
        },
      };
    });
  }, [xData, yData, y1Data]);

  return <ECharts option={options} opts={{ renderer: "svg" }} />;
}

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
    rotation: DIRECTION_MAP[api.value(2)], // arrow 를 각도에 따라 돌린다.
    style: api.style({
      stroke: "#555",
      lineWidth: 1,
    }),
  };
};
