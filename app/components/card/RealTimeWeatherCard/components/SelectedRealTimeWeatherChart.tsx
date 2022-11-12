import { TemperatureChart } from "~/components/chart/TemperatureChart";
import { HumidityChart } from "~/components/chart/HumidityChart";
import { WindSpeedChart } from "~/components/chart/WindSpeedChart";
import { Text } from "@mantine/core";
import { useRealTimeWeatherCardState } from "~/components/card/RealTimeWeatherCard/context/RealTimeWeatherCardContext";
import type { Weather } from "~/apis/weather";

type Props = {
  weather: Weather;
};

export const SelectedRealTimeWeatherChart = ({ weather }: Props) => {
  const { selectedWeatherInformation } = useRealTimeWeatherCardState();

  if (selectedWeatherInformation === "temperature") {
    return (
      <TemperatureChart xData={weather.date} yData={weather.temperature} />
    );
  }

  if (selectedWeatherInformation === "humidity") {
    return <HumidityChart xData={weather.date} yData={weather.humidity} />;
  }

  if (selectedWeatherInformation === "windSpeed") {
    return (
      <WindSpeedChart
        xData={weather.date}
        yData={weather.wind_speed}
        y1Data={weather.wind_deg_status}
      />
    );
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
