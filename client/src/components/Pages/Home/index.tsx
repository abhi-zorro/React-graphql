import { Typography, Paper } from "@mui/material";
import React, { Fragment } from "react";
/** importing our pages */
import Tweets from "../Tweet";

export default function Pages() {
  return (
    <Paper
      sx={{
        textAlign: "center",
        width: "100%",
        marginTop: "50px",
        maxWidth: 600,
        marginLeft: "auto",
        marginRight: "auto",
        alignItems: "center",
        bgcolor: "background.paper",
      }}
    >
      <Typography>"Twitter Tweets"</Typography>
      <Tweets />
    </Paper>
  );
}
