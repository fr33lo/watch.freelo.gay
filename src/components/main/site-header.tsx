import { siteConfig } from "@/configs/site";
import React from "react";
import MainNav from "@/components/navigation/main-nav";

const SiteHeader = () => {
  return (
    // Ensure the header itself paints the solid dark green bar
    <header className="sticky top-0 z-50 bg-terminal-bg-dark border-b border-terminal-accent">
      <MainNav items={siteConfig.mainNav} />
      {/* <MobileNav items={siteConfig.mainNav} className="md:hidden" /> */}
    </header>
  );
};

export default SiteHeader;
