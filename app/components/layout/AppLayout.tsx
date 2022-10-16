import { AppShell } from "@mantine/core";
import type { ReactNode } from "react";
import { Layout } from "~/components/layout/context/Layout";

type Props = {
  children: ReactNode;
};

export function AppLayout({ children }: Props) {
  return (
    <Layout>
      <AppShell
        padding="md"
        header={<Layout.Header />}
        navbar={<Layout.Sidebar />}
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
    </Layout>
  );
}
