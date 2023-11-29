import { Box, Snackbar } from "@mui/material";
import Typography, { TypographyProps } from "@mui/material/Typography";
import ReCAPTCHA from "react-google-recaptcha";
import ResumeButton from "../components/ResumeButton";
import { useState, useRef } from "react";
import { validateEmail } from "../../helpers/validateEmail";
import TextField from "../components/TextField";
const snackbarSuccessMessage =
  "Thank you for reaching out. I'll be in contact with you shortly!";
const snackBarRecaptchaError =
  "Please verify you are not a robot by completing the recaptcha.";
const snackbarErrorMessage = "Something went wrong. Please try again.";
export default function AppFooter(props: TypographyProps) {
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

  const [email, setEmail] = useState<string>("");
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
          [import.meta.env.VITE_API_ENDPOINT, "contact"].join("/"),
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
    <Typography
      component="footer"
      sx={(theme) => ({ bgcolor: theme.palette.grey[300] })}
      id="contact"
      {...props}
    >
      <Box className="breakout">
        <Box sx={{ my: 8, display: "flex", flexWrap: "wrap", gap: 4 }}>
          <Box
            component="img"
            src="/static/andy-headshot.jpeg"
            alt="Andy Garcia"
            maxHeight="465px"
            sx={{ display: { xs: "none", md: "block" } }}
          />
          <Box
            component="form"
            onSubmit={handleSubmit}
            display="grid"
            gap={2}
            flex={1}
          >
            <Typography variant="h3" component="h2">
              Get in touch
            </Typography>
            <Typography>
              Introduce yourself or just say hi. Let's connect!
            </Typography>
            <TextField
              value={email}
              onChange={onEmailChange}
              noBorder
              placeholder="example@email.com"
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
              placeholder="Type your message here..."
              variant="standard"
              fullWidth
              multiline
              rows={4}
            />
            <ReCAPTCHA
              sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
              onChange={(token) => setRecaptchaResponse(token)}
              ref={recaptchaRef}
            ></ReCAPTCHA>
            <ResumeButton
              type="submit"
              color="primary"
              variant="contained"
              fullWidth
            >
              Connect
            </ResumeButton>
          </Box>
        </Box>
      </Box>
      <Snackbar
        open={isSnackbarOpen}
        onClose={handleClose}
        message={snackbarMessage}
      />
    </Typography>
  );
}
