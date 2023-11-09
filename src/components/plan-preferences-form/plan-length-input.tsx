import { FormControl, InputAdornment, TextField } from "@mui/material";
import { useEffect, useState } from "react";

type PlanLengthInputProps = {
  onPlanLengthChange: (value: string) => void;
  error: string;
};

export function PlanLengthInput(props: PlanLengthInputProps) {
  const { onPlanLengthChange, error } = props;

  const [planLengthError, setPlanLengthError] = useState(error);

  useEffect(() => {
    setPlanLengthError(error);
  }, [error]);

  const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    // Simple validation for planLength
    const numberValue = +inputValue;
    if (!Number.isInteger(numberValue) || numberValue < 1 || numberValue > 12) {
      setPlanLengthError("You must enter a whole number between 1 and 12.");
    } else {
      setPlanLengthError("");
      onPlanLengthChange(inputValue);
    }
  };

  return (
    <FormControl sx={{ maxWidth: "200px", flexDirection: "row" }}>
      <TextField
        label="Plan length"
        variant="standard"
        onChange={handleValueChange}
        helperText={planLengthError}
        InputProps={{
          endAdornment: <InputAdornment position="start">weeks</InputAdornment>,
        }}
        error={!!planLengthError}
        sx={{ mr: 1 }}
      />
    </FormControl>
  );
}
