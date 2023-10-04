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
      <FormControl component="fieldset" variant="standard">
        <FormLabel component="legend">Class Type</FormLabel>
        <FormGroup>
          {categories &&
            categories.map((item) => (
              <FormControlLabel
                control={
                  <Checkbox
                    checked={false}
                    onChange={handleChangeDuration}
                    name={item.slug}
                  />
                }
                label={item.name}
              />
            ))}
        </FormGroup>

        <FormLabel component="legend">Duration</FormLabel>
        <FormGroup>
          {duration &&
            duration.values.map((item) => (
              <FormControlLabel
                control={
                  <Checkbox
                    checked={false}
                    onChange={handleChangeDuration}
                    name={item.value}
                  />
                }
                label={item.display_name}
              />
            ))}
        </FormGroup>

        <FormLabel component="legend">Muscle Group</FormLabel>
        <FormGroup>
          {muscleGroup &&
            muscleGroup.values.map((item) => (
              <FormControlLabel
                control={
                  <Checkbox
                    checked={false}
                    onChange={handleChangeDuration}
                    name={item.value}
                  />
                }
                label={item.display_name}
              />
            ))}
        </FormGroup>

        <FormLabel component="legend">Instructor</FormLabel>
        <FormGroup>
          {instructor &&
            instructor.values.map((item) => (
              <FormControlLabel
                control={
                  <Checkbox
                    checked={false}
                    onChange={handleChangeDuration}
                    name={item.value}
                  />
                }
                label={item.display_name}
              />
            ))}
        </FormGroup>
      </FormControl>
    </Box>
  );
}
