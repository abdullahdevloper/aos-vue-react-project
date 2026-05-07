import type { ReactNode } from "react";
import { Box, Container, Grid, Paper } from "@mui/material";

const neuGlow = "-7px -7px 5px rgba(255,255,255,.9), 7px 7px 7px rgba(174,174,192,.34)";
const neuInset = "inset -7px -7px 5px rgba(255,255,255,.88), inset 7px 7px 7px rgba(174,174,192,.32)";

export default function AuthShell({ illustration, illustrationAlt, children }: { illustration: string; illustrationAlt: string; children: ReactNode }) {
  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default", boxShadow: neuInset }}>
      <Container
        maxWidth={false}
        disableGutters
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          px: { xs: 2, sm: 3 },
          py: { xs: 3, sm: 4 },
        }}
      >
        <Grid container alignItems="center" justifyContent="center">
          <Grid item xs={12} sm={8} md={7}>
            <Paper elevation={0} sx={{ bgcolor: "background.default", borderRadius: 1, boxShadow: neuGlow, overflow: "hidden" }}>
              <Grid container sx={{ m: 0 }}>
                <Grid
                  item
                  md={6}
                  sx={{
                    display: { xs: "none", md: "flex" },
                    alignItems: "center",
                    justifyContent: "center",
                    minHeight: 430,
                    p: 0,
                  }}
                >
                  <Box component="img" src={illustration} alt={illustrationAlt} sx={{ width: "100%", maxHeight: 390, objectFit: "contain" }} />
                </Grid>
                <Grid item xs={12} md={6}>
                  {children}
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
