import { Box, Button, CircularProgress } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import {
  Category,
  Filter,
  getCategories,
  getFilters,
} from "../api/get-filters";
import { FilterCheckboxGroup } from "./filter-checkbox-group";

export type CheckboxCategories =
  | "classType"
  | "duration"
  | "muscleGroup"
  | "instructor";

export type PlanPreferencesFormState = {
  [K in CheckboxCategories]: Record<string, boolean>;
};

export function PlanPreferences() {
  const [filters, setFilters] = useState<Filter[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isFiltersLoading, setIsFiltersLoading] = useState(true);
  const [isCategoriesLoading, setIsCategoriesLoading] = useState(true);
  const [formState, setFormState] = useState<PlanPreferencesFormState>({
    classType: {},
    duration: {},
    muscleGroup: {},
    instructor: {},
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
        [category]: { ...prevState[category], [value]: event.target.checked },
      }));
    };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("submit", formState);
  };

  const isLoading = isFiltersLoading || isCategoriesLoading;

  return isLoading ? (
    <CircularProgress />
  ) : (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ height: "500px", flexDirection: "row", flexWrap: "wrap" }}
    >
      {categories && (
        <FilterCheckboxGroup
          label="Class Type"
          filter="classType"
          values={categories}
          handleCheckboxChange={handleCheckboxChange}
          formState={formState}
        />
      )}
      {durations && (
        <FilterCheckboxGroup
          label="Duration"
          filter="duration"
          values={durations.values}
          handleCheckboxChange={handleCheckboxChange}
          formState={formState}
        />
      )}
      {muscleGroups && (
        <FilterCheckboxGroup
          label="Muscle Group"
          filter="muscleGroup"
          values={muscleGroups.values}
          handleCheckboxChange={handleCheckboxChange}
          formState={formState}
        />
      )}
      {instructors && (
        <FilterCheckboxGroup
          label="Instructor"
          filter="instructor"
          values={instructors.values}
          handleCheckboxChange={handleCheckboxChange}
          formState={formState}
        />
      )}

      <Button variant="outlined" type="submit">
        Submit
      </Button>
    </Box>
  );
}
