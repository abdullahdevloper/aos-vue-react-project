import { Grid } from "@mui/material";
import HorizontalCard from "../Card/HorizontalCard";

export default function HorizontalCardList() {
  return (
    <Grid container spacing={2}>
      {["Planning", "Execution", "Review"].map((title) => (
        <Grid item xs={12} md={4} key={title}><HorizontalCard title={title} subtitle="Migration lane" /></Grid>
      ))}
    </Grid>
  );
}
