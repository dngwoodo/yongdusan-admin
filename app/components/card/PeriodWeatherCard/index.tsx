import type { ActionChartData } from "~/routes/period-weather";
import { PeriodWeatherChart } from "~/components/chart/PeriodWeatherChart";
import { DashboardCard } from "~/components/card/DashboardCard";
import dayjs from "~/libs/date";

type Props = { data: ActionChartData };

export default function PeriodWeatherCard({ data }: Props) {
  // TODO: 타입 오류 해결 필요
  const getTitle = () => {
    // @ts-ignore
    const startDate = dayjs(data.source[0].date).format(
      "YYYY년 MM월 DD일 (dd)"
    );
    // @ts-ignore
    const endDate = dayjs(data.source[data.source.length - 1].date).format(
      "YYYY년 MM월 DD일 (dd)"
    );

    if (startDate || endDate) {
      return `${startDate} ~ ${endDate}`;
    }

    return "날씨 정보";
  };

  return (
    <DashboardCard title={getTitle()}>
      <PeriodWeatherChart data={data} />
    </DashboardCard>
  );
}
