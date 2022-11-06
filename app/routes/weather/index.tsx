import type { LoaderFunction } from "@remix-run/node";
import { useFetcher, useLoaderData } from "@remix-run/react";
import { useEffect, useState } from "react";
import { RealTimeWeatherCard } from "~/components/card/RealTimeWeatherCard";

// 데이터를 받아오는 코드
export const loader: LoaderFunction = async () => {
  const data = await fetch("http://localhost:3000/api/v1/weather", {
    method: "GET",
  });

  return data.json();
};

export default function WeatherPage() {
  const loaderWeather = useLoaderData();
  const [weather, setWeather] = useState(loaderWeather);

  const fetcher = useFetcher();

  useEffect(() => setWeather(loaderWeather), [loaderWeather]);

  useEffect(() => {
    if (fetcher.data) {
      setWeather(fetcher.data);
    }
  }, [fetcher.data]);

  useEffect(() => {
    // https://remix.run/docs/en/v1/api/remix#fetcherload
    const intervalId = setInterval(() => {
      if (document.visibilityState === "visible") {
        fetcher.load("/weather?index");
      }
    }, 3000);

    return () => clearInterval(intervalId);
  });

  return (
    <>
      <RealTimeWeatherCard weather={weather} />
    </>
  );
}
