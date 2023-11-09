import { Stack } from "@mui/material";
import { WorkoutPlan } from "../utils/plan-generator";

export interface CurrentPlanProps {
  workoutPlan: WorkoutPlan;
}

export function CurrentPlan(props: CurrentPlanProps) {
  const { workoutPlan } = props;

  return workoutPlan && <Stack>{workoutPlan.startDate.getDate()}</Stack>;
}
