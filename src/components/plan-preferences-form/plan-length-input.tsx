import {
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { useState } from "react";

type PlanLengthInputProps = {
  onPlanLengthChange: (value: string, unit: string) => void;
};

export function PlanLengthInput(props: PlanLengthInputProps) {
  const { onPlanLengthChange } = props;

  const [value, setValue] = useState("");
  const [unit, setUnit] = useState("days");
  const [planLengthError, setPlanLengthError] = useState("");

  const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setValue(inputValue);
    // Simple validation for planLength
    const numberValue = +inputValue;
    if (!Number.isInteger(numberValue) || numberValue < 1 || numberValue > 12) {
      setPlanLengthError("You must enter a whole number between 1 and 12.");
    } else {
      setPlanLengthError("");
      onPlanLengthChange(inputValue, unit);
    }
  };

  const handleUnitChange = (event: SelectChangeEvent<string>) => {
    setUnit(event.target.value);
    onPlanLengthChange(value, event.target.value);
  };

  return (
    <FormControl sx={{ maxWidth: "200px", flexDirection: "row" }}>
      <TextField
        label="Plan length"
        variant="standard"
        onChange={handleValueChange}
        helperText={planLengthError}
        error={!!planLengthError}
        sx={{ mr: 1 }}
      />
      <Select value={unit} onChange={handleUnitChange}>
        <MenuItem value="days">Days</MenuItem>
        <MenuItem value="weeks">Weeks</MenuItem>
        <MenuItem value="months">Months</MenuItem>
      </Select>
    </FormControl>
  );
}
