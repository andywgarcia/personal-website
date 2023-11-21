import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import AppBar from "../components/AppBar";
import Toolbar from "../components/Toolbar";

import "./AppAppBar.css";

function AppAppBar() {
  return (
    <Box>
      <AppBar position="fixed">
        <Toolbar sx={{ justifyContent: "end", gap: 2, alignItems: "top" }}>
          <Box
            component="a"
            href="https://www.linkedin.com/in/andywgarcia/"
            target="_blank"
            width={32}
            height={32}
            display="flex"
            alignItems="bottom"
          >
            <img
              src="/static/LI-In-Bug.png"
              alt="LinkedIn"
              className="social-media-icon-button"
            />
          </Box>
          <Box
            component="a"
            href="https://github.com/andywgarcia"
            target="_blank"
            width={32}
            height={32}
            display="flex"
            alignItems="bottom"
          >
            <img
              src="/static/github-mark-white.png"
              alt="GitHub"
              className="social-media-icon-button"
            />
          </Box>
          <Link
            variant="h6"
            underline="none"
            color="inherit"
            href="/"
            sx={{ fontSize: 24, height: 32 }}
          >
            {"Andy Garcia"}
          </Link>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </Box>
  );
}

export default AppAppBar;
