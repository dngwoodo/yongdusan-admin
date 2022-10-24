import type { LinksFunction, MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import type { ColorScheme } from "@mantine/core";
import {
  ColorSchemeProvider,
  createEmotionCache,
  MantineProvider,
} from "@mantine/core";
import resetStyle from "~/styles/reset.css";
import globalStyle from "~/styles/global.css";
import fontStyle from "~/styles/font.css";
import { setupMocks } from "../test/mocks";
import { useState } from "react";
import { AppLayout } from "~/components/layout/AppLayout";

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "yongdusan admin",
  viewport: "width=device-width,initial-scale=1",
});

createEmotionCache({ key: "mantine" });

export const links: LinksFunction = () => {
  return [
    {
      rel: "stylesheet",
      href: resetStyle,
    },
    {
      rel: "stylesheet",
      href: globalStyle,
    },
    {
      rel: "stylesheet",
      href: fontStyle,
    },
  ];
};

export async function loader() {
  return {
    ENV: {
      APP_API_URL: process.env.APP_API_URL,
      REMIX_PUBLIC_API_MOCKING: process.env.REMIX_PUBLIC_API_MOCKING,
    },
  };
}

export default async function App() {
  const data = useLoaderData();
  const [colorScheme, setColorScheme] = useState<ColorScheme>("light");

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  if (data.ENV.REMIX_PUBLIC_API_MOCKING) {
    await setupMocks();
  }

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        theme={{ colorScheme }}
        withGlobalStyles
        withNormalizeCSS
      >
        <html lang="en">
          <head>
            <Meta />
            <Links />
          </head>
          <body>
            <AppLayout>
              <Outlet />
            </AppLayout>
            <ScrollRestoration />
            <script
              dangerouslySetInnerHTML={{
                __html: `window.ENV = ${JSON.stringify(data.ENV)}`,
              }}
            />
            <Scripts />
            <LiveReload />
          </body>
        </html>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}
