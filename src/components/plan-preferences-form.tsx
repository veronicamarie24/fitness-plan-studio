import { Box, Button, CircularProgress, Stack } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import {
  Category,
  Filter,
  getCategories,
  getFilters,
} from "../api/get-filters-categories";
import { FilterCheckboxGroup } from "./plan-preferences-form/filter-checkbox-group";
import { PlanLengthInput } from "./plan-preferences-form/plan-length-input";
import { NumClassesInput } from "./plan-preferences-form/num-classes-input";
import { generatePlan } from "../utils/plan-generator";

export type CheckboxCategories =
  | "classType"
  | "duration"
  | "muscleGroup"
  | "instructor"
  | "numClassesPerWeek"
  | "planLength";

export type PlanPreferencesFormState = {
  classType: Record<string, boolean>;
  duration: Record<string, boolean>;
  muscleGroup: Record<string, boolean>;
  instructor: Record<string, boolean>;
  numClassesPerWeek: string;
  planLength: string;
};

export function PlanPreferencesForm() {
  const [filters, setFilters] = useState<Filter[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isFiltersLoading, setIsFiltersLoading] = useState(true);
  const [isCategoriesLoading, setIsCategoriesLoading] = useState(true);
  const [formState, setFormState] = useState<PlanPreferencesFormState>({
    classType: {},
    duration: {},
    muscleGroup: {},
    instructor: {},
    numClassesPerWeek: "",
    planLength: "",
  });

  useEffect(() => {
    getFilters().then((filters) => {
      setFilters(filters);
      setIsFiltersLoading(false);
    });

    getCategories().then((categories) => {
      setCategories(categories);
      setIsCategoriesLoading(false);
    });
  }, []);

  const durations = useMemo(
    () => filters.find((element) => element.name === "duration"),
    [filters]
  );

  const instructors = useMemo(
    () => filters.find((element) => element.name === "instructor_id"),
    [filters]
  );

  const muscleGroups = useMemo(
    () => filters.find((element) => element.name === "muscle_group"),
    [filters]
  );

  const handleCheckboxChange =
    (category: CheckboxCategories, value: string) =>
    (event: React.ChangeEvent<HTMLInputElement>): void => {
      setFormState((prevState) => ({
        ...prevState,
        [category]: {
          ...(prevState[category] as Record<string, boolean>),
          [value]: event.target.checked,
        },
      }));
    };

  const handleNumClassesChange = (value: string): void => {
    setFormState((prevState) => ({
      ...prevState,
      planLength: value,
    }));
  };

  const handlePlanLengthChange = (value: string, unit: string): void => {
    // Combine the value and unit into a single string and update the planLength property
    const combinedPlanLength = `${value} ${unit}`;
    setFormState((prevState) => ({
      ...prevState,
      planLength: combinedPlanLength,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("submit", formState);
    generatePlan(formState);
  };

  const isLoading = isFiltersLoading || isCategoriesLoading;

  return isLoading ? (
    <CircularProgress />
  ) : (
    <Stack
      component="form"
      onSubmit={handleSubmit}
      spacing={4}
      sx={{ flexWrap: "wrap" }}
    >
      <Stack
        direction="row"
        spacing={6}
        sx={{ "& .MuiFormGroup-root": { maxHeight: "300px" } }}
      >
        {categories && (
          <FilterCheckboxGroup
            label="Class Type"
            filter="classType"
            values={categories}
            handleCheckboxChange={handleCheckboxChange}
            filterFormState={formState["classType"]}
            // formGroupSx={{ maxHeight: "400px" }}
          />
        )}

        {durations && (
          <FilterCheckboxGroup
            label="Duration"
            filter="duration"
            values={durations.values}
            handleCheckboxChange={handleCheckboxChange}
            filterFormState={formState["duration"]}
          />
        )}

        {muscleGroups && (
          <FilterCheckboxGroup
            label="Muscle Group"
            filter="muscleGroup"
            values={muscleGroups.values}
            handleCheckboxChange={handleCheckboxChange}
            filterFormState={formState["muscleGroup"]}
          />
        )}
      </Stack>

      {instructors && (
        <Box
          sx={{
            "& .MuiFormGroup-root": {
              maxWidth: "600px",
              maxHeight: "400px",
              overflow: "auto",
            },
          }}
        >
          <FilterCheckboxGroup
            label="Instructor"
            filter="instructor"
            values={instructors.values}
            handleCheckboxChange={handleCheckboxChange}
            filterFormState={formState["instructor"]}
          />
        </Box>
      )}

      <Stack spacing={2}>
        <Stack direction="row" spacing={4}>
          <NumClassesInput onNumClassesChange={handleNumClassesChange} />

          <PlanLengthInput onPlanLengthChange={handlePlanLengthChange} />
        </Stack>

        <Button variant="outlined" type="submit" sx={{ maxWidth: "200px" }}>
          Submit
        </Button>
      </Stack>
    </Stack>
  );
}
