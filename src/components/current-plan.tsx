import { Box, Typography } from "@mui/material";
import { WorkoutPlan } from "../utils/plan-generator";

export interface CurrentPlanProps {
  workoutPlan: WorkoutPlan;
}

export function CurrentPlan(props: CurrentPlanProps) {
  const { workoutPlan } = props;

  return (
    workoutPlan && (
      <>
        <Typography>{workoutPlan.startDate.getDate()}</Typography>
        {workoutPlan.dailyWorkouts.map((value) => (
          <Box key={value.id}>
            <img
              src={value.image_url}
              alt={value.description}
              loading="lazy"
              width={"100px"}
            />
            <Typography>{value.title}</Typography>
            <Typography>{value.description}</Typography>
            <Typography>{Math.floor(value.duration / 60)}</Typography>
          </Box>
        ))}
      </>
    )
  );
}
