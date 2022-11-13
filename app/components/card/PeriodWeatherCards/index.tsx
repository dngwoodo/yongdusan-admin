import { useActionData } from "@remix-run/react";
import { useEffect, useState } from "react";
import { createStyles, List } from "@mantine/core";
import PeriodWeatherCard from "~/components/card/PeriodWeatherCard";
import type { ActionChartData } from "~/routes/period-weather";

// TODO: 변수명 전부 갈아엎기
export function PeriodWeatherCards() {
  const actionChartData = useActionData<ActionChartData>();
  const [periodWeather, setPeriodWeather] = useState<ActionChartData[]>([]);
  const { classes } = useStyles();

  useEffect(() => {
    if (actionChartData) {
      setPeriodWeather((prev) => {
        return [...prev, actionChartData];
      });
    }
  }, [actionChartData]);

  return (
    <List listStyleType="none">
      {periodWeather.map((value, index) => (
        <List.Item key={index} className={classes.itemWrapper}>
          <PeriodWeatherCard data={value} />
        </List.Item>
      ))}
    </List>
  );
}

const useStyles = createStyles({
  itemWrapper: {
    "> div": {
      width: "100%",
    },
  },
});
