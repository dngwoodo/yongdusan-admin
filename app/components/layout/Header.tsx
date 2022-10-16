import {
  ActionIcon,
  Group,
  Header as DsHeader,
  MediaQuery,
  UnstyledButton,
  useMantineColorScheme,
} from "@mantine/core";
import {
  IconLayoutSidebarLeftCollapse,
  IconLayoutSidebarLeftExpand,
  IconMoonStars,
  IconSun,
} from "@tabler/icons";
import { useSidebar } from "~/components/layout/context/Layout";

export default function Header() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const { isOpenSidebar, onToggleSidebar } = useSidebar();

  return (
    <>
      <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
        <DsHeader height={60} p="xs">
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
        </DsHeader>
      </MediaQuery>
      <MediaQuery largerThan="sm" styles={{ display: "none" }}>
        <DsHeader height={60} p="xs">
          <Group sx={{ height: "100%" }} px={20} position="apart">
            <UnstyledButton
              onClick={() => onToggleSidebar()}
              sx={(theme) => ({
                borderRadius: theme.radius.sm,
                color:
                  theme.colorScheme === "dark"
                    ? theme.colors.dark[0]
                    : theme.black,
              })}
            >
              {isOpenSidebar ? (
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
        </DsHeader>
      </MediaQuery>
    </>
  );
}
