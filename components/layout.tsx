import React, { useEffect, useState, memo } from "react";
import Script from "next/script";

// import { isBrowser, isMobileSafari, useWindowSize } from "@/lib/helpers";

// import HeadSEO from "@/components/head-seo";
import Header from "@/components/header1";
import Footer from "@/components/footer";

interface LayoutProps {
  site: any;
  page: any;
  schema?: any;
  children: React.ReactNode;
}

const Layout = ({ site = {}, page = {}, schema, children }: LayoutProps) => {
  // set window height var (w/ safari/iOS hack)
  // const { height: windowHeight } = useWindowSize();
  // const [lockHeight, setLockHeight] = useState(false);
  // const hasChin = isMobileSafari();

  // set header height
  const [headerHeight, setHeaderHeight] = useState(null);

  //   useEffect(() => {
  //     if ((isBrowser && !lockHeight) || !hasChin) {
  //       document.body.style.setProperty("--vh", `${windowHeight * 0.01}px`);
  //       setLockHeight(hasChin);
  //     }
  //   }, [windowHeight, hasChin]);

  return (
    <>
      {/* <HeadSEO site={site} page={page} schema={schema} /> */}

      {site.gtmID && (
        <Script
          id="gtm"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','${site.gtmID}');`,
          }}
        />
      )}

      <div
        key={page.id}

        // variants={pageTransitionAnim}
        // style={headerHeight ? { "--headerHeight": `${headerHeight}px` } : null}
      >
        <Header
        //   data={site.header}
        //   onSetup={({ height }) => setHeaderHeight(height)}
        />
        <main id="content">{children}</main>
        <Footer data={site.footer} />
      </div>
    </>
  );
};

export default Layout;
