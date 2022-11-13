import { Card, createStyles, Flex, Image, Text } from "@mantine/core";
import { useCardStyles } from "~/hooks/card/useCardStyles";
import type { TodayWeather } from "~/apis/weather";
import arrow from "~/assets/arrow.png";

type Props = {
  weather: TodayWeather;
};

export function RealTimeTodayWindCard({ weather }: Props) {
  const { classes: commonCardClasses } = useCardStyles();
  const { classes } = useStyles(weather.wind_deg);

  return (
    <Card
      className={`${commonCardClasses.wrapper} ${commonCardClasses.subCardWrapper}`}
    >
      <Flex className={classes.todayWeatherInformationWrapper}>
        <Text className={classes.todayWeatherInformation}>바람</Text>
        <Text className={classes.todayWeatherInformation}>
          {weather.wind_speed}m/s
        </Text>
      </Flex>
      <Image
        src={arrow}
        alt="wind_deg"
        className={classes.todayWeatherInformationImage}
        width={30}
        height={30}
      />
    </Card>
  );
}

const useStyles = (windDeg: TodayWeather["wind_deg"]) => {
  return createStyles({
    todayWeatherInformationWrapper: {
      marginRight: "8px",
    },
    todayWeatherInformation: {
      "&:first-of-type": {
        marginRight: "4px",
      },
    },
    todayWeatherInformationImage: {
      transform: `rotate(${windDeg}deg)`,
    },
  })();
};
