import {
  ActionIcon,
  AppShell,
  Group,
  Header,
  MediaQuery,
  Navbar,
  ScrollArea,
  UnstyledButton,
  useMantineColorScheme,
} from "@mantine/core";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import NavbarLinkList from "~/components/layout/NavbarLinkList";
import {
  IconLayoutSidebarLeftCollapse,
  IconLayoutSidebarLeftExpand,
  IconMoonStars,
  IconSun,
} from "@tabler/icons";
import { useMediaQuery } from "@mantine/hooks";

type Props = {
  children: ReactNode;
};

export function Layout({ children }: Props) {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const [isOpenSiderbar, setIsOpenSidebar] = useState<boolean>(false);
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
        <>
          <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
            <Header height={60} p="xs">
              <Group sx={{ height: "100%" }} px={20} position="apart">
                <p>yongdusan</p>
                <ActionIcon
                  variant="default"
                  onClick={() => toggleColorScheme()}
                  size={32}
                >
                  {colorScheme === "dark" ? (
                    <IconSun size={20} />
                  ) : (
                    <IconMoonStars size={20} />
                  )}
                </ActionIcon>
              </Group>
            </Header>
          </MediaQuery>
          <MediaQuery largerThan="sm" styles={{ display: "none" }}>
            <Header height={60} p="xs">
              <Group sx={{ height: "100%" }} px={20} position="apart">
                <UnstyledButton
                  onClick={() => setIsOpenSidebar((prev) => !prev)}
                  sx={(theme) => ({
                    borderRadius: theme.radius.sm,
                    color:
                      theme.colorScheme === "dark"
                        ? theme.colors.dark[0]
                        : theme.black,
                  })}
                >
                  {isOpenSiderbar ? (
                    <IconLayoutSidebarLeftCollapse size={20} />
                  ) : (
                    <IconLayoutSidebarLeftExpand size={20} />
                  )}
                </UnstyledButton>
                <p>yongdusan</p>
                <ActionIcon
                  variant="default"
                  onClick={() => toggleColorScheme()}
                  size={32}
                >
                  {colorScheme === "dark" ? (
                    <IconSun size={20} />
                  ) : (
                    <IconMoonStars size={20} />
                  )}
                </ActionIcon>
              </Group>
            </Header>
          </MediaQuery>
        </>
      }
      navbar={
        <Navbar
          width={{
            sm: 300,
            lg: 400,
          }}
          p="xs"
          hidden={!isOpenSiderbar}
        >
          <Navbar.Section component={ScrollArea} grow mx="-xs" px="xs">
            <NavbarLinkList />
          </Navbar.Section>
        </Navbar>
      }
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
