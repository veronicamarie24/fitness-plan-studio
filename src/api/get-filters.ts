import fetch from "node-fetch";

type FilterValue = {
  name: string;
  displayName: string;
  value: string;
  listOrder: number;
};

export type Filter = {
  name: string;
  displayName: string;
  type: string;
  userSpecific: boolean;
  values: FilterValue[];
};

export async function getFilters(): Promise<Filter[]> {
  const response = await fetch(`api/ride/filters?&library_type=on_demand`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "User-Agent": "local-app",
      "Peloton-Platform": "web",
    },
  });

  if (!response.ok) {
    throw new Error(
      `Failed to fetch data from API: ${response.status} - ${response.statusText}`
    );
  }

  const result = await response.json();
  const { filters } = result;

  return filters;
}
