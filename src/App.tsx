import { useEffect, useState } from "react";
import { login } from "./api-login";
import { Class, getAllClasses } from "./get-all-classes";

function App() {
  const [classes, setClasses] = useState<Class[] | null>([]);

  useEffect(() => {
    login();
    getAllClasses().then((classes) => {
      setClasses(classes);
    });
  }, []);

  return (
    <div>
      <ul>
        {classes
          ? classes.map((item) => <li key={item.id}>{item.title}</li>)
          : "No classes were found."}
      </ul>
    </div>
  );
}

export default App;
