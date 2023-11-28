import * as React from "react";
import FeaturedProjects from "./modules/views/FeaturedProjects";
import AppFooter from "./modules/views/AppFooter";
import ProductHero from "./modules/views/ProductHero";
import GetInTouchSection from "./modules/views/GetInTouchSection";

function Index() {
  return (
    <React.Fragment>
      <ProductHero />
      <FeaturedProjects />
      {/* <AboutMeSection /> */}
      {/* <EducationSection /> */}
      <GetInTouchSection />
      {/* <ProductSmokingHero /> */}
      <AppFooter />
    </React.Fragment>
  );
}

export default Index;
