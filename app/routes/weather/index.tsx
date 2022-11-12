import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useFetcher, useLoaderData } from "@remix-run/react";
import type { TodayWeather, Weather } from "~/apis/weather";
import { loadTodayWeather, loadWeather } from "~/apis/weather";
import { useEffect, useState } from "react";
import { RealTimeWeatherCard } from "~/components/card/RealTimeWeatherCard";
import { RealTimeTodayWeatherCard } from "~/components/card/RealTimeTodayWeatherCard";

export const loader: LoaderFunction = async () => {
  const [weather, todayWeather] = await Promise.all([
    loadWeather(),
    loadTodayWeather(),
  ]);

  return json({
    weather,
    todayWeather,
  });
};

export default function WeatherPage() {
  const { weather, todayWeather } = useLoaderData<{
    weather: Weather;
    todayWeather: TodayWeather;
  }>();
  const [data, setData] = useState({
    weather,
    todayWeather,
  });

  const fetcher = useFetcher();

  useEffect(() => {
    setData({
      weather,
      todayWeather,
    });
  }, [weather, todayWeather]);

  useEffect(() => {
    if (fetcher.data) {
      setData(fetcher.data);
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
      <RealTimeTodayWeatherCard weather={data.todayWeather} />
      <RealTimeWeatherCard weather={data.weather} />
    </>
  );
}
