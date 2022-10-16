import { Navbar, ScrollArea } from "@mantine/core";
import NavbarLinkList from "~/components/layout/NavbarLinkList";
import { useSidebar } from "~/components/layout/Layout";

export function Sidebar() {
  const { isOpenSidebar } = useSidebar();

  return (
    <Navbar
      width={{
        sm: 300,
        lg: 400,
      }}
      p="xs"
      hidden={!isOpenSidebar}
    >
      <Navbar.Section component={ScrollArea} grow mx="-xs" px="xs">
        <NavbarLinkList />
      </Navbar.Section>
    </Navbar>
  );
}
