import { Card } from "@mantine/core";
import { RealTimeWeatherCardContext } from "~/components/card/RealTimeWeatherCard/context/RealTimeWeatherCardContext";
import type { Weather } from "~/apis/weather";
import { DashboardCard } from "~/components/card/DashboardCard";

type Props = {
  weather: Weather;
};

export function RealTimeWeatherCard({ weather }: Props) {
  return (
    <RealTimeWeatherCardContext>
      <DashboardCard title="실시간 날씨 정보">
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
      </DashboardCard>
    </RealTimeWeatherCardContext>
  );
}
