import ECharts from "echarts-for-react";
import { DEFAULT_CHART_OPTIONS } from "~/components/chart/configs/defaultChartOptions";
import { useEffect, useState } from "react";

// TODO: 타입 변경 필요
type Props = { dataset: any };

export default function VisitorCountChart({ dataset }: Props) {
  const seriesCount = dataset.dimensions.length - 1;
  const [options, setOptions] = useState<echarts.EChartsOption>({
    ...DEFAULT_CHART_OPTIONS,
    series: Array(seriesCount)
      .fill(0)
      .map(() => ({ type: "bar" })),
    dataset,
  });

  useEffect(() => {
    setOptions((prev) => {
      return {
        ...prev,
        dataset,
      };
    });
  }, [dataset]);

  return <ECharts option={options} opts={{ renderer: "svg" }} />;
}
