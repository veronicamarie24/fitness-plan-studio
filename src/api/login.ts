const username = process.env.REACT_APP_PELOTON_USER;
const password = process.env.REACT_APP_PELOTON_PASSWORD;

export async function login() {
  const loginResponse = await fetch("/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "User-Agent": "local-app",
    },
    body: JSON.stringify({
      username_or_email: username,
      password: password,
    }),
  }).then(async (response) => {
    if (!response.ok) {
      return null;
    }

    const responseData = await response.json();
    if (responseData && responseData.session_id) {
      // Save the session_id as a cookie to use for subsequent calls
      document.cookie = `peloton_session_id=${responseData.session_id}; path=/`;
    }
    return responseData;
  });

  return loginResponse;
}
