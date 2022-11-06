import { Button } from "@mantine/core";
import { WEATHER_INFORMATION } from "~/components/card/RealTimeWeatherCard/fixtures/weatherInformation";
import {
  useRealTimeWeatherCardDispatch,
  useRealTimeWeatherCardState,
} from "~/components/card/RealTimeWeatherCard/context/RealTimeWeatherCardContext";

export function RealTimeWeatherButtonGroup() {
  const { onSelectedWeatherInformation } = useRealTimeWeatherCardDispatch();

  const { selectedWeatherInformation } = useRealTimeWeatherCardState();

  return (
    <Button.Group
      sx={{
        width: "100%",
      }}
    >
      {WEATHER_INFORMATION.map(({ title, value }) => (
        <Button
          sx={{
            width: "33.3333%",
          }}
          key={value}
          variant={
            selectedWeatherInformation === value ? "gradient" : "default"
          }
          onClick={() => {
            onSelectedWeatherInformation(value);
          }}
        >
          {title}
        </Button>
      ))}
    </Button.Group>
  );
}
