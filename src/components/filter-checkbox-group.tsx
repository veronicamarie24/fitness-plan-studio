import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
} from "@mui/material";
import { Category, FilterValue } from "../api/get-filters";
import {
  CheckboxCategories,
  PlanPreferencesFormState,
} from "./plan-preferences";

type FilterCheckboxProps = {
  label: string;
  filter: CheckboxCategories;
  values: FilterValue[] | Category[];
  handleCheckboxChange: (
    category: CheckboxCategories,
    value: string
  ) => (event: React.ChangeEvent<HTMLInputElement>) => void;
  formState: PlanPreferencesFormState;
};

export function FilterCheckboxGroup(props: FilterCheckboxProps) {
  const { label, filter, values, handleCheckboxChange, formState } = props;

  console.log(formState);

  return (
    <FormControl component="fieldset" variant="standard">
      <FormLabel component="legend">{label}</FormLabel>
      <FormGroup>
        {values.map((value) => (
          <FormControlLabel
            key={getName(value)}
            control={
              <Checkbox
                checked={formState[filter][getName(value)] || false}
                onChange={handleCheckboxChange(filter, getName(value))}
                name={getName(value)}
              />
            }
            label={getName(value)}
          />
        ))}
      </FormGroup>
    </FormControl>
  );
}

function isCategory(value: FilterValue | Category): value is Category {
  return "slug" in value;
}

function getName(value: FilterValue | Category): string {
  return isCategory(value) ? value.name : value.display_name;
}
