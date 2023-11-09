import { FormControl, TextField } from "@mui/material";
import { useEffect, useState } from "react";

type NumClassesInputProps = {
  onNumClassesChange: (value: string) => void;
  error: string;
};

export function NumClassesInput(props: NumClassesInputProps) {
  const { onNumClassesChange, error } = props;

  const [numClassesError, setNumClassesError] = useState(error);

  useEffect(() => {
    if (error) {
      setNumClassesError(error);
    }
  }, [error]);

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
