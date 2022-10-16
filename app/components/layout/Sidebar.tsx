import { Navbar, ScrollArea } from "@mantine/core";
import { useSidebar } from "~/components/layout/context/Layout";
import { NavbarLink } from "~/components/layout/context/NavbarLink";

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
        <NavbarLink>
          <NavbarLink.List />
        </NavbarLink>
      </Navbar.Section>
    </Navbar>
  );
}
