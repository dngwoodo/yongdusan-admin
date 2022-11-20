import { useRealTimeVisitorCountCardState } from "~/components/card/RealTimeVisitorCountCard/context/RealTimeVisitorCountCardContext";
import VisitorCountChart from "~/components/chart/VisitorCountChart";
import type { VisitorCountDatasetByPeriod } from "~/routes/visitor";

type Props = {
  visitorCountDatasetByPeriod: VisitorCountDatasetByPeriod;
};

export default function SelectedRealTimeVisitorCountChart({
  visitorCountDatasetByPeriod,
}: Props) {
  const { selectedVisitorCount } = useRealTimeVisitorCountCardState();

  if (selectedVisitorCount === "day") {
    return <VisitorCountChart dataset={visitorCountDatasetByPeriod.day} />;
  }

  if (selectedVisitorCount === "week") {
    return <VisitorCountChart dataset={visitorCountDatasetByPeriod.week} />;
  }

  if (selectedVisitorCount === "month") {
    return <VisitorCountChart dataset={visitorCountDatasetByPeriod.month} />;
  }

  return <VisitorCountChart dataset={visitorCountDatasetByPeriod.day} />;
}
