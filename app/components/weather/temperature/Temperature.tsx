import { Card, Title } from "@mantine/core";
import { useEffect, useState } from "react";
import ECharts from "echarts-for-react";
import dayjs from "dayjs";

type Props = {
  weather: any;
};

export function Temperature({ weather }: Props) {
  const [options, setOptions] = useState<any>({ ...DEFAULT_CHART_OPTIONS });

  useEffect(() => {
    setOptions((prev: any) => ({
      ...prev,
      dataset: {
        source: [
          ...prev.dataset.source,
          [weather.PartitionKey, weather.temperature],
        ],
      },
    }));
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
    left: "0",
    right: "0",
  },
  dataset: {
    source: [],
  },
  animationDuration: 1500,
  tooltip: {
    trigger: "axis",
    formatter: (value: any) => {
      const temperature = value[0].data[1];
      return `${temperature}°C`;
    },
  },
};
