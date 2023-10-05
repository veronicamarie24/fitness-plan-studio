import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormLabel,
} from "@mui/material";
import { useCallback } from "react";
import { Category, FilterValue } from "../api/get-filters";

type FilterCheckboxProps = {
  label: string;
  values: FilterValue[] | Category[];
};

export function FilterCheckbox(props: FilterCheckboxProps) {
  const { label, values } = props;
  const handleChangeDuration = useCallback(() => {}, []);

  return (
    <Box>
      <FormLabel component="legend">{label}</FormLabel>
      <FormGroup>
        {values.map((value) => (
          <FormControlLabel
            control={
              <Checkbox
                checked={false}
                onChange={handleChangeDuration}
                name={isCategory(value) ? value.slug : value.value}
              />
            }
            label={isCategory(value) ? value.name : value.display_name}
          />
        ))}
      </FormGroup>
    </Box>
  );
}

function isCategory(value: FilterValue | Category): value is Category {
  return "slug" in value;
}
