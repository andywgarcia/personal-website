import { useRef } from "react";
import ProductHeroLayout from "./ProductHeroLayout";
import useOnScreen from "../../hooks/useOnScreen";
import { Box, Typography, IconButton, Link } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import "./ProductHero.css";

const backgroundImage = "/static/blue-wavy-background.jpg";

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
          gap={2}
        >
          <Typography
            color="inherit"
            align="center"
            variant="h1"
            className="transitioned-content"
            textTransform="none"
            fontWeight="700"
          >
            Andy Garcia
          </Typography>
          <Box className="transitioned-content">
            <Typography
              color="inherit"
              align="center"
              variant="h5"
              component="h2"
              textTransform="none"
              letterSpacing={0}
            >
              Strategic software engineer and proven leader,
            </Typography>
            <Typography
              color="inherit"
              align="center"
              variant="h5"
              component="h2"
              textTransform="none"
              letterSpacing={0}
            >
              driving innovation and achieving team success
            </Typography>
          </Box>
          <Box
            className="transitioned-content"
            display="flex"
            gap={1}
            alignItems="center"
          >
            <IconButton
              aria-label="GitHub"
              component={Link}
              href="https://github.com/andywgarcia"
              target="_blank"
              sx={(theme) => ({ color: theme.palette.common.white })}
              size="large"
            >
              <GitHubIcon />
            </IconButton>
            <IconButton
              aria-label="LinkedIn"
              component={Link}
              href="https://www.linkedin.com/in/andywgarcia/"
              target="_blank"
              sx={(theme) => ({ color: theme.palette.common.white })}
              size="large"
            >
              <LinkedInIcon />
            </IconButton>

            <IconButton
              aria-label="Contact"
              sx={(theme) => ({ color: theme.palette.common.white })}
              size="large"
              component="a"
              href="#contact"
            >
              <EmailIcon />
            </IconButton>
          </Box>
        </Box>
      </ProductHeroLayout>
    </>
  );
}
