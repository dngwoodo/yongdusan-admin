import { Navbar, ScrollArea } from "@mantine/core";
import NavbarLinkList from "~/components/layout/NavbarLinkList";

export function NavbarBody({ hidden }: { hidden: boolean }) {
  return (
    <Navbar
      width={{
        sm: 300,
        lg: 400,
      }}
      p="xs"
      hidden={hidden}
    >
      <Navbar.Section component={ScrollArea} grow mx="-xs" px="xs">
        <NavbarLinkList />
      </Navbar.Section>
    </Navbar>
  );
}
