import fetch from "node-fetch";

export type Class = {
  availability: { is_available: boolean; reason: string | null };
  captions: [];
  class_type_ids: [];
  content_availability: string;
  content_availability_level: string;
  content_format: string;
  content_provider: string;
  description: string;
  difficulty_estimate: number;
  difficulty_level: number;
  difficulty_rating_avg: number;
  difficulty_rating_count: number;
  distance: number;
  distance_display_value: string;
  distance_unit: string;
  duration: number;
  dynamic_video_recorded_speed_in_mph: number;
  equipment_ids: [];
  equipment_tags: [];
  explicit_rating: number;
  extra_images: [];
  fitness_discipline: string;
  fitness_discipline_display_name: string;
  flags: [];
  free_for_limited_time: boolean;
  has_closed_captions: boolean;
  has_free_mode: boolean;
  has_pedaling_metrics: boolean;
  home_peloton_id: string;
  id: string;
  image_url: string;
  individual_instructor_ids: [];
  instructor_id: string;
  is_archived: boolean;
  is_closed_caption_shown: boolean;
  is_dynamic_video_eligible: boolean;
  is_explicit: boolean;
  is_favorite: boolean;
  is_fixed_distance: boolean;
  is_limited_ride: boolean;
  is_live_in_studio_only: boolean;
  is_outdoor: boolean;
  is_sessions_eligible: boolean;
  join_tokens: { on_demand: string };
  language: string;
  length: number;
  live_stream_id: string;
  live_stream_url: string;
  location: string;
  metrics: [];
  muscle_group_score: [];
  origin_locale: string;
  original_air_time: number;
  overall_estimate: number;
  overall_rating_avg: number;
  overall_rating_count: number;
  pedaling_duration: number;
  pedaling_end_offset: number;
  pedaling_start_offset: number;
  rating: number;
  ride_type_id: string;
  ride_type_ids: [];
  sample_preview_stream_url: string;
  sample_vod_stream_url: string;
  scheduled_start_time: number;
  series_id: string;
  sold_out: boolean;
  studio_peloton_id: string;
  thumbnail_location: string;
  thumbnail_title: string;
  title: string;
  total_following_workouts: number;
  total_in_progress_workouts: number;
  total_ratings: number;
  total_user_workouts: number;
  total_workouts: number;
  user_caption_locales: [];
  vod_stream_id: string;
  vod_stream_url: string;
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
