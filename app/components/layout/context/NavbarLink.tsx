import type { ReactNode } from "react";
import { createContext, useContext, useState } from "react";
import NavbarLinkList from "~/components/layout/NavbarLinkList";

type Props = { children: ReactNode };

export function NavbarLink({ children }: Props) {
  const [openedLabels, setOpenedLabels] = useState<string[]>([]);

  const handleChangeOpenedLabels = (label: string) => {
    if (openedLabels.includes(label)) {
      setOpenedLabels((previousOpenedLabels) =>
        previousOpenedLabels.filter(
          (previousOpenedLabel) => previousOpenedLabel !== label
        )
      );
      return;
    }

    setOpenedLabels((previousOpenedLabels) => [...previousOpenedLabels, label]);
  };

  const handleCheckIfOpenedLabel = (label: string) =>
    openedLabels.includes(label);

  const state = { openedLabels };
  const dispatch = {
    onChangeOpenedLabels: handleChangeOpenedLabels,
    onCheckIfOpenedLabel: handleCheckIfOpenedLabel,
  };

  return (
    <NavbarLinkState.Provider value={state}>
      <NavbarLinkDispatch.Provider value={dispatch}>
        {children}
      </NavbarLinkDispatch.Provider>
    </NavbarLinkState.Provider>
  );
}

type ProviderState = {
  openedLabels: string[];
};
const NavbarLinkState = createContext<ProviderState | null>(null);
NavbarLinkState.displayName = "NavbarLinkState";

type ProviderDispatch = {
  onChangeOpenedLabels: (label: string) => void;
  onCheckIfOpenedLabel: (label: string) => boolean;
};

const NavbarLinkDispatch = createContext<ProviderDispatch | null>(null);
NavbarLinkDispatch.displayName = "NavbarLinkDispatch";

export function useNavbarLinkState() {
  const context = useContext(NavbarLinkState);

  if (!context) {
    throw new Error("Check NavbarLinkState Provider");
  }

  return context;
}

export function useNavbarLinkDispatch() {
  const context = useContext(NavbarLinkDispatch);

  if (!context) {
    throw new Error("Check NavbarLinkDispatch Provider");
  }

  return context;
}

NavbarLink.List = NavbarLinkList;
