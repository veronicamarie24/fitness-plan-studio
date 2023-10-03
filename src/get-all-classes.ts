import fetch from "node-fetch";

export type Class = {
  id: number;
  title: string;
};

export async function getAllClasses(): Promise<Class[] | null> {
  const sessionId = sessionStorage.getItem("session_id");
  if (sessionId) {
    return fetch("/api/v2/ride/archived", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "local-app",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        return res.data as Class[];
      });
  }

  return null;
}
