import { School } from "@mui/icons-material";
import { ActionButton, ContentCard, StatusChips } from "../../../../common";

export default function CourseCard() {
  return <ContentCard title="Advanced UI Systems" action={<ActionButton>Resume</ActionButton>}><StatusChips labels={["8 lessons", "Intermediate", "MUI"]} /></ContentCard>;
}
