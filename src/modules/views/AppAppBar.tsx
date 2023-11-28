import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import AppBar from "../components/AppBar";
import Toolbar from "../components/Toolbar";
import "./AppAppBar.css";
import { useEffect, useRef, useState } from "react";
import ContactForm from "./ContactForm";
import Snackbar from "../components/Snackbar";
import Button from "@mui/material/Button";
import { useLocation } from "react-router-dom";

const SNACKBAR_SUCCESS_MESSAGE =
  "My email will be automatically emailed to you very soon. Thank you!";
const SNACKBAR_ERROR_MESSAGE = "Something went wrong. Please try again.";

function AppAppBar() {
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState(
    SNACKBAR_SUCCESS_MESSAGE,
  );

  const onContactFormSubmit = (didError: boolean) => {
    if (didError) {
      setSnackbarMessage(SNACKBAR_ERROR_MESSAGE);
    } else {
      setSnackbarMessage(SNACKBAR_SUCCESS_MESSAGE);
      setIsDialogOpen(false);
    }
    setIsSnackbarOpen(true);
  };
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const onRequestResumeClick: React.MouseEventHandler<HTMLAnchorElement> = (
    e,
  ) => {
    e.stopPropagation();
    setIsDialogOpen(true);
  };

  const appBarRef = useRef<HTMLDivElement>();
  useEffect(() => {
    if (appBarRef?.current) {
      document.documentElement.style.setProperty(
        "--scroll-padding",
        `${appBarRef.current.offsetHeight}px`,
      );
    }
  }, [appBarRef?.current]);

  const { pathname } = useLocation();
  return (
    <Box ref={appBarRef}>
      <AppBar position="fixed" sx={{ backgroundColor: "#FFFFFF" }}>
        <Toolbar
          sx={{ justifyContent: "space-between", gap: 2, alignItems: "top" }}
        >
          <Box flexShrink={0}>
            <Link
              variant="h6"
              underline="none"
              href={pathname === "/" ? "#" : undefined}
              sx={{ fontSize: 24, height: 32 }}
              // @ts-ignore
              component={pathname === "/" ? "a" : undefined}
            >
              {"Andy Garcia"}
            </Link>
          </Box>
          <Box display="flex" gap={2} alignItems="center">
            <Button
              href="https://www.linkedin.com/in/andywgarcia/"
              target="_blank"
              variant="text"
            >
              LinkedIn
            </Button>
            <Button href="https://github.com/andywgarcia" target="_blank">
              GitHub
            </Button>
            <Button component="a" onClick={onRequestResumeClick}>
              Resume
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <ContactForm
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSubmit={onContactFormSubmit}
      />
      <Snackbar
        open={isSnackbarOpen}
        onClose={() => setIsSnackbarOpen(false)}
        message={snackbarMessage}
      />
    </Box>
  );
}

export default AppAppBar;
