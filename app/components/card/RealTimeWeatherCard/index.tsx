import { Card, Title } from "@mantine/core";
import { RealTimeWeatherCardContext } from "~/components/card/RealTimeWeatherCard/context/RealTimeWeatherCardContext";
import type { Weather } from "~/apis/weather";

type Props = {
  weather: Weather;
};

export function RealTimeWeatherCard({ weather }: Props) {
  return (
    <RealTimeWeatherCardContext>
      <Card
        shadow="sm"
        p="lg"
        radius="md"
        withBorder
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "367px",
        }}
      >
        <Title order={2} mb={16}>
          실시간 날씨 정보
        </Title>
        <RealTimeWeatherCardContext.RealTimeWeatherButtonGroup />
        <Card.Section
          sx={{
            flex: 1,
            flexDirection: "column",
          }}
        >
          <RealTimeWeatherCardContext.SelectedRealTimeWeatherChart
            weather={weather}
          />
        </Card.Section>
      </Card>
    </RealTimeWeatherCardContext>
  );
}
