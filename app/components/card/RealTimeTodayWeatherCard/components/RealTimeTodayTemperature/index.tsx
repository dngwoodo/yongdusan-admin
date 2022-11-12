import type { TodayWeather } from "~/apis/weather";
import { createStyles, Flex, Text } from "@mantine/core";

export function RealTimeTodayTemperature({
  weather,
}: {
  weather: TodayWeather;
}) {
  const { classes } = useStyles();

  return (
    <>
      <Text className={classes.currentTemperature}>
        {weather.temperature.current}°
      </Text>
      <Flex className={classes.minAndMaxTemperatureWrapper}>
        <Text className={classes.minTemperature}>최저: 36°</Text>
        <Text>최고: 40°</Text>
      </Flex>
    </>
  );
}

const useStyles = () => {
  return createStyles({
    currentTemperature: {
      fontWeight: 700,
      fontSize: "40px",
      textAlign: "center",
    },
    minAndMaxTemperatureWrapper: {
      justifyContent: "center",
      fontSize: "16px",
    },
    minTemperature: {
      marginRight: "4px",
    },
  })();
};
