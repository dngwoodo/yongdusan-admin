import { Card, createStyles, Flex, Image, Text } from "@mantine/core";
import { useCardStyles } from "~/hooks/card/useCardStyles";
import type { TodayWeather } from "~/apis/weather";
import good from "~/assets/findDust/good.png";
import warn from "~/assets/findDust/warn.png";
import bad from "~/assets/findDust/bad.png";

type Props = {
  weather: TodayWeather;
};

export function RealTimeTodayFindDustCard({ weather }: Props) {
  const { classes: commonCardStyles } = useCardStyles();
  const { classes } = useStyles();

  const getImageByFindDustStatus = () => {
    const { find_dust, ultra_find_dust } = weather;

    if (find_dust <= 15 || ultra_find_dust <= 15) {
      return warn;
    }

    if (find_dust <= 35 || ultra_find_dust <= 35) {
      return bad;
    }

    return good;
  };

  return (
    <Card
      className={`${commonCardStyles.wrapper} ${commonCardStyles.subCardWrapper}`}
    >
      <Flex className={classes.todayWeatherInformationWrapper}>
        <Flex>
          <Text className={classes.todayWeatherInformation}>미세먼지</Text>
          <Text className={classes.todayWeatherInformation}>
            {weather.find_dust}
          </Text>
        </Flex>
        <Flex>
          <Text className={classes.todayWeatherInformation}>초미세먼지</Text>
          <Text className={classes.todayWeatherInformation}>
            {weather.ultra_find_dust}
          </Text>
        </Flex>
      </Flex>
      <Image
        src={getImageByFindDustStatus()}
        alt="findDustStatus"
        width={50}
        height={50}
      />
    </Card>
  );
}

const useStyles = () => {
  return createStyles({
    todayWeatherInformationWrapper: {
      marginRight: "12px",
      flexDirection: "column",
    },
    todayWeatherInformation: {
      "&:first-of-type": {
        marginRight: "4px",
      },
    },
  })();
};
