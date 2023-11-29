import { Box, styled } from "@mui/material";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Project } from "../../../helpers/projects";

const featuredProjects = [
  {
    title: "myPrescryptive",
    description:
      "Allows patients to view the prices of their prescriptions at pharmaacies near them.",
    imageUrl: "/static/myprescryptive.png",
  },
  {
    title: "Wisedoc",
    description:
      "Automagically formats your documents into the format you need.",
    imageUrl: "/static/wisedoc.png",
  },
  {
    title: "Marshmallow",
    description:
      "Calculates the true cost (opportunity cost) of your desires while you are in debt.",
    imageUrl: "/static/marshmallow.png",
  },
];

const FeaturedProjectGrid = styled(Box)(({ theme }) => ({
  "& > div": { display: "flex", gap: theme.spacing(2) },
  "& > div:nth-child(2n-1)": {
    flexDirection: "row",
  },
  "& > div:nth-child(2n)": {
    flexDirection: "row-reverse",
  },
}));

const ProjectTextContainer = styled(Box)(({ theme }) => ({
  flex: 2,
  display: "grid",
  gap: theme.spacing(2),
  alignContent: "center",
  justifyContent: "center",
}));

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
      <FeaturedProjectGrid display="grid" gap={2}>
        {featuredProjects.map((project) => (
          <Box key={project.title}>
            <ProjectTextContainer>
              <Typography component="h3" variant="h5">
                {project.title}
              </Typography>
              <Typography>{project.description}</Typography>
            </ProjectTextContainer>
            <Box flex={1}>
              <img src={project.imageUrl} width="100% " />
            </Box>
          </Box>
        ))}
      </FeaturedProjectGrid>
    </Container>
  );
}
