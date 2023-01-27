import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import Head from "next/head";
import Script from "next/script";
import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { appWithTranslation } from "next-i18next";

import Cookies from "@/lib/cookies";
import { store } from "../redux/store";
import { Provider } from "react-redux";
import Sidebar from "@/components/sidebar";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { pageview } from "@/lib/gtag";

const ValidateAuth = () => {
  // useEffect(async () => {
  //   const accessToken: string = Cookies.get("accessToken") || "";
  //   const refreshToken: string = Cookies.get("refreshToken") || "";

  //   if (Boolean(accessToken) && Boolean(refreshToken)) {
  //     const valid = await validateAccessTokenAPI();
  //   } else {
  //     Cookies.remove("accessToken");
  //     Cookies.remove("refreshToken");
  //   }
  // }, [dispatch]);
  return null;
};

// @ts-ignore
const Site = ({ Component, pageProps }) => {
  const { data } = pageProps;

  useEffect(() => {
    // if no site info , populate site info
    // setContext;
  }, []);

  return (
    <>
      <Header />
      <Component {...pageProps} />
      <Footer />
      <Sidebar />
    </>
  );
};

const App = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();

  // Create a client
  const queryClient = new QueryClient();

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

      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <Site Component={Component} pageProps={pageProps} />
          <ValidateAuth />
        </QueryClientProvider>
      </Provider>
    </>
  );
};

export default appWithTranslation(App);
