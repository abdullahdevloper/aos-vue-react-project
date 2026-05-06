import { checklistItems } from "../../../../../data/dashboardData";
import { TaskList } from "../../../../common";

export default function CheckList() {
  return <TaskList items={checklistItems} />;
}
