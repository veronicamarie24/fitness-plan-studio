import { Box, Button, CircularProgress, Stack } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { Filter, FilterValue, getFilters } from "../api/get-filters";
import { FilterCheckboxGroup } from "./plan-preferences-form/filter-checkbox-group";
import { PlanLengthInput } from "./plan-preferences-form/plan-length-input";
import { NumClassesInput } from "./plan-preferences-form/num-classes-input";
import { CategoryCheckboxGroup } from "./plan-preferences-form/category-checkbox-group";
import { Category, getCategories } from "../api/get-categories";

export type CheckboxCategories =
  | "classType"
  | "duration"
  | "muscleGroup"
  | "instructor"
  | "numClassesPerWeek"
  | "planLength";

export type PlanPreferencesFormState = {
  classType: Record<string, Category>;
  duration: Record<string, FilterValue>;
  muscleGroup: Record<string, FilterValue>;
  instructor: Record<string, FilterValue>;
  numClassesPerWeek: string;
  planLength: string;
};

interface PlanPreferencesFormProps {
  handleSubmit: (formState: PlanPreferencesFormState) => void;
}

export function PlanPreferencesForm(props: PlanPreferencesFormProps) {
  const { handleSubmit: handleSubmitProp } = props;

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

  const [formErrors, setFormErrors] = useState({
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

  const handleFilterCheckboxChange =
    (checkboxCategory: CheckboxCategories, filterValue: FilterValue) =>
    (event: React.ChangeEvent<HTMLInputElement>): void => {
      const isChecked = event.target.checked;

      setFormState((prevState) => {
        const newCategoryState = {
          ...(prevState[checkboxCategory] as Record<string, FilterValue>),
        };
        if (isChecked) {
          newCategoryState[filterValue.value] = filterValue;
        } else {
          delete newCategoryState[filterValue.value];
        }
        return {
          ...prevState,
          [checkboxCategory]: newCategoryState,
        };
      });
    };

  const handleCategoryheckboxChange =
    (checkboxCategory: CheckboxCategories, category: Category) =>
    (event: React.ChangeEvent<HTMLInputElement>): void => {
      const isChecked = event.target.checked;

      setFormState((prevState) => {
        const newCategoryState = {
          ...(prevState[checkboxCategory] as Record<string, Category>),
        };
        if (isChecked) {
          newCategoryState[category.id] = category;
        } else {
          delete newCategoryState[category.id];
        }
        return {
          ...prevState,
          [checkboxCategory]: newCategoryState,
        };
      });
    };

  const handleNumClassesChange = (value: string): void => {
    setFormState((prevState) => ({
      ...prevState,
      numClassesPerWeek: value,
    }));
  };

  const handlePlanLengthChange = (value: string): void => {
    setFormState((prevState) => ({
      ...prevState,
      planLength: value,
    }));
  };

  const validateForm = () => {
    let isValid = true;
    const errors = {
      numClassesPerWeek: "",
      planLength: "",
    };

    if (!formState.numClassesPerWeek) {
      isValid = false;
      errors.numClassesPerWeek =
        "Please provide the desired number of classes per week.";
    }

    if (!formState.planLength) {
      isValid = false;
      errors.planLength = "Please provide the desired length of your plan.";
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("submit", formState);
    if (validateForm()) {
      handleSubmitProp(formState);
    }
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
          <CategoryCheckboxGroup
            label="Class Type"
            checkboxCategory="classType"
            values={categories}
            handleCheckboxChange={handleCategoryheckboxChange}
            filterFormState={formState["classType"]}
          />
        )}

        {durations && (
          <FilterCheckboxGroup
            label="Duration"
            checkboxCategory="duration"
            values={durations.values}
            handleCheckboxChange={handleFilterCheckboxChange}
            filterFormState={formState["duration"]}
          />
        )}

        {muscleGroups && (
          <FilterCheckboxGroup
            label="Muscle Group"
            checkboxCategory="muscleGroup"
            values={muscleGroups.values}
            handleCheckboxChange={handleFilterCheckboxChange}
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
            checkboxCategory="instructor"
            values={instructors.values}
            handleCheckboxChange={handleFilterCheckboxChange}
            filterFormState={formState["instructor"]}
          />
        </Box>
      )}

      <Stack spacing={2}>
        <Stack direction="row" spacing={4}>
          <NumClassesInput
            onNumClassesChange={handleNumClassesChange}
            error={formErrors.numClassesPerWeek}
          />

          <PlanLengthInput
            onPlanLengthChange={handlePlanLengthChange}
            error={formErrors.planLength}
          />
        </Stack>

        <Button variant="outlined" type="submit" sx={{ maxWidth: "200px" }}>
          Submit
        </Button>
      </Stack>
    </Stack>
  );
}
