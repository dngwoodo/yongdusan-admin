import type { ActionFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import "dayjs/locale/ko";
import dayjs from "dayjs";
import { PeriodWeatherForm } from "~/components/form/PeriodWeatherForm";

export type ActionData = {
  formError?: {};
  fieldErrors?: {
    weatherInformation: string | null;
    dates: string | null;
  };
  fields?: {
    weatherInformation: string[];
    dates: Date[] | null[];
  };
};

const badRequest = (data: ActionData) => json(data, { status: 400 });

const validateWeatherInformation = (weatherInformation: string[]) => {
  if (weatherInformation.length > 0 && weatherInformation[0] !== "") {
    return null;
  }

  return "하나 이상 원하는 날씨 정보를 선택해주세요.";
};

const validateDates = (dates: Date[] | null[]) => {
  const [start, end] = dates;
  if (start || end) {
    return null;
  }

  return "날짜를 선택해주세요.";
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const actionData = Object.fromEntries(formData.entries());

  // type 검증
  if (
    typeof actionData.weatherInformation !== "string" ||
    typeof actionData.dates !== "string"
  ) {
    return badRequest({
      formError: "제출이 잘못되었습니다.",
    });
  }

  // client 에서 사용할 value 형태로 변환
  const weatherInformation =
    actionData.weatherInformation === ""
      ? []
      : actionData.weatherInformation.split(",");
  const dates =
    actionData.dates === ""
      ? [null, null]
      : actionData.dates
          .split(" - ")
          .map((date) => new Date(dayjs(date).format("YYYY-MM-DD")));

  // 필드 에러 생성
  const fieldErrors = {
    weatherInformation: validateWeatherInformation(weatherInformation),
    dates: validateDates(dates),
  };

  // 필드 데이터 생성
  const fields = {
    weatherInformation,
    dates,
  };

  if (Object.values(fieldErrors).some(Boolean)) {
    return badRequest({ fieldErrors, fields });
  }

  return redirect("/period-weather?index");
};

export default function PeriodWeatherPage() {
  return (
    <>
      <PeriodWeatherForm />
    </>
  );
}
