import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useFetcher, useLoaderData } from "@remix-run/react";
import { useEffect, useState } from "react";
import type { TodayVisitorCount } from "~/apis/visitor";
import { loadTodayVisitorCount, loadVisitorCount } from "~/apis/visitor";
import RealTimeTodayVisitorCountCard from "~/components/card/RealTimeTodayVisitorCountCard";
import RealTimeVisitorCountCard from "~/components/card/RealTimeVisitorCountCard";
import { VisitorCountModel } from "~/models/VisitorCountModel";

import type {
  VisitorCountDimensions,
  VisitorCountSource,
} from "~/models/VisitorCountModel/types";

export const loader: LoaderFunction = async () => {
  const [visitorCount, todayVisitorCount] = await Promise.all([
    loadVisitorCount(),
    loadTodayVisitorCount(),
  ]);

  const dayVisitorCountModel = new VisitorCountModel({
    date: visitorCount.date,
    ...visitorCount.day,
  });

  const weekVisitorCountModel = new VisitorCountModel({
    date: visitorCount.date,
    ...visitorCount.week,
  });

  const monthVisitorCountModel = new VisitorCountModel({
    date: visitorCount.date,
    ...visitorCount.month,
  });

  return json({
    visitorCountDatasetByPeriod: {
      day: dayVisitorCountModel.toJson(),
      week: weekVisitorCountModel.toJson(),
      month: monthVisitorCountModel.toJson(),
    },
    todayVisitorCount,
  });
};

export type VisitorCountDatasetByPeriod = {
  day: { source: VisitorCountSource; dimensions: VisitorCountDimensions };
  week: { source: VisitorCountSource; dimensions: VisitorCountDimensions };
  month: { source: VisitorCountSource; dimensions: VisitorCountDimensions };
};

export default function VisitorPage() {
  const { visitorCountDatasetByPeriod, todayVisitorCount } = useLoaderData<{
    visitorCountDatasetByPeriod: VisitorCountDatasetByPeriod;
    todayVisitorCount: TodayVisitorCount;
  }>();
  const [data, setData] = useState({
    visitorCountDatasetByPeriod,
    todayVisitorCount,
  });

  const fetcher = useFetcher();

  useEffect(
    () => setData({ visitorCountDatasetByPeriod, todayVisitorCount }),
    [visitorCountDatasetByPeriod, todayVisitorCount]
  );

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

  console.log(data.visitorCountDatasetByPeriod);

  return (
    <>
      <RealTimeTodayVisitorCountCard visitorCount={data.todayVisitorCount} />
      <RealTimeVisitorCountCard
        visitorCountDatasetByPeriod={data.visitorCountDatasetByPeriod}
      />
    </>
  );
}
