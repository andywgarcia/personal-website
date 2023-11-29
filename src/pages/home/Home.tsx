import * as React from "react";
import FeaturedProjects from "./featured-projects-section/FeaturedProjects";
import AppFooter from "../../modules/views/AppFooter";
import ProductHero from "./ProductHero";
import GetInTouchSection from "./GetInTouchSection";

function Home() {
  return (
    <React.Fragment>
      <ProductHero className="full-width" />
      <FeaturedProjects />
      {/* <AboutMeSection /> */}
      {/* <EducationSection /> */}
      {/* <GetInTouchSection className="full-width content-grid" /> */}
      {/* <ProductSmokingHero /> */}
    </React.Fragment>
  );
}

export default Home;
