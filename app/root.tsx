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
import { createEmotionCache, MantineProvider } from "@mantine/core";
import resetStyle from "~/styles/reset.css";
import globalStyle from "~/styles/global.css";
import fontStyle from "~/styles/font.css";
import { setupMocks } from "../test/mocks";

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

export default function App() {
  const data = useLoaderData();

  if (data.ENV.REMIX_PUBLIC_API_MOCKING) {
    setupMocks();
  }

  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <html lang="en">
        <head>
          <Meta />
          <Links />
        </head>
        <body>
          <Outlet />
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
  );
}
