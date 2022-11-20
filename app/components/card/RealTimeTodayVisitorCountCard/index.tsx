import type { TodayVisitorCount } from "~/apis/visitor";
import { DashboardCard } from "~/components/card/DashboardCard";
import dayjs from "~/libs/date";
import RealTimeTodayVisitorCountSubCard from "~/components/card/RealTimeTodayVisitorCountCard/components/RealTimeTodayVisitorCountSubCard";
import { createStyles, List } from "@mantine/core";

type Props = {
  visitorCount: TodayVisitorCount;
};

export default function RealTimeTodayVisitorCountCard({ visitorCount }: Props) {
  const { classes } = useStyles();

  // TODO: dayjs(visitorCount.date).format("YYYY년 MM월 DD일 (dd)") 클래스 만들기
  return (
    <DashboardCard
      title={dayjs(visitorCount.date).format("YYYY년 MM월 DD일 (dd)")}
    >
      <List
        listStyleType="none"
        className={classes.todayVisitorCountCardsWrapper}
      >
        <RealTimeTodayVisitorCountSubCard
          title="Gate 1 🚶🏻"
          count={visitorCount.gate_1_people_today}
        />
        <RealTimeTodayVisitorCountSubCard
          title="Gate 1 🚗"
          count={visitorCount.gate_1_car_today}
        />
        <RealTimeTodayVisitorCountSubCard
          title="Gate 2 🚶🏻"
          count={visitorCount.gate_2_people_today}
        />
        <RealTimeTodayVisitorCountSubCard
          title="오늘 방문자 수 👩‍👧‍👦"
          count={visitorCount.total_people_today}
        />
        <RealTimeTodayVisitorCountSubCard
          title="총 방문자 수 👨‍👩‍👧‍👦"
          count={visitorCount.total_people_all}
        />
      </List>
    </DashboardCard>
  );
}

const useStyles = createStyles({
  todayVisitorCountCardsWrapper: {
    flex: 1,
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
  },
});
