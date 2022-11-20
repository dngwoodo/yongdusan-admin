export type Count = {
  gate_1_people: number[];
  gate_1_car: number[];
  gate_2_people: number[];
};

export type VisitorCount = {
  PartitionKey: string;
  RowKey: string;
  date: string[];
  day: Count;
  week: Count;
  month: Count;
};

export type TodayVisitorCount = {
  PartitionKey: string;
  date: string;
  RowKey: string;
  total_people_all: number;
  total_people_today: number;
  gate_1_people_today: number;
  gate_1_car_today: number;
  gate_2_people_today: number;
};

export async function loadVisitorCount(): Promise<VisitorCount> {
  const data = await fetch("http://localhost:3000/api/v1/visitor", {
    method: "GET",
  });

  return data.json();
}

export async function loadTodayVisitorCount(): Promise<TodayVisitorCount> {
  const data = await fetch("http://localhost:3000/api/v1/today-visitor", {
    method: "GET",
  });

  return data.json();
}
