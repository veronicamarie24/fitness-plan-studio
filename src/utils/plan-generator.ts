import {
  Class,
  PelotonRideQueryParameters,
  getAllClassesByQueryParam,
} from "../api/get-all-classes";
import { PlanPreferencesFormState } from "../components/plan-preferences-form";

type WorkoutPlan = {
  startDate: Date;
  dailyWorkouts: Array<{
    day: string;
    workouts: Array<{
      className: string;
      instructor: string;
      classLink: string;
    }>;
  }>;
};

export async function generatePlan(
  formData: PlanPreferencesFormState
): Promise<WorkoutPlan> {
  try {
    // Retrieve the array of classes using async/await
    const classes: Class[] = await getClassesFromUserInput(formData);
    console.log(classes);

    // Start the plan today
    const startDate = new Date();

    // Now that you have the 'classes' array, you can use it to construct the workout plan
    const workoutPlan: WorkoutPlan = {
      startDate: startDate,
      dailyWorkouts: [],
    };

    return workoutPlan;
  } catch (error) {
    // Handle errors
    console.error(error);
    throw error;
  }
}

async function getClassesFromUserInput(
  formData: PlanPreferencesFormState
): Promise<Class[]> {
  const queryParameters = constructQueryParams(formData);

  try {
    const classes = await getAllClassesByQueryParam(queryParameters);
    return classes;
  } catch (error) {
    // Handle errors here
    console.error(error);
    throw error;
  }
}

function constructQueryParams(
  formData: PlanPreferencesFormState
): PelotonRideQueryParameters {
  // Map form keys to the corresponding query parameter keys
  const keyMapping: { [key: string]: string } = {
    classType: "browse_category",
    duration: "duration",
    instructor: "instructor_id",
    muscleGroup: "muscle_group",
  };

  const queryParameters: PelotonRideQueryParameters = {
    browse_category: "strength",
    content_format: "audio,video",
    duration: 0,
    limit: 18,
    page: 0,
    muscle_group: "",
    instructor: "",
    instructor_id: "",
  };

  for (const formKey in keyMapping) {
    if (keyMapping.hasOwnProperty(formKey)) {
      const queryKey = keyMapping[formKey as keyof PlanPreferencesFormState];
      if (queryKey) {
        const values: string[] = [];

        for (const [key, value] of Object.entries(
          formData[formKey as keyof PlanPreferencesFormState]
        )) {
          if (value) {
            // if (formKey === "duration") {
            //   const minutes = parseInt(key.split(" ")[0], 10);
            //   const seconds = minutes * 60;
            //   values.push(seconds.toString());
            // } else {
            //   values.push(key.toLowerCase().replace(" ", ""));
            // }
            values.push(key.toLowerCase().replace(" ", ""));
          }
        }

        // Concatenate the values using a comma
        queryParameters[queryKey] = values.join(",");
      }
    }
  }

  console.log(queryParameters);
  return queryParameters;
}
