import { Card, Center, createStyles, List, Text, Title } from "@mantine/core";
import { useCardStyles } from "~/hooks/card/useCardStyles";
import { getMediaScreen, mediaQueries } from "~/fixtures/styles/mediaQuery";

type Props = {
  title: string;
  count: number;
};

export default function RealTimeTodayVisitorCountSubCard({
  title,
  count,
}: Props) {
  const { classes: commonCardClasses } = useCardStyles();
  const { classes } = useStyles();

  return (
    <List.Item className={classes.todayVisitorCountCardWrapper}>
      <Card
        className={`${commonCardClasses.wrapper} ${classes.todayVisitorCountCard}`}
      >
        <Title order={3}>{title}</Title>
        <Center className={classes.todayVisitorCountWrapper}>
          <Text className={classes.todayVisitorCount} variant="gradient">
            {count}
          </Text>
        </Center>
      </Card>
    </List.Item>
  );
}

const useStyles = createStyles({
  todayVisitorCountCardWrapper: {
    flex: 1,
    minWidth: "280px",
    "& > div": {
      width: "100%",
      height: "100%",
      "& > span": {
        height: "100%",
      },
    },
  },
  todayVisitorCountCard: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100%",
  },
  todayVisitorCountWrapper: {
    flex: 1,
  },
  todayVisitorCount: {
    fontWeight: 700,
    fontSize: "48px",
    [getMediaScreen(mediaQueries.tablet)]: {
      fontSize: "32px",
    },
  },
});
