import { Button, Card, Text, Title } from "@mantine/core";
import { TemperatureChart } from "~/components/chart/TemperatureChart";
import { useState } from "react";
import { HumidityChart } from "~/components/chart/HumidityChart";
import { WindDirectionChart } from "~/components/chart/WindDirection";
import { WindSpeedChart } from "~/components/chart/WindSpeed";

type Props = {
  weather: any;
};

export function RealTimeWeatherCard({ weather }: Props) {
  const [selectedWeatherInformation, setSelectedWeatherInformation] = useState(
    WEATHER_INFORMATION[0].value
  );

  const SelectedRealTimeWeatherChart = () => {
    if (selectedWeatherInformation === WEATHER_INFORMATION[0].value) {
      return <TemperatureChart weather={weather} />;
    }

    if (selectedWeatherInformation === WEATHER_INFORMATION[1].value) {
      return <HumidityChart weather={weather} />;
    }

    if (selectedWeatherInformation === WEATHER_INFORMATION[2].value) {
      return <WindDirectionChart weather={weather} />;
    }

    if (selectedWeatherInformation === WEATHER_INFORMATION[3].value) {
      return <WindSpeedChart weather={weather} />;
    }

    return (
      <Text
        sx={{
          // TODO: 정중앙 위치 필요
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        올바른 날씨 정보가 아닙니다.
      </Text>
    );
  };

  return (
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
      <Button.Group
        sx={{
          width: "100%",
        }}
      >
        {WEATHER_INFORMATION.map(({ title, value }) => (
          <Button
            sx={{
              width: "25%",
            }}
            key={value}
            variant={
              selectedWeatherInformation === value ? "gradient" : "default"
            }
            onClick={() => {
              setSelectedWeatherInformation(value);
            }}
          >
            {title}
          </Button>
        ))}
      </Button.Group>
      <Card.Section
        sx={{
          flex: 1,
          flexDirection: "column",
        }}
      >
        <SelectedRealTimeWeatherChart />
      </Card.Section>
    </Card>
  );
}

const WEATHER_INFORMATION = [
  {
    title: "온도",
    value: "temperature",
  },
  {
    title: "습도",
    value: "humidity",
  },
  {
    title: "풍속",
    value: "windSpeed",
  },
  {
    title: "풍향",
    value: "windDirection",
  },
];
