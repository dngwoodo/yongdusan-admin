import ECharts from "echarts-for-react";
import dayjs from "~/libs/date";
import { useEffect, useState } from "react";
import { DEFAULT_CHART_OPTIONS } from "~/components/chart/configs/defaultChartOptions";

type Props = {
  xData: string[];
  yData: number[];
};

export function HumidityChart({ xData, yData }: Props) {
  const [options, setOptions] = useState<echarts.EChartsOption>({
    ...DEFAULT_CHART_OPTIONS,

    series: [
      {
        /* @ts-ignore */
        ...DEFAULT_CHART_OPTIONS.series[0],
        label: {
          /* @ts-ignore */
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
        const [time, humidity] = value[0].data;
        return `${dayjs(time).format("lll")}: ${humidity}%`;
      },
    },
  });

  useEffect(() => {
    setOptions((prev: any) => {
      const source = xData.map((value, index) => {
        return [value, yData[index]];
      });

      return {
        ...prev,
        dataset: {
          source,
        },
      };
    });
  }, [xData, yData]);

  return <ECharts option={options} opts={{ renderer: "svg" }} />;
}
