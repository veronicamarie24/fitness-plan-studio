import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
} from "@mui/material";
import { FilterValue } from "../../api/get-filters";
import { CheckboxCategories } from "../plan-preferences-form";

type FilterCheckboxProps = {
  label: string;
  checkboxCategory: CheckboxCategories;
  values: FilterValue[];
  handleCheckboxChange: (
    checkboxCategory: CheckboxCategories,
    value: FilterValue
  ) => (event: React.ChangeEvent<HTMLInputElement>) => void;
  filterFormState: Record<string, FilterValue>;
};

export function FilterCheckboxGroup(props: FilterCheckboxProps) {
  const {
    label,
    checkboxCategory,
    values,
    handleCheckboxChange,
    filterFormState,
  } = props;

  return (
    <FormControl component="fieldset" variant="standard">
      <FormLabel component="legend">{label}</FormLabel>
      <FormGroup>
        {values.map((filterValue) => (
          <FormControlLabel
            key={filterValue.value}
            control={
              <Checkbox
                checked={Boolean(filterFormState[filterValue.value]) || false}
                onChange={handleCheckboxChange(checkboxCategory, filterValue)}
                name={filterValue.value}
              />
            }
            label={filterValue.display_name}
          />
        ))}
      </FormGroup>
    </FormControl>
  );
}
