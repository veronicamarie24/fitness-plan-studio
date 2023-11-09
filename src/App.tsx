import { Button, Stack, Typography } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { login as apiLogin } from "./api/login";
import {
  PlanPreferencesForm,
  PlanPreferencesFormState,
} from "./components/plan-preferences-form";
import { CurrentPlan } from "./components/current-plan";
import { WorkoutPlan, generatePlan } from "./utils/plan-generator";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState("");

  const [workoutPlan, setWorkoutPlan] = useState<WorkoutPlan | null>(null);

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

  const handleSubmit = async (formState: PlanPreferencesFormState) => {
    setWorkoutPlan(await generatePlan(formState));
  };

  return (
    <div>
      <Typography variant="h2" gutterBottom>
        Fitness Plan Studio
      </Typography>
      {isLoggedIn && (
        <Stack>
          <PlanPreferencesForm handleSubmit={handleSubmit} />
          {workoutPlan && <CurrentPlan workoutPlan={workoutPlan} />}
        </Stack>
      )}

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
