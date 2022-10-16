import type { ReactNode } from "react";
import { createContext, useContext, useEffect, useState } from "react";
import { useMediaQuery } from "@mantine/hooks";
import Header from "~/components/layout/Header";
import { Sidebar } from "~/components/layout/Sidebar";

type Props = { children: ReactNode };

export function Layout({ children }: Props) {
  const [isOpenSidebar, setIsOpenSidebar] = useState<boolean>(false);
  const matches = useMediaQuery("(min-width: 768px)", true, {
    getInitialValueInEffect: false,
  });

  const handleToggleSidebar = () => {
    setIsOpenSidebar((prev) => !prev);
  };

  useEffect(() => {
    if (!matches) {
      return;
    }

    setIsOpenSidebar(true);
  }, [matches]);

  return (
    <SidebarContext.Provider
      value={{
        isOpenSidebar,
        onToggleSidebar: handleToggleSidebar,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
}

type ProviderState = {
  isOpenSidebar: boolean;
  onToggleSidebar: () => void;
};

const SidebarContext = createContext<ProviderState | null>(null);
SidebarContext.displayName = "Sidebar";

export function useSidebar() {
  const context = useContext(SidebarContext);

  if (!context) {
    throw new Error("Check SidebarContext Provider");
  }

  return context;
}

Layout.Header = Header;
Layout.Sidebar = Sidebar;
