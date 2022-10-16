import { Navbar, ScrollArea } from "@mantine/core";
import { useSidebarState } from "~/components/layout/context/layout";
import { NavbarLink } from "~/components/layout/context/navbar-link";

export function Sidebar() {
  const { isOpenSidebar } = useSidebarState();

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
        <NavbarLink>
          <NavbarLink.List />
        </NavbarLink>
      </Navbar.Section>
    </Navbar>
  );
}
