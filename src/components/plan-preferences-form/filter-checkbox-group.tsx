import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormGroupProps,
  FormLabel,
} from "@mui/material";
import { Category, FilterValue } from "../../api/get-filters-categories";
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
                checked={filterFormState[getFormDataName(value)] || false}
                onChange={handleCheckboxChange(filter, getFormDataName(value))}
                name={getFormDataName(value)}
              />
            }
            label={getLabel(value)}
          />
        ))}
      </FormGroup>
    </FormControl>
  );
}

function isCategory(value: FilterValue | Category): value is Category {
  return "slug" in value;
}

function getLabel(value: FilterValue | Category): string {
  return getName(value);
}

function getFormDataName(value: FilterValue | Category): string {
  return isCategory(value) ? getName(value) : getId(value);
}

function getName(value: FilterValue | Category): string {
  return isCategory(value) ? value.name : value.display_name;
}

function getId(value: FilterValue | Category): string {
  return isCategory(value) ? value.id : value.value;
}
