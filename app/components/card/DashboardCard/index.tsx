import type { ReactNode } from "react";
import { Card, Title } from "@mantine/core";
import type { CardProps } from "@mantine/core/lib/Card/Card";
import { useCardStyles } from "~/hooks/card/useCardStyles";

type Props = {
  title: string;
  children: ReactNode;
} & import("@mantine/utils").PolymorphicComponentProps<"div", CardProps>;

export function DashboardCard({ title, children, ...rest }: Props) {
  const { classes } = useCardStyles();

  return (
    <Card
      className={classes.wrapper}
      sx={{
        display: "flex",
        flexDirection: "column",
        marginBottom: "10px",
        minHeight: "367px",
      }}
      {...rest}
    >
      <Title order={2} mb={16}>
        {title}
      </Title>
      {children}
    </Card>
  );
}
