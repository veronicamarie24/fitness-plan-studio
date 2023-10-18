import fetch from "node-fetch";

export type FilterValue = {
  name: string;
  display_name: string;
  value: string;
  list_order: number;
};

export type Filter = {
  name: string;
  display_name: string;
  type: string;
  user_specific: boolean;
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
