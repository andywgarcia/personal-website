import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";
import Container from "@mui/material/Container";
import Typography from "../components/Typography";

const ImageBackdrop = styled("div")(({ theme }) => ({
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  background: "#000",
  opacity: 0.5,
  transition: theme.transitions.create("opacity"),
}));

const ImageIconButton = styled(ButtonBase)(({ theme }) => ({
  position: "relative",
  display: "block",
  padding: 0,
  borderRadius: 0,
  height: "40vh",
  [theme.breakpoints.down("md")]: {
    width: "100% !important",
    height: 100,
  },
  "&:hover": {
    zIndex: 1,
  },
  "&:hover .imageBackdrop": {
    opacity: 0.15,
  },
  "&:hover .imageMarked": {
    opacity: 0,
  },
  "&:hover .imageTitle": {
    border: "4px solid currentColor",
  },
  "& .imageTitle": {
    position: "relative",
    padding: `${theme.spacing(2)} ${theme.spacing(4)} 14px`,
  },
  "& .imageMarked": {
    height: 3,
    width: 18,
    background: theme.palette.common.white,
    position: "absolute",
    bottom: -2,
    left: "calc(50% - 9px)",
    transition: theme.transitions.create("opacity"),
  },
}));

type Image = {
  url: string;
  title: string;
  width: string;
  linkUrl?: string;
};

const images: Image[] = [
  {
    url: "/static/myprescryptive.png?auto=format&fit=crop&w=400",
    title: "myPrescryptive",
    width: "40%",
    linkUrl: "https://my.prescryptive.com",
  },
  {
    url: "https://plus.unsplash.com/premium_photo-1683309556192-d024cd55a9ee?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Add To Trello Chrome Extension",
    width: "20%",
    linkUrl:
      "https://github.com/andywgarcia/create-trello-item-from-page-extension",
  },
  {
    url: "public/static/wisedoc.png",
    title: "Wisedoc",
    width: "40%",
    linkUrl: "https://wisedoc.net/",
  },

  {
    url: "/static/ifedmypet.png",
    title: "iFedMyPet",
    width: "38%",
    linkUrl: "https://ifedmypet.com/",
  },
  {
    url: "/static/marshmallow.jpg",
    title: "Marshmallow",
    width: "38%",
    linkUrl: "https://tinyurl.com/andywgarcia",
  },
  {
    url: "https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0?auto=format&fit=crop&w=400",
    title: "Tap Wars",
    width: "24%",
    linkUrl: "https://github.com/andywgarcia/TapWars",
  },
  {
    url: "https://images.unsplash.com/photo-1506941433945-99a2aa4bd50a?auto=format&fit=crop&w=400",
    title: "Disneyland Table Notifier",
    width: "40%",
  },
  {
    url: "https://images.unsplash.com/photo-1453747063559-36695c8771bd?auto=format&fit=crop&w=400",
    title: "Pokemon Go Plus",
    width: "20%",
    linkUrl: "https://github.com/andywgarcia/pgpemu",
  },
  {
    url: "https://images.unsplash.com/photo-1518136247453-74e7b5265980?auto=format&fit=crop&w=400",
    title: "Underwater Drone",
    width: "40%",
  },
];

export default function RecentWork() {
  const onButtonClick = (image: Image) => {
    if (image.linkUrl) {
      window.open(image.linkUrl, "_blank");
    }
  };
  return (
    <Container component="section" sx={{ mt: 8, mb: 4 }}>
      <Typography variant="h4" marked="center" align="center" component="h2">
        Some of my work
      </Typography>
      <Box sx={{ mt: 8, display: "flex", flexWrap: "wrap" }}>
        {images.map((image) => (
          <ImageIconButton
            key={image.title}
            style={{
              width: image.width,
            }}
            onClick={() => onButtonClick(image)}
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
                backgroundImage: `url(${image.url})`,
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
              >
                {image.title}
                <div className="imageMarked" />
              </Typography>
            </Box>
          </ImageIconButton>
        ))}
      </Box>
    </Container>
  );
}
