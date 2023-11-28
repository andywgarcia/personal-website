import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

export const ProjectImageIconContainer = styled(Box)(({ theme }) => ({
  display: "flex",

  //   gridTemplateColumns: "repeat(3, auto)",
  //   gridTemplateColumns: "masonry",
  //   gridAutoFlow: "dense",
  //   gridAutoRows: "200px",
  flexWrap: "wrap",
  width: "100%",
  "& button": {
    height: "40vh",
    width: "20%",
  },
  "& \
    button:nth-child(1), \
    button:nth-child(3), \
    button:nth-child(7), \
    button:nth-child(9)": {
    // border: "5px solid blue",
    width: "40%",
  },
  "& \
    button:nth-child(2), \
    button:nth-child(4), \
    button:nth-child(6)": {
    width: "20%",
  },
  "& button:nth-child(5)": {
    width: "60%",
  },
  //   [theme.breakpoints.down("md")]: {
  //     display: "flex",
  //     flexWrap: "wrap",
  //   },
}));
