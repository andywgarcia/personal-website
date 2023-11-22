import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

export default function AppFooter() {
  return (
    <Typography
      component="footer"
      sx={{ display: "flex", bgcolor: "secondary.light" }}
    >
      <Container
        sx={{ my: 4, display: "flex", justifyContent: "flex-end" }}
      ></Container>
    </Typography>
  );
}
