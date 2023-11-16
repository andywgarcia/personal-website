import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Container from "@mui/material/Container";
import Typography from "../components/Typography";
import TextField from "../components/TextField";

function Copyright() {
  return (
    <React.Fragment>
      <Typography color="inherit" component="span">
        Last Updated:
      </Typography>{" "}
      {new Date().getMonth()}
      {"/"}
      {new Date().getFullYear()}
    </React.Fragment>
  );
}

const iconStyle = {
  width: 48,
  height: 48,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

export default function AppFooter() {
  return (
    <Typography
      component="footer"
      sx={{ display: "flex", bgcolor: "secondary.light" }}
    >
      <Container sx={{ my: 4, display: "flex", justifyContent: "flex-end" }}>
        <Typography color="inherit" component="span">
          Last Updated: November 2023
        </Typography>
      </Container>
    </Typography>
  );
}
