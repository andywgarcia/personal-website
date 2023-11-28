import { Box } from "@mui/material";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import projects, { Project } from "../../../helpers/projects";
import { ImageIconButton } from "./ImageIconButton";
import { ImageBackdrop } from "./ImageBackdrop";
import { ProjectImageIconContainer } from "./ProjectImageIconContainer";

export default function FeaturedProjects() {
  const navigate = useNavigate();
  const onButtonClick = (project: Project) => {
    if (project.linkUrl) {
      window.open(project.linkUrl, "_blank");
    } else {
      navigate(
        `projects/${project.title.toLocaleLowerCase().replace(" ", "-")}`,
      );
    }
  };

  const sectionRef = useRef<HTMLDivElement>(null);
  const { hash } = useLocation();
  useEffect(() => {
    if (sectionRef?.current && hash.includes("featured-projects")) {
      setTimeout(() => sectionRef?.current?.scrollIntoView(), 700);
    }
  }, [hash, sectionRef?.current]);
  return (
    <Container
      component="section"
      sx={{ pt: 8, pb: 4, display: "grid", gap: 8 }}
      id="featured-projects"
      ref={sectionRef}
    >
      <Button
        component="a"
        href="#featured-projects"
        disableRipple
        sx={{
          "&:hover": { backgroundColor: "unset" },
        }}
      >
        <Typography variant="h4" align="center" component="h2">
          Featured Projects
        </Typography>
      </Button>
      <ProjectImageIconContainer>
        {projects.map((project) => (
          <ImageIconButton
            key={project.title}
            onClick={() => onButtonClick(project)}
          >
            <Box
              sx={{
                position: "absolute",
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                backgroundSize: "cover",
                backgroundPosition: "center 40%",
                backgroundImage: project.url ? `url(${project.url})` : "unset",
              }}
            />
            <ImageBackdrop className="imageBackdrop" />
            <Box
              sx={{
                position: "absolute",
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "common.white",
              }}
            >
              <Typography
                component="h3"
                variant="h6"
                color="inherit"
                className="imageTitle"
                margin={2}
              >
                {project.title}
                <div className="imageMarked" />
              </Typography>
            </Box>
          </ImageIconButton>
        ))}
      </ProjectImageIconContainer>
    </Container>
  );
}
