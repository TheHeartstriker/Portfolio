import "../site.css";
import Nav from "@/components/nav/nav.jsx";
import PropTypes from "prop-types";
import LenisProvider from "@/components/nav/smoothScrool";
import { Display, Body } from "@/utils/text/fonts";
import IntroXFooter from "@/components/introXfooter/introXfooter";
import Script from "next/script";
import FilmGrain from "@/components/filmGrain/filmGrain";
import Opening from "@/components/opening/opening";
import Provider from "@/components/provider/provider";
export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${Display.variable} ${Body.variable}`}
      suppressHydrationWarning
    >
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="icon" type="image/png" href="/favicon-32x32.png" />
      </head>
      <body>
        {/* Google analytics */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-EKDZD6L7ZT"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-EKDZD6L7ZT');
      `,
          }}
        />
        <Provider>
          {/* <Opening /> */}
          <Nav />
          <FilmGrain />
          <LenisProvider>
            {children}
            <IntroXFooter />
          </LenisProvider>
        </Provider>
      </body>
    </html>
  );
}

RootLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
