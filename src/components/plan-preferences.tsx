import {
  Box,
  Checkbox,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import {
  Category,
  Filter,
  getCategories,
  getFilters,
} from "../api/get-filters";
import { FilterCheckbox } from "./filter-checkbox";

export function PlanPreferences() {
  const [filters, setFilters] = useState<Filter[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isFiltersLoading, setIsFiltersLoading] = useState(true);
  const [isCategoriesLoading, setIsCategoriesLoading] = useState(true);
  const [formState, setFormState] = useState({
    gilad: true,
    jason: false,
    antoine: false,
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

  const handleChangeDuration = useCallback(() => {}, []);

  const duration = filters.find((element) => element.name === "duration");
  const instructor = filters.find(
    (element) => element.name === "instructor_id"
  );
  const muscleGroup = filters.find(
    (element) => element.name === "muscle_group"
  );
  const classType = filters.find((element) => element.name === "ride_type_id");

  const isLoading = isFiltersLoading || isCategoriesLoading;

  return isLoading ? (
    <CircularProgress />
  ) : (
    <Box>
      <FormControl
        component="fieldset"
        variant="standard"
        sx={{ flexDirection: "row" }}
      >
        {categories && (
          <FilterCheckbox label="Class Type" values={categories} />
        )}
        {duration && (
          <FilterCheckbox label="Duration" values={duration.values} />
        )}
        {muscleGroup && (
          <FilterCheckbox label="Muscle Group" values={muscleGroup.values} />
        )}
        {instructor && (
          <FilterCheckbox label="Instructor" values={instructor.values} />
        )}
      </FormControl>
    </Box>
  );
}
