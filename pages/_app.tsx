import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import Head from "next/head";
import Script from "next/script";
import { useEffect } from "react";

import useSWR, { SWRConfig } from "swr";
import { appWithTranslation } from "next-i18next";
import { pageview } from "@/lib/gtag";
import { fetcher } from "@/lib/axios";

// import Header from "@/components/header";

const App = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
        />
      </Head>
      {/* Google Analytics & GTM */}
      <Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
      />
      <Script id="google-analytics" strategy="lazyOnload">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}', {
            page_path: '${router.asPath}'
          });
        `}
      </Script>
      <SWRConfig
        value={{
          refreshInterval: 3000,
          // Set fetcher so that every request does not have to pass in manually
          fetcher,
          onError: (error, key) => {
            if (error.status !== 403 && error.status !== 404) {
              // log error and display UI
            }
          },
        }}
      >
        {/* <Header /> */}
        <Component {...pageProps} />
      </SWRConfig>
    </>
  );
};

export default appWithTranslation(App);
