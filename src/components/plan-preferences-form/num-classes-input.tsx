import { FormControl, TextField } from "@mui/material";
import { useState } from "react";

type NumClassesInputProps = {
  onNumClassesChange: (value: string) => void;
};

export function NumClassesInput(props: NumClassesInputProps) {
  const { onNumClassesChange } = props;

  const [numClassesError, setNumClassesError] = useState("");

  const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    // Simple validation for planLength
    const numberValue = +inputValue;
    if (!Number.isInteger(numberValue) || numberValue < 1 || numberValue > 7) {
      setNumClassesError("You must enter a whole number between 1 and 7.");
    } else {
      setNumClassesError("");
      onNumClassesChange(inputValue);
    }
  };

  return (
    <FormControl sx={{ maxWidth: "200px" }}>
      <TextField
        label="Classes per week"
        variant="standard"
        onChange={handleValueChange}
        helperText={numClassesError}
        error={!!numClassesError}
      />
    </FormControl>
  );
}
