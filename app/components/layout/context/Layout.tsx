import type { ReactNode } from "react";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
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

  const state = { isOpenSidebar };
  const dispatch = useMemo(
    () => ({ onToggleSidebar: handleToggleSidebar }),
    []
  );

  return (
    <SidebarState.Provider value={state}>
      <SidebarDispatch.Provider value={dispatch}>
        {children}
      </SidebarDispatch.Provider>
    </SidebarState.Provider>
  );
}

type ProviderState = {
  isOpenSidebar: boolean;
};

const SidebarState = createContext<ProviderState | null>(null);
SidebarState.displayName = "SidebarState";

type ProviderDispatch = {
  onToggleSidebar: () => void;
};

const SidebarDispatch = createContext<ProviderDispatch | null>(null);
SidebarDispatch.displayName = "SidebarDispatch";

export function useSidebarState() {
  const context = useContext(SidebarState);

  if (!context) {
    throw new Error("Check SidebarState Provider");
  }

  return context;
}

export function useSidebarDispatch() {
  const context = useContext(SidebarDispatch);

  if (!context) {
    throw new Error("Check SidebarDispatch Provider");
  }

  return context;
}

Layout.Header = Header;
Layout.Sidebar = Sidebar;
