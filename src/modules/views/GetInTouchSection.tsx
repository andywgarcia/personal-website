import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Typography from "../components/Typography";
import TextField from "../components/TextField";
import Snackbar from "../components/Snackbar";
import Button from "../components/Button";
import { useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { validateEmail } from "./validateEmail";

const snackbarSuccessMessage =
  "Thank you for reaching out. I'll be in contact with you shortly!";
const snackBarRecaptchaError =
  "Please verify you are not a robot by completing the recaptcha.";
const snackbarErrorMessage = "Something went wrong. Please try again.";

function GetInTouchSection() {
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState(
    snackbarSuccessMessage,
  );
  const [recaptchaResponse, setRecaptchaResponse] = useState<string | null>(
    null,
  );
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const [email, setEmail] = useState<string | null>(null);
  const onEmailChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setEmailErrorMessage(undefined);
    setEmail(e.target.value);
  };
  const [emailErrorMessage, setEmailErrorMessage] = useState<string>();
  const [message, setMessage] = useState<string>("");

  const clearForm = () => {
    recaptchaRef?.current?.reset();
    setMessage("");
    setEmail("");
  };

  const isValidForm = !!recaptchaResponse && validateEmail(email || "");
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setEmailErrorMessage(undefined);
    if (isValidForm) {
      console.log(email, message, recaptchaResponse);
      setSnackbarMessage(snackbarSuccessMessage);
      setIsSnackbarOpen(true);
      clearForm();
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
    <Container component="section" sx={{ mt: 10, display: "flex" }}>
      <Grid container>
        <Grid item xs={12} md={6} sx={{ zIndex: 1 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              bgcolor: "warning.main",
              py: 8,
              px: 3,
            }}
          >
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{ maxWidth: 400 }}
              display="grid"
              gap={2}
            >
              <Typography variant="h2" component="h2">
                Get in touch
              </Typography>
              <Typography variant="h5">
                Introduce yourself, request my resume, or just say hi. No matter
                what, let's connect!
              </Typography>
              <TextField
                value={email}
                onChange={onEmailChange}
                noBorder
                placeholder="Your email"
                variant="standard"
                fullWidth
                helperText={emailErrorMessage}
                required
                error={!!emailErrorMessage}
                type="email"
              />
              <TextField
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                noBorder
                placeholder="Message"
                variant="standard"
                fullWidth
                multiline
                rows={4}
              />
              <ReCAPTCHA
                sitekey="6LfMBREpAAAAAJMQs1DFuFq9UomsqvzjcIUi2Emk"
                onChange={(token) => setRecaptchaResponse(token)}
                ref={recaptchaRef}
              ></ReCAPTCHA>
              <Button
                type="submit"
                color="primary"
                variant="contained"
                fullWidth
              >
                Connect
              </Button>
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          sx={{ display: { md: "block", xs: "none" }, position: "relative" }}
        >
          <Box
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
          />
          <Box
            component="img"
            src="https://images.unsplash.com/photo-1527853787696-f7be74f2e39a?auto=format&fit=crop&w=750"
            alt="call to action"
            sx={{
              position: "absolute",
              top: -28,
              left: -28,
              right: 0,
              bottom: 0,
              width: "100%",
              maxWidth: 600,
            }}
          />
        </Grid>
      </Grid>
      <Snackbar
        open={isSnackbarOpen}
        onClose={handleClose}
        message={snackbarMessage}
      />
    </Container>
  );
}

export default GetInTouchSection;