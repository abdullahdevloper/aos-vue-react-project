import { AddShoppingCart } from "@mui/icons-material";
import { Fab, Stack, Typography } from "@mui/material";

export default function FabIconCard() {
  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <Fab color="secondary" size="medium"><AddShoppingCart /></Fab>
      <Typography fontWeight={800}>Quick add product</Typography>
    </Stack>
  );
}
