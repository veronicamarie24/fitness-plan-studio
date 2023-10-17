import fetch from "node-fetch";

export type Class = {
  id: number;
  title: string;
};

export async function getAllClasses(): Promise<Class[]> {
  const allClasses: Class[] = [];
  let currentPage = 1;
  let pageMax = 10; // limit the page count for now

  while (currentPage <= pageMax) {
    const response = await fetch(`/api/v2/ride/archived?page=${currentPage}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "local-app",
      },
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch data from API: ${response.status} - ${response.statusText}`
      );
    }

    const result = await response.json();
    const { data, page } = result;

    allClasses.push(...data);
    currentPage = page + 1;

    // if we want to get data from all pages, use this
    // const { page_count } = result;
    // totalPages = page_count;
  }

  return allClasses;
}

export type PelotonRideQueryParameters = {
  browse_category: string;
  content_format: string;
  duration: number; // in seconds
  limit: number;
  page: number;
  muscle_group: string;
  instructor_id: string;
  [key: string]: string | number; // Index signature
};

export async function getAllClassesByQueryParam(
  queryParameters: PelotonRideQueryParameters
): Promise<Class[]> {
  const allClasses: Class[] = [];
  let currentPage = 1;
  let pageMax = 10; // limit the page count for now

  while (currentPage <= pageMax) {
    // avoid rebuilding this query string on every loop
    const queryString = Object.keys(queryParameters)
      .map((key) => `${key}=${encodeURIComponent(queryParameters[key])}`)
      .join("&");

    const apiUrlWithQuery = `/api/v2/ride/archived?${queryString}`;

    const response = await fetch(apiUrlWithQuery, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "fitness-plan-studio",
      },
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch data from API: ${response.status} - ${response.statusText}`
      );
    }

    const result = await response.json();
    const { data, page } = result;

    allClasses.push(...data);

    currentPage = currentPage + 1;
    queryParameters[page] = currentPage;
  }

  return allClasses;
}
