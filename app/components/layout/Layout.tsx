import { AppShell } from "@mantine/core";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { useMediaQuery } from "@mantine/hooks";
import NavbarHeader from "./NavbarHeader";
import { NavbarBody } from "~/components/layout/NavbarBody";

type Props = {
  children: ReactNode;
};

export function Layout({ children }: Props) {
  const [isOpenSidebar, setIsOpenSidebar] = useState<boolean>(false);
  const matches = useMediaQuery("(min-width: 768px)", true, {
    getInitialValueInEffect: false,
  });

  useEffect(() => {
    if (!matches) {
      return;
    }

    setIsOpenSidebar(true);
  }, [matches]);

  return (
    <AppShell
      padding="md"
      header={
        <NavbarHeader
          isOpenSidebar={isOpenSidebar}
          onOpenSidebar={() => {
            setIsOpenSidebar((prev) => !prev);
          }}
        />
      }
      navbar={<NavbarBody hidden={!isOpenSidebar} />}
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      })}
    >
      {children}
    </AppShell>
  );
}
