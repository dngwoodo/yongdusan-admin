import { Button } from "@mantine/core";
import {
  useRealTimeVisitorCountCardDispatch,
  useRealTimeVisitorCountCardState,
} from "~/components/card/RealTimeVisitorCountCard/context/RealTimeVisitorCountCardContext";
import { PERIOD } from "~/components/card/RealTimeVisitorCountCard/fixtures/period";

// TODO: ButtonGroup 코드 모듈로 뺴기
export function RealTimeVisitorCountButtonGroup() {
  const { onSelectedVisitorCount } = useRealTimeVisitorCountCardDispatch();

  const { selectedVisitorCount } = useRealTimeVisitorCountCardState();

  return (
    <Button.Group
      sx={{
        width: "100%",
      }}
    >
      {PERIOD.map(({ title, value }) => (
        <Button
          sx={{
            width: "33.3333%",
          }}
          key={value}
          variant={selectedVisitorCount === value ? "gradient" : "default"}
          onClick={() => {
            onSelectedVisitorCount(value);
          }}
        >
          {title}
        </Button>
      ))}
    </Button.Group>
  );
}
