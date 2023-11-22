import * as React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Markdown from "./modules/components/Markdown";
import AppAppBar from "./modules/views/AppAppBar";
import AppFooter from "./modules/views/AppFooter";
import withRoot from "./modules/withRoot";
import terms from "./modules/views/terms.md";
import Typography from "@mui/material/Typography";

function Terms() {
  return (
    <React.Fragment>
      <AppAppBar />
      <Container>
        <Box sx={{ mt: 7, mb: 12 }}>
          <Typography variant="h3" align="center">
            Terms
          </Typography>
          <Markdown>{terms}</Markdown>
        </Box>
      </Container>
      <AppFooter />
    </React.Fragment>
  );
}

export default withRoot(Terms);
