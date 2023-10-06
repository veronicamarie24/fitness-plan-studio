import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormGroupProps,
  FormLabel,
} from "@mui/material";
import { Category, FilterValue } from "../../api/get-filters";
import { CheckboxCategories } from "../plan-preferences-form";

type FilterCheckboxProps = {
  label: string;
  filter: CheckboxCategories;
  values: FilterValue[] | Category[];
  handleCheckboxChange: (
    category: CheckboxCategories,
    value: string
  ) => (event: React.ChangeEvent<HTMLInputElement>) => void;
  filterFormState: Record<string, boolean>;
};

export function FilterCheckboxGroup(props: FilterCheckboxProps) {
  const { label, filter, values, handleCheckboxChange, filterFormState } =
    props;

  return (
    <FormControl component="fieldset" variant="standard">
      <FormLabel component="legend">{label}</FormLabel>
      <FormGroup>
        {values.map((value) => (
          <FormControlLabel
            key={getName(value)}
            control={
              <Checkbox
                checked={filterFormState[getName(value)] || false}
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
