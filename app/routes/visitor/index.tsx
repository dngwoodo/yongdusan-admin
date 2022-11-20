import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useFetcher, useLoaderData } from "@remix-run/react";
import { useEffect, useState } from "react";
import type { TodayVisitorCount } from "~/apis/visitor";
import { loadTodayVisitorCount } from "~/apis/visitor";
import RealTimeTodayVisitorCountCard from "~/components/card/RealTimeTodayVisitorCountCard";

export const loader: LoaderFunction = async () => {
  const todayVisitorCount = await loadTodayVisitorCount();

  return json({ todayVisitorCount });
};

export default function VisitorPage() {
  const { todayVisitorCount } = useLoaderData<{
    todayVisitorCount: TodayVisitorCount;
  }>();
  const [data, setData] = useState({ todayVisitorCount });

  const fetcher = useFetcher();

  useEffect(() => setData({ todayVisitorCount }), [todayVisitorCount]);

  useEffect(() => {
    if (fetcher.data) {
      setData(fetcher.data);
    }
  }, [fetcher.data]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (document.visibilityState === "visible") {
        fetcher.load("/visitor?index");
      }
    }, 3000);

    return () => clearInterval(intervalId);
  });

  return (
    <>
      <RealTimeTodayVisitorCountCard visitorCount={data.todayVisitorCount} />
    </>
  );
}
