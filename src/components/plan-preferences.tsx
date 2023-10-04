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
import { Filter, getFilters } from "../api/get-filters";

export function PlanPreferences() {
  const [filters, setFilters] = useState<Filter[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getFilters().then((filters) => {
      setFilters(filters);
      setIsLoading(false);
    });
  }, []);

  const handleChangeDuration = useCallback(() => {}, []);

  const duration = filters.find((element) => element.name === "duration");

  return isLoading ? (
    <CircularProgress />
  ) : (
    <Box>
      <FormControl component="fieldset" variant="standard">
        <FormLabel component="legend">Class Length</FormLabel>
        <FormGroup>
          {duration &&
            duration.values.map((item) => (
              <FormControlLabel
                control={
                  <Checkbox
                    checked={false}
                    onChange={handleChangeDuration}
                    name={item.name}
                  />
                }
                label={item.displayName}
              />
            ))}
        </FormGroup>
      </FormControl>
    </Box>
  );
}
