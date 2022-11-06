import ECharts from "echarts-for-react";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { buildWeather } from "../../../test/data/weather/buildWeather";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { DEFAULT_CHART_OPTIONS } from "~/components/chart/configs/defaultChartOptions";

type Props = {
  xData: string;
  yData: number;
};

export function HumidityChart({ xData, yData }: Props) {
  const [options, setOptions] = useState<any>({
    ...DEFAULT_CHART_OPTIONS,
    dataset: {
      ...DEFAULT_CHART_OPTIONS.dataset,
      source: Array(20)
        .fill(0)
        .map(() => {
          const weather = buildWeather();
          return [weather.PartitionKey, weather.humidity];
        }),
    },
    series: [
      {
        ...DEFAULT_CHART_OPTIONS.series[0],
        label: {
          ...DEFAULT_CHART_OPTIONS.series[0].label,
          formatter: (value: any) => {
            const humidity = value.data[1];
            return `${humidity}%`;
          },
        },
      },
    ],
    tooltip: {
      ...DEFAULT_CHART_OPTIONS.tooltip,
      formatter: (value: any) => {
        dayjs.extend(localizedFormat);
        const [time, humidity] = value[0].data;
        return `${dayjs(time).format("lll")}: ${humidity}%`;
      },
    },
  });

  useEffect(() => {
    setOptions((prev: any) => {
      const source = [...prev.dataset.source];

      return {
        ...prev,
        dataset: {
          source: [...source, [xData, yData]],
        },
      };
    });
  }, [xData, yData]);

  return <ECharts option={options} opts={{ renderer: "svg" }} />;
}
