import * as React from "react";
import FeaturedProjects from "./featured-projects-section/FeaturedProjects";
import AppFooter from "../../modules/views/AppFooter";
import ProductHero from "./ProductHero";
import GetInTouchSection from "./GetInTouchSection";

function Home() {
  return (
    <React.Fragment>
      <ProductHero />
      <FeaturedProjects />
      {/* <AboutMeSection /> */}
      {/* <EducationSection /> */}
      <GetInTouchSection />
      {/* <ProductSmokingHero /> */}
      {/* <AppFooter /> */}
    </React.Fragment>
  );
}

export default Home;
