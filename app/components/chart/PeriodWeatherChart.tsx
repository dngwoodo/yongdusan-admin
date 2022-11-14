import ECharts from "echarts-for-react";
import { useRef } from "react";
import { DEFAULT_CHART_OPTIONS } from "~/components/chart/configs/defaultChartOptions";
import dayjs from "~/libs/date";
import type { ActionChartData } from "~/routes/period-weather";

type Props = {
  data: ActionChartData;
};

export function PeriodWeatherChart({ data }: Props) {
  const options = useRef<echarts.EChartsOption>({
    ...DEFAULT_CHART_OPTIONS,
    grid: {
      ...DEFAULT_CHART_OPTIONS.grid,
      top: 20,
    },
    dataZoom: [
      // 그래프 내부에 마우스로 범위 지정 가능
      {
        type: "inside",
        xAxisIndex: 0,
        minSpan: 5,
        start: 0, // percentage
        end: 10, // percentage
      },
      // 아래에 슬라이더 제공
      {
        type: "slider",
        xAxisIndex: 0,
        minSpan: 5,
        bottom: 10,
      },
    ],
    dataset: {
      dimensions: data.dimensions,
      source: data.source as any,
    },
    yAxis: [
      {
        type: "value",
      },
    ],
    series: data.dimensions
      .map((dimension) => {
        if (dimension === "date" || dimension === "wind_deg_status") {
          return null;
        }

        return SERIES[dimension];
      })
      .filter(Boolean) as any,
    tooltip: {
      ...DEFAULT_CHART_OPTIONS.tooltip,
      formatter: (value: any) => {
        const {
          date,
          find_dust,
          ultra_find_dust,
          temperature,
          humidity,
          wind_speed,
          wind_deg_status,
        } = value[0].data;
        return [
          `${dayjs(date).format("lll")}: `,
          temperature && `온도: ${temperature}°C`,
          humidity && `습도: ${humidity}%`,
          wind_speed && `풍속: ${wind_speed}m/s`,
          wind_deg_status && `풍향: ${wind_deg_status}`,
          find_dust && `미세먼지: ${find_dust}`,
          ultra_find_dust && `초미세먼지: ${ultra_find_dust}`,
        ]
          .filter(Boolean)
          .join("<br>");
      },
    },
  });

  return <ECharts option={options.current} opts={{ renderer: "svg" }} />;
}

const SERIES = {
  wind_speed: {
    name: "풍속",
    type: "line",
    yAxisIndex: 0,
    encode: {
      x: "date",
      y: "wind_speed",
    },
  },
  find_dust: {
    name: "미세먼지",
    type: "line",
    yAxisIndex: 0,
    encode: {
      x: "date",
      y: "find_dust",
    },
  },
  ultra_find_dust: {
    name: "초미세먼지",
    type: "line",
    yAxisIndex: 0,
    encode: {
      x: "date",
      y: "ultra_find_dust",
    },
  },
  humidity: {
    name: "습도",
    type: "line",
    yAxisIndex: 0,
    encode: {
      x: "date",
      y: "humidity",
    },
  },
  temperature: {
    name: "온도",
    type: "line",
    yAxisIndex: 0,
    encode: {
      x: "date",
      y: "temperature",
    },
  },
  wind_deg: {
    name: "풍향",
    type: "custom",
    yAxisIndex: 0,
    encode: {
      x: "date",
      y: "wind_speed",
    },
    renderItem: (
      _: echarts.CustomSeriesRenderItemParams,
      api: echarts.CustomSeriesRenderItemAPI
    ) => {
      const arrowSize = 18;
      const position = api.coord([api.value("date"), api.value("wind_speed")]);

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
        rotation: api.value("wind_deg"), // arrow 를 각도에 따라 돌린다.
        style: api.style({
          stroke: "#555",
          lineWidth: 1,
        }),
      };
    },
  },
};
