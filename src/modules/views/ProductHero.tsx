import { useState } from "react";
import Button from "../components/Button";
import Typography from "../components/Typography";
import ProductHeroLayout from "./ProductHeroLayout";
import ContactForm from "./ContactForm";
import Snackbar from "../components/Snackbar";

const backgroundImage =
  "https://images.unsplash.com/photo-1534854638093-bada1813ca19?auto=format&fit=crop&w=1400";

const SNACKBAR_SUCCESS_MESSAGE =
  "My email will be automatically emailed to you very soon. Thank you!";
const SNACKBAR_ERROR_MESSAGE = "Something went wrong. Please try again.";
export default function ProductHero() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
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

  return (
    <ProductHeroLayout
      sxBackground={{
        // backgroundImage: `url(${backgroundImage})`,
        backgroundColor: "#7fc7d9", // Average color of the background image.
        backgroundPosition: "center",
      }}
    >
      {/* Increase the network loading priority of the background image. */}
      <img
        style={{ display: "none" }}
        src={backgroundImage}
        alt="increase priority"
      />
      <Typography color="inherit" align="center" variant="h2" marked="center">
        Principal Software Engineer
      </Typography>
      <Typography
        color="inherit"
        align="center"
        variant="h5"
        sx={{ mb: 4, mt: { xs: 4, sm: 10 } }}
      >
        Strategic software engineer, driving innovation.
      </Typography>
      <Button
        color="secondary"
        variant="contained"
        size="large"
        sx={{ minWidth: 200 }}
        onClick={() => setIsDialogOpen(true)}
      >
        Request Resume
      </Button>
      <Typography variant="body2" color="inherit" sx={{ mt: 2 }}>
        Proven leader achieving team success.
      </Typography>
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
    </ProductHeroLayout>
  );
}
