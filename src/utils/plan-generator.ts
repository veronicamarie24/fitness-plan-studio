import {
  Class,
  PelotonRideQueryParameters,
  getAllClassesByQueryParam,
} from "../api/get-all-classes";
import { PlanPreferencesFormState } from "../components/plan-preferences-form";

export type WorkoutPlan = {
  startDate: Date;
  dailyWorkouts: Class[];
};

export async function generatePlan(
  formData: PlanPreferencesFormState
): Promise<WorkoutPlan> {
  try {
    const classes: Class[] = await getClassesFromUserInput(formData);
    console.log(classes);

    const startDate = new Date();

    const workoutPlan: WorkoutPlan = {
      startDate: startDate,
      dailyWorkouts: [],
    };

    const highIntensityClasses = getHighIntensityClasses(classes);
    const lowIntensityClasses = getLowIntensityClasses(classes);

    const numClasses =
      Number(formData.numClassesPerWeek) * Number(formData.planLength);

    for (let i = 0; i < numClasses; i++) {
      if (i % 2 === 0 && highIntensityClasses.length > 0) {
        workoutPlan.dailyWorkouts.push(highIntensityClasses.shift()!);
      }

      if (i % 2 === 1 && lowIntensityClasses.length > 0) {
        workoutPlan.dailyWorkouts.push(lowIntensityClasses.shift()!);
      }
    }

    console.log(workoutPlan);

    return workoutPlan;
  } catch (error) {
    // Handle errors
    console.error(error);
    throw error;
  }
}

function getHighIntensityClasses(classes: Class[]) {
  let highIntensityClasses = classes.filter(
    (c) => c.difficulty_rating_avg >= 6
  );

  // descending sort
  return highIntensityClasses.sort(
    (a, b) => b.difficulty_rating_avg - a.difficulty_rating_avg
  );
}

function getLowIntensityClasses(classes: Class[]) {
  let lowIntensityClasses = classes.filter((c) => c.difficulty_rating_avg <= 6);

  // ascending sort
  return lowIntensityClasses.sort(
    (a, b) => a.difficulty_rating_avg - b.difficulty_rating_avg
  );
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
            values.push(key.toLowerCase().replace(" ", ""));
          }
        }

        // Concatenate the values using a comma
        queryParameters[queryKey] = values.join(",");
      }
    }
  }

  return queryParameters;
}
