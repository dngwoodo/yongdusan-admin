import { TemperatureChart } from "~/components/chart/TemperatureChart";
import { HumidityChart } from "~/components/chart/HumidityChart";
import { WindSpeedChart } from "~/components/chart/WindSpeed";
import { WindDirectionChart } from "~/components/chart/WindDirection";
import { Text } from "@mantine/core";
import { useRealTimeWeatherCardState } from "~/components/card/RealTimeWeatherCard/context/RealTimeWeatherCardContext";

type Props = {
  weather: any;
};

export const SelectedRealTimeWeatherChart = ({ weather }: Props) => {
  const { selectedWeatherInformation } = useRealTimeWeatherCardState();

  if (selectedWeatherInformation === "temperature") {
    return <TemperatureChart weather={weather} />;
  }

  if (selectedWeatherInformation === "humidity") {
    return <HumidityChart weather={weather} />;
  }

  if (selectedWeatherInformation === "windDirection") {
    return <WindDirectionChart weather={weather} />;
  }

  if (selectedWeatherInformation === "windSpeed") {
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
