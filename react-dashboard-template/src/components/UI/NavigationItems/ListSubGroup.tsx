import { ExpandMore } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material";
import NavigationItem from "./NavigationItem";

export default function ListSubGroup({ title = "Dashboards" }: { title?: string }) {
  return (
    <Accordion disableGutters>
      <AccordionSummary expandIcon={<ExpandMore />}><Typography>{title}</Typography></AccordionSummary>
      <AccordionDetails><NavigationItem title="Analytical" path="/" /></AccordionDetails>
    </Accordion>
  );
}
