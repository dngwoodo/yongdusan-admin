import { Form, useActionData, useTransition } from "@remix-run/react";
import { Button, MultiSelect } from "@mantine/core";
import { DateRangePicker } from "@mantine/dates";
import type { ActionData } from "~/routes/period-weather";

export function PeriodWeatherForm() {
  const now = new Date();
  const actionData = useActionData<ActionData>();
  const transition = useTransition();

  const isSubmitting = transition.state === "submitting"; // action 함수 호출동안 submitting 상태이다.

  return (
    <Form method="post" action="/period-weather?index">
      <MultiSelect
        data={weatherInformation}
        searchable
        defaultValue={["temperature"]}
        placeholder="원하는 날씨 정보를 선택해주세요."
        label="날씨 정보"
        withAsterisk
        name="weatherInformation"
        error={actionData?.fieldErrors?.weatherInformation}
        mb={10}
      />
      <DateRangePicker
        locale="ko"
        label="날짜 선택"
        placeholder="날짜를 선택해주세요."
        withAsterisk
        allowSingleDateInRange
        name="dates"
        defaultValue={[now, now]}
        error={actionData?.fieldErrors?.dates}
        mb={10}
      />
      <Button type="submit" loading={isSubmitting} mb={16}>
        그래프 추가
      </Button>
    </Form>
  );
}

const weatherInformation = [
  { label: "온도", value: "temperature" },
  { label: "습도", value: "humidity" },
  { label: "바람", value: "wind" }, // wind_speed, wind_deg, wind_deg_status 를 통합해서 말함.
  { label: "미세먼지", value: "find_dust" },
  { label: "초미세먼지", value: "ultra_find_dust" },
];
