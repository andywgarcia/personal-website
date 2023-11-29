import * as React from "react";
import Box, { BoxProps } from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "../../modules/components/TextField";
import Snackbar from "../../modules/components/Snackbar";
import ResumeButton from "../../modules/components/ResumeButton";
import { useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { validateEmail } from "../../helpers/validateEmail";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material";

const snackbarSuccessMessage =
  "Thank you for reaching out. I'll be in contact with you shortly!";
const snackBarRecaptchaError =
  "Please verify you are not a robot by completing the recaptcha.";
const snackbarErrorMessage = "Something went wrong. Please try again.";

const backgroundImage = "/static/blue-wavy-background.jpg";

function GetInTouchSection(props: BoxProps) {
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState(
    snackbarSuccessMessage,
  );
  const [recaptchaResponse, setRecaptchaResponse] = useState<string | null>(
    null,
  );
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const resetRecaptcha = () => {
    recaptchaRef?.current?.reset();
  };

  const [email, setEmail] = useState<string | null>(null);
  const onEmailChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setEmailErrorMessage(undefined);
    setEmail(e.target.value);
  };
  const [emailErrorMessage, setEmailErrorMessage] = useState<string>();
  const [message, setMessage] = useState<string>("");

  const clearForm = () => {
    resetRecaptcha();
    setMessage("");
    setEmail("");
  };

  const isValidForm = !!recaptchaResponse && validateEmail(email || "");
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setEmailErrorMessage(undefined);
    if (isValidForm) {
      console.log(email, message, recaptchaResponse);
      try {
        const response = await fetch(
          "https://xfw1n5qcrb.execute-api.us-east-1.amazonaws.com/contact",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              recaptchaResponse,
              email,
              message,
            }),
          },
        );
        const parsedResponse = await response.json();
        if (!response.ok || !parsedResponse.success) {
          resetRecaptcha();
          throw new Error("Error sending email");
        }
        setSnackbarMessage(snackbarSuccessMessage);
        setIsSnackbarOpen(true);
        clearForm();
      } catch (e) {
        setSnackbarMessage(snackbarErrorMessage);
        setIsSnackbarOpen(true);
      }
    } else if (!validateEmail(email || "")) {
      setEmailErrorMessage("Please enter your email");
    } else if (!recaptchaResponse) {
      setSnackbarMessage(snackBarRecaptchaError);
      setIsSnackbarOpen(true);
    } else {
      setSnackbarMessage(snackbarErrorMessage);
      setIsSnackbarOpen(true);
    }
  };

  const handleClose = () => {
    setIsSnackbarOpen(false);
  };
  return (
    <Box
      component="section"
      sx={{
        pt: 10,
        pb: 5,
        position: "relative",
      }}
      id="contact"
      {...props}
    >
      <Background
        sx={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundColor: "#19268c", // Average color of the background image.
          backgroundPosition: "center",
        }}
        className="full-width"
      />
      <Grid container>
        <Grid item xs={12} md={6} sx={{ zIndex: 1 }}>
          <Box
            sx={(theme) => ({
              display: "flex",
              justifyContent: "center",
              bgcolor: theme.palette.grey[300],
              py: 8,
              px: 3,
            })}
          ></Box>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          sx={{ display: { md: "block", xs: "none" }, position: "relative" }}
        >
          {/* <Box
            sx={{
              position: "absolute",
              top: -67,
              left: -67,
              right: 0,
              bottom: 0,
              width: "100%",
              background:
                "url(/static/themes/onepirate/productCTAImageDots.png)",
            }}
          /> */}
          <Box
            component="img"
            src="/static/andy-headshot.jpeg"
            alt="Andy Garcia"
            sx={{
              position: "absolute",
              top: -28,
              left: -40,
              right: 0,
              bottom: 0,
              width: "100%",
              maxWidth: 500,
            }}
          />
        </Grid>
      </Grid>
      <Snackbar
        open={isSnackbarOpen}
        onClose={handleClose}
        message={snackbarMessage}
      />
    </Box>
  );
}

export default GetInTouchSection;

const Background = styled(Box)({
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  zIndex: -2,
});
