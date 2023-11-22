import { useRef } from "react";
import { Theme } from "@mui/material/styles";
import { SxProps } from "@mui/system";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Typography from "../components/Typography";
import TerminalIcon from "@mui/icons-material/Terminal";
import GroupsIcon from "@mui/icons-material/Groups";
import BusinessIcon from "@mui/icons-material/Business";
import useOnScreen from "../useOnScreen";

import "./AboutMeSection.css";

const item: SxProps<Theme> = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  px: 5,
};

function AboutMeSection() {
  const firstItemRef = useRef<HTMLDivElement>(null);
  const { hasBeenIntersected: firstItemHasBeenIntersected } =
    useOnScreen(firstItemRef);
  const secondItemRef = useRef<HTMLDivElement>(null);
  const { hasBeenIntersected: secondItemHasBeenIntersected } =
    useOnScreen(secondItemRef);
  const thirdItemRef = useRef<HTMLDivElement>(null);
  const { hasBeenIntersected: thirdItemHasBeenIntersected } =
    useOnScreen(thirdItemRef);

  return (
    <Box
      component="section"
      sx={{ display: "flex", overflow: "hidden", bgcolor: "secondary.light" }}
    >
      <Container sx={{ mt: 15, mb: 30, display: "flex", position: "relative" }}>
        <Box
          component="img"
          src="/static/themes/onepirate/productCurvyLines.png"
          alt="curvy lines"
          sx={{ pointerEvents: "none", position: "absolute", top: -180 }}
        />
        <Grid container spacing={5}>
          <Grid
            item
            xs={12}
            md={4}
            className={`about-me-transitioned-content about-me-transitioned-content-hidden ${
              firstItemHasBeenIntersected
                ? "about-me-transitioned-content-visible"
                : ""
            }`}
            ref={firstItemRef}
          >
            <Box sx={item}>
              <TerminalIcon sx={{ height: 55, fontSize: "55px" }} />
              <Typography variant="h6" sx={{ my: 5 }}>
                Favorite Technology
              </Typography>
              <Box display="grid" gap={1}>
                <Typography>React</Typography>
                <Typography>GraphQL</Typography>
                <Typography>NodeJS</Typography>
                <Typography>AWS</Typography>
                <Typography>Apollo</Typography>
                <Typography>NoSQL</Typography>
              </Box>
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            md={4}
            className={`about-me-transitioned-content about-me-transitioned-content-hidden ${
              secondItemHasBeenIntersected
                ? "about-me-transitioned-content-visible"
                : ""
            }`}
            ref={secondItemRef}
          >
            <Box sx={item}>
              <GroupsIcon sx={{ height: 55, fontSize: "55px" }} />

              <Typography variant="h6" sx={{ my: 5 }}>
                Known For
              </Typography>
              <Box display="grid" gap={1}>
                <Typography>Excellent Leadership</Typography>
                <Typography>Inquisitive Questions</Typography>
                <Typography>Challenging the Status Quo</Typography>
                <Typography>High Standards</Typography>
                <Typography>Intrinsic Motivation</Typography>
                <Typography>High Level Thinker</Typography>
              </Box>
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            md={4}
            className={`about-me-transitioned-content about-me-transitioned-content-hidden ${
              thirdItemHasBeenIntersected
                ? "about-me-transitioned-content-visible"
                : ""
            }`}
            ref={thirdItemRef}
          >
            <Box sx={item}>
              <BusinessIcon sx={{ height: 55, fontSize: "55px" }} />
              <Typography variant="h6" sx={{ my: 5 }}>
                Past Clients
              </Typography>
              <Box display="grid" gap={1}>
                <Typography>Prescryptive Health</Typography>
                <Typography>Pariveda Solutions</Typography>
                <Typography>Expedia</Typography>
                <Typography>T-Mobile</Typography>
                <Typography>Boise Cascade</Typography>
                <Typography>Wisedoc</Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default AboutMeSection;
