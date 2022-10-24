import { Temperature } from "~/components/weather/temperature/Temperature";
import { WindSpeed } from "~/components/weather/windSpeed/WindSpeed";
import { WindDirection } from "~/components/weather/windDirection/WindDirection";
import { Humidity } from "~/components/weather/humidity/Humidity";
import type { LoaderFunction } from "@remix-run/node";
import { fetch, json } from "@remix-run/node";

// 풍속: 이미지
// 풍향: 바그래프
// 온도: 라인그래프
// 습도: 바그래프

export const loader: LoaderFunction = async () => {
  const data = await fetch("http://localhost:3000/api/v1/weather", {
    method: "GET",
  });

  return json(await data.json());
};

export default function Index() {
  // const loaderWeather = useLoaderData();
  // const [weather, setWeather] = useState(loaderWeather);
  //
  // // navigate 를 하지않고 ui 작업 및 로더에 연결할 수 있음.
  // const fetcher = useFetcher();
  //
  // useEffect(() => setWeather(loaderWeather), [loaderWeather]);
  //
  // useEffect(() => {
  //   if (fetcher.data) {
  //     setWeather(fetcher.data);
  //   }
  // }, [fetcher.data]);
  //
  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     if (document.visibilityState === "visible") {
  //       fetcher.load("/");
  //     }
  //   }, 3000);
  //
  //   return () => clearInterval(intervalId);
  // });

  // console.log(weather);

  return (
    <>
      <Temperature weather={{}} />
      <WindSpeed />
      <WindDirection />
      <Humidity />
    </>
  );
}
