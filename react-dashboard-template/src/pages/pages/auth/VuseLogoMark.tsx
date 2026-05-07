import { Box } from "@mui/material";

export default function VuseLogoMark({ size = 45 }: { size?: number }) {
  return (
    <Box
      component="span"
      aria-hidden="true"
      sx={{
        width: size,
        height: size,
        display: "inline-grid",
        placeItems: "center",
        color: "primary.main",
        lineHeight: 1,
      }}
    >
      <Box
        component="span"
        sx={{
          width: size * 0.78,
          height: size * 0.78,
          border: "4px solid currentColor",
          borderTopColor: "transparent",
          borderRadius: "50%",
          transform: "rotate(40deg)",
          position: "relative",
          "&:before": {
            content: '""',
            position: "absolute",
            width: size * 0.28,
            height: size * 0.28,
            borderRadius: "50%",
            bgcolor: "currentColor",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          },
        }}
      />
    </Box>
  );
}
