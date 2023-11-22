import { useRef } from "react";
import ProductHeroLayout from "./ProductHeroLayout";
import "./ProductHero.css";
import useOnScreen from "../useOnScreen";
import { Box, Typography } from "@mui/material";

const backgroundImage = "public/static/blue-wavy-background.jpg";

export default function ProductHero() {
  const ref = useRef<HTMLDivElement>(null);
  const { hasBeenIntersected } = useOnScreen(ref);
  return (
    <>
      <ProductHeroLayout
        sxBackground={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundColor: "#19268c", // Average color of the background image.
          backgroundPosition: "center",
        }}
      >
        {/* Increase the network loading priority of the background image. */}
        <img
          style={{ display: "none" }}
          src={backgroundImage}
          alt="increase priority"
        />
        <Box
          ref={ref}
          className={`transitioned-section transitioned-section-hidden ${
            hasBeenIntersected && "transitioned-section-visible"
          }`}
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <Typography
            color="inherit"
            align="center"
            variant="h2"
            className="transitioned-content"
          >
            Andy Garcia
          </Typography>
          <Typography
            color="inherit"
            align="center"
            variant="h5"
            sx={{ mb: 4, mt: { xs: 4, sm: 10 } }}
            className="transitioned-content"
          >
            Principal Software Engineer
          </Typography>
          <Typography
            variant="body2"
            color="inherit"
            sx={{ mt: 2 }}
            className="transitioned-content"
          >
            Strategic software engineer, driving innovation. Proven leader
            achieving team success.
          </Typography>
        </Box>
      </ProductHeroLayout>
    </>
  );
}
