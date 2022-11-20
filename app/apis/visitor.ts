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

export async function loadTodayVisitorCount(): Promise<TodayVisitorCount> {
  const data = await fetch("http://localhost:3000/api/v1/today-visitor", {
    method: "GET",
  });

  return data.json();
}
