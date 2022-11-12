import { DashboardCard } from "~/components/card/DashboardCard";
import { createStyles, Flex } from "@mantine/core";
import type { TodayWeather } from "~/apis/weather";
import dayjs from "~/libs/date";
import { getMediaScreen, mediaQueries } from "~/fixtures/styles/mediaQuery";
import { RealTimeTodayHumidityCard } from "~/components/card/RealTimeTodayWeatherCard/components/RealTimeTodayHumidityCard/indx";
import { RealTimeTodayWindCard } from "~/components/card/RealTimeTodayWeatherCard/components/RealTimeTodayWindCard/indx";
import { RealTimeTodayFindDustCard } from "~/components/card/RealTimeTodayWeatherCard/components/RealTimeTodayFineDustCard";
import { RealTimeTodayTemperature } from "~/components/card/RealTimeTodayWeatherCard/components/RealTimeTodayTemperature";

type Props = {
  weather: TodayWeather;
};

export function RealTimeTodayWeatherCard({ weather }: Props) {
  const { classes } = useStyles();

  return (
    <DashboardCard title={dayjs(weather.date).format("YYYY년 MM월 DD일 (dd)")}>
      <Flex className={classes.cardTop}>
        <RealTimeTodayTemperature weather={weather} />
      </Flex>
      <Flex className={classes.cardBottom}>
        <RealTimeTodayHumidityCard weather={weather} />
        <RealTimeTodayWindCard weather={weather} />
        <RealTimeTodayFindDustCard weather={weather} />
      </Flex>
    </DashboardCard>
  );
}

const useStyles = () => {
  return createStyles({
    cardTop: {
      flex: 1,
      flexDirection: "column",
      marginBottom: 0,
      justifyContent: "center",
      [getMediaScreen(mediaQueries.tablet)]: {
        marginBottom: "8px",
      },
    },
    cardBottom: {
      gap: "10px",
      flexDirection: "row",
      [getMediaScreen(mediaQueries.tablet)]: {
        flexDirection: "column",
      },
    },
  })();
};
