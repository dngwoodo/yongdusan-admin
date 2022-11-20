import type { ReactNode } from "react";
import { createContext, useContext, useMemo, useState } from "react";
import { RealTimeVisitorCountButtonGroup } from "~/components/card/RealTimeVisitorCountCard/components/RealTimeVisitorCountButtonGroup";
import { PERIOD } from "~/components/card/RealTimeVisitorCountCard/fixtures/period";
import SelectedRealTimeVisitorCountChart from "~/components/card/RealTimeVisitorCountCard/components/SelectedRealTimeVisitorCountChart";

export type PeriodType = "day" | "week" | "month";

export function RealTimeVisitorCountCardContext({
  children,
}: {
  children: ReactNode;
}) {
  const [selectedVisitorCount, setSelectedVisitorCount] = useState<PeriodType>(
    PERIOD[0].value as "day"
  );

  const state = {
    selectedVisitorCount,
  };

  const dispatch = useMemo(
    () => ({
      onSelectedVisitorCount: setSelectedVisitorCount,
    }),
    []
  );

  return (
    <RealTimeVisitorCountCardState.Provider value={state}>
      <RealTimeVisitorCountCardDispatch.Provider value={dispatch}>
        {children}
      </RealTimeVisitorCountCardDispatch.Provider>
    </RealTimeVisitorCountCardState.Provider>
  );
}

type ProviderState = {
  selectedVisitorCount: PeriodType;
};

const RealTimeVisitorCountCardState = createContext<ProviderState | null>(null);
RealTimeVisitorCountCardState.displayName = "RealTimeVisitorCountCardState";

type ProviderDispatch = {
  onSelectedVisitorCount: (newVisitorCount: PeriodType) => void;
};

const RealTimeVisitorCountCardDispatch = createContext<ProviderDispatch | null>(
  null
);
RealTimeVisitorCountCardDispatch.displayName =
  "RealTimeVisitorCountCardDispatch";

export function useRealTimeVisitorCountCardState() {
  const context = useContext(RealTimeVisitorCountCardState);

  if (!context) {
    throw new Error("Check RealTimeVisitorCountCardState Provider");
  }

  return context;
}

export function useRealTimeVisitorCountCardDispatch() {
  const context = useContext(RealTimeVisitorCountCardDispatch);

  if (!context) {
    throw new Error("Check RealTimeVisitorCountCardDispatch Provider");
  }

  return context;
}

RealTimeVisitorCountCardContext.RealTimeVisitorCountButtonGroup =
  RealTimeVisitorCountButtonGroup;
RealTimeVisitorCountCardContext.SelectedRealTimeVisitorCountChart =
  SelectedRealTimeVisitorCountChart;
