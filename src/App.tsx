import { Button, Stack, Typography } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { login as apiLogin } from "./api/login";
import { PlanPreferences } from "./components/plan-preferences";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState("");

  const login = useCallback(async () => {
    try {
      // Call your login function here
      const loginResponse = await apiLogin();

      // If the session ID is returned, then the login was successful
      if (loginResponse.session_id) {
        setIsLoggedIn(true);
      } else {
        setLoginError("Login failed.");
      }
    } catch (error) {
      setLoginError("An error occurred during login. Please retry.");
    }
  }, []);

  useEffect(() => {
    login();
  }, [login]);

  return (
    <div>
      <Typography variant="h2" gutterBottom>
        Fitness Plan Studio
      </Typography>
      {isLoggedIn && <PlanPreferences />}

      {loginError && (
        <Stack direction="row">
          <Typography>{loginError}</Typography>
          <Button variant="outlined" onClick={login}>
            Retry
          </Button>
        </Stack>
      )}
    </div>
  );
}

export default App;
