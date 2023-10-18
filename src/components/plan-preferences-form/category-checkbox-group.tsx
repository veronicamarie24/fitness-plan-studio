import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
} from "@mui/material";
import { Category } from "../../api/get-categories";
import { CheckboxCategories } from "../plan-preferences-form";

type FilterCheckboxProps = {
  label: string;
  checkboxCategory: CheckboxCategories;
  values: Category[];
  handleCheckboxChange: (
    checkboxCategory: CheckboxCategories,
    value: Category
  ) => (event: React.ChangeEvent<HTMLInputElement>) => void;
  filterFormState: Record<string, Category>;
};

export function CategoryCheckboxGroup(props: FilterCheckboxProps) {
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
        {values.map((value) => (
          <FormControlLabel
            key={value.id}
            control={
              <Checkbox
                checked={Boolean(filterFormState[value.id]) || false}
                onChange={handleCheckboxChange(checkboxCategory, value)}
                name={value.id}
              />
            }
            label={value.name}
          />
        ))}
      </FormGroup>
    </FormControl>
  );
}
