import type { ReactNode } from "react";
import { createContext, useContext, useMemo, useState } from "react";
import { SelectedRealTimeWeatherChart } from "~/components/card/RealTimeWeatherCard/components/SelectedRealTimeWeatherChart";
import { WEATHER_INFORMATION } from "~/components/card/RealTimeWeatherCard/fixtures/weatherInformation";
import { RealTimeWeatherButtonGroup } from "~/components/card/RealTimeWeatherCard/components/RealTimeWeatherButtonGroup";

export function RealTimeWeatherCardContext({
  children,
}: {
  children: ReactNode;
}) {
  const [selectedWeatherInformation, setSelectedWeatherInformation] =
    useState<string>(WEATHER_INFORMATION[0].value);

  const state = {
    selectedWeatherInformation,
  };

  const dispatch = useMemo(
    () => ({
      onSelectedWeatherInformation: setSelectedWeatherInformation,
    }),
    []
  );

  return (
    <RealTimeWeatherCardState.Provider value={state}>
      <RealTimeWeatherCardDispatch.Provider value={dispatch}>
        {children}
      </RealTimeWeatherCardDispatch.Provider>
    </RealTimeWeatherCardState.Provider>
  );
}

type ProviderState = {
  selectedWeatherInformation: string;
};

const RealTimeWeatherCardState = createContext<ProviderState | null>(null);
RealTimeWeatherCardState.displayName = "RealTimeWeatherCardState";

type ProviderDispatch = {
  onSelectedWeatherInformation: (weatherInformation: string) => void;
};

const RealTimeWeatherCardDispatch = createContext<ProviderDispatch | null>(
  null
);
RealTimeWeatherCardDispatch.displayName = "RealTimeWeatherCardDispatch";

export function useRealTimeWeatherCardState() {
  const context = useContext(RealTimeWeatherCardState);

  if (!context) {
    throw new Error("Check RealTimeWeatherCardState Provider");
  }

  return context;
}

export function useRealTimeWeatherCardDispatch() {
  const context = useContext(RealTimeWeatherCardDispatch);

  if (!context) {
    throw new Error("Check RealTimeWeatherCardDispatch Provider");
  }

  return context;
}

RealTimeWeatherCardContext.SelectedRealTimeWeatherChart =
  SelectedRealTimeWeatherChart;
RealTimeWeatherCardContext.RealTimeWeatherButtonGroup =
  RealTimeWeatherButtonGroup;
