import ECharts from "echarts-for-react";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { buildWeather } from "../../../test/data/weather/buildWeather";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { DEFAULT_CHART_OPTIONS } from "~/components/chart/configs/defaultChartOptions";

export function TemperatureChart({ weather }: { weather: any }) {
  const [options, setOptions] = useState<any>({
    ...DEFAULT_CHART_OPTIONS,
    dataset: {
      ...DEFAULT_CHART_OPTIONS.dataset,
      source: Array(20)
        .fill(0)
        .map(() => {
          const weather = buildWeather();
          return [weather.PartitionKey, weather.temperature];
        }),
    },
    series: [
      {
        ...DEFAULT_CHART_OPTIONS.series[0],
        label: {
          ...DEFAULT_CHART_OPTIONS.series[0].label,
          formatter: (value: any) => {
            const temperature = value.data[1];
            return `${temperature}°C`;
          },
        },
      },
    ],
    tooltip: {
      ...DEFAULT_CHART_OPTIONS.tooltip,
      formatter: (value: any) => {
        dayjs.extend(localizedFormat);
        const [time, temperature] = value[0].data;
        return `${dayjs(time).format("lll")}: ${temperature}°C`;
      },
    },
  });

  useEffect(() => {
    setOptions((prev: any) => {
      const source = [...prev.dataset.source];

      return {
        ...prev,
        dataset: {
          source: [...source, [weather.PartitionKey, weather.temperature]],
        },
      };
    });
  }, [weather]);

  return <ECharts option={options} opts={{ renderer: "svg" }} />;
}
