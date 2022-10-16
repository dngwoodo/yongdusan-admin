import {
  ActionIcon,
  Group,
  Header,
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

type Props = {
  isOpenSidebar: boolean;
  onOpenSidebar: () => void;
};

export default function NavbarHeader({ isOpenSidebar, onOpenSidebar }: Props) {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
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
              onClick={() => onOpenSidebar()}
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
        </Header>
      </MediaQuery>
    </>
  );
}
