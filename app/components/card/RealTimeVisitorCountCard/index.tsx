import { DashboardCard } from "~/components/card/DashboardCard";
import { RealTimeVisitorCountCardContext } from "~/components/card/RealTimeVisitorCountCard/context/RealTimeVisitorCountCardContext";
import { Card } from "@mantine/core";
import type { VisitorCountDatasetByPeriod } from "~/routes/visitor";

type Props = {
  visitorCountDatasetByPeriod: VisitorCountDatasetByPeriod;
};

export default function RealTimeVisitorCountCard({
  visitorCountDatasetByPeriod,
}: Props) {
  return (
    <RealTimeVisitorCountCardContext>
      <DashboardCard title="실시간 방문객 수 정보">
        <RealTimeVisitorCountCardContext.RealTimeVisitorCountButtonGroup />
        <Card.Section
          sx={{
            flex: 1,
            flexDirection: "column",
          }}
        >
          <RealTimeVisitorCountCardContext.SelectedRealTimeVisitorCountChart
            visitorCountDatasetByPeriod={visitorCountDatasetByPeriod}
          />
        </Card.Section>
      </DashboardCard>
    </RealTimeVisitorCountCardContext>
  );
}
