import { Card, createStyles, Flex, Image, Text } from "@mantine/core";
import { useCardStyles } from "~/hooks/card/useCardStyles";
import type { TodayWeather } from "~/apis/weather";
import waterDrop from "~/assets/waterDrop.png";

type Props = {
  weather: TodayWeather;
};

export function RealTimeTodayHumidityCard({ weather }: Props) {
  const { classes: commonCardClasses } = useCardStyles();
  const { classes } = useStyles();

  const getNumberOfWaterDrop = () => {
    if (weather.humidity <= 25) {
      return 1;
    }

    if (weather.humidity <= 50) {
      return 2;
    }

    if (weather.humidity <= 75) {
      return 3;
    }

    return 4;
  };

  return (
    <Card
      className={`${commonCardClasses.wrapper} ${commonCardClasses.subCardWrapper}`}
    >
      <Flex className={classes.todayWeatherInformationWrapper}>
        <Text className={classes.todayWeatherInformation}>습도</Text>
        <Text className={classes.todayWeatherInformation}>
          {weather.humidity}%
        </Text>
      </Flex>
      <Flex className={classes.todayWeatherInformationImageWrapper}>
        {Array(getNumberOfWaterDrop())
          .fill(0)
          .map((_, index) => (
            <Image
              key={index}
              alt="humidity"
              src={waterDrop}
              width={30}
              height={30}
              className={classes.todayWeatherInformationImage}
            />
          ))}
      </Flex>
    </Card>
  );
}

const useStyles = () => {
  return createStyles({
    todayWeatherInformationWrapper: {
      flexShrink: 0,
      justifyContent: "center",
      marginRight: "12px",
    },
    todayWeatherInformation: {
      "&:first-of-type": {
        marginRight: "4px",
      },
    },
    todayWeatherInformationImageWrapper: {
      flexWrap: "wrap",
      justifyContent: "center",
      gap: "4px",
    },
    todayWeatherInformationImage: {
      marginRight: "2px",
    },
  })();
};
