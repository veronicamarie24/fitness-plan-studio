import { Typography } from "@mui/material";
import { useEffect } from "react";
import { login } from "./api/login";
import { PlanPreferences } from "./components/plan-preferences";

function App() {
  // const [classes, setClasses] = useState<Class[]>([]);
  // const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    login();
    // getAllClasses().then((classes) => {
    //   setClasses(classes);
    //   setIsLoading(false);
    // });
  }, []);

  return (
    <div>
      <Typography variant="h2" gutterBottom>
        Fitness Plan Studio
      </Typography>
      <PlanPreferences />
    </div>
  );
}

export default App;
