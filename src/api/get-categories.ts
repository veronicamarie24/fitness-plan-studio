import fetch from "node-fetch";

export type Category = {
  name: string;
  slug: string;
  list_order: number;
  id: string;
  flags: string[];
  has_limited_rides: boolean;
  icon_url: string;
  large_portal_image_url: string;
  portal_image_url: string;
  small_portal_image_url: string;
};

export async function getCategories(): Promise<Category[]> {
  const response = await fetch(`api/browse_categories?library_type=on_demand`, {
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
  return result.browse_categories;
}
