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
