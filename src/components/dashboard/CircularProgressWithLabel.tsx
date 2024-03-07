import { Box,Typography,CircularProgressProps, CircularProgress } from "@mui/material";


function CircularProgressWithLabel(
    props: CircularProgressProps & { type: string; value: number }
  ) {
    return (
      <Box sx={{ position: "relative", display: "inline-flex" }}>
        <CircularProgress
          color={props.type === "success" ? "primary" : "error"}
          size={70}
          variant="determinate"
          {...props}
        />
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: "absolute",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            variant="caption"
            component="div"
            color="text.secondary"
          >{`${Math.round(props.value)}%`}</Typography>
        </Box>
      </Box>
    );
  }

  export default CircularProgressWithLabel;