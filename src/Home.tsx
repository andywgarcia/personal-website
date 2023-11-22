import * as React from "react";
import RecentWork from "./modules/views/RecentWork";
import ProductSmokingHero from "./modules/views/ProductSmokingHero";
import AppFooter from "./modules/views/AppFooter";
import ProductHero from "./modules/views/ProductHero";
import AboutMeSection from "./modules/views/AboutMeSection";
import EducationSection from "./modules/views/EducationSection";
import GetInTouchSection from "./modules/views/GetInTouchSection";
import AppAppBar from "./modules/views/AppAppBar";
import withRoot from "./modules/withRoot";

function Index() {
  return (
    <React.Fragment>
      <AppAppBar />
      <ProductHero />
      <AboutMeSection />
      <RecentWork />
      <EducationSection />
      <GetInTouchSection />
      {/* <ProductSmokingHero /> */}
      <AppFooter />
    </React.Fragment>
  );
}

export default withRoot(Index);
