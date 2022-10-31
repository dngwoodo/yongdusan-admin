import { Card, Title } from "@mantine/core";
import { useEffect, useState } from "react";
import ECharts from "echarts-for-react";
import dayjs from "dayjs";
import { buildWeather } from "../../../../test/data/weather/buildWeather";
import localizedFormat from "dayjs/plugin/localizedFormat";

type Props = {
  weather: any;
};

export function Temperature({ weather }: Props) {
  const [options, setOptions] = useState<any>({ ...DEFAULT_CHART_OPTIONS });

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

  return (
    <Card shadow="sm" p="lg" radius="md" withBorder>
      <Title order={2}>Temperature</Title>
      <Card.Section>
        <ECharts option={options} opts={{ renderer: "svg" }} />
      </Card.Section>
    </Card>
  );
}

const SHOW_COUNT = 20;

const DEFAULT_CHART_OPTIONS = {
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
    min: -20,
    max: 100,
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
        formatter: (value: any) => {
          const temperature = value.data[1];
          return `${temperature}°C`;
        },
      },
    },
  ],
  grid: {
    left: "50",
    right: "50",
  },
  dataset: {
    source: Array(SHOW_COUNT)
      .fill(0)
      .map(() => {
        const weather = buildWeather();
        return [weather.PartitionKey, weather.temperature];
      }),
  },
  animationDuration: 1200,
  tooltip: {
    trigger: "axis",
    formatter: (value: any) => {
      dayjs.extend(localizedFormat);
      const [time, temperature] = value[0].data;
      return `${dayjs(time).format("lll")}: ${temperature}°C`;
    },
  },
};
