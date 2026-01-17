import "../site.css";
import "../animation.css";
import Background from "../components/forStyle/backgrounds/background";
import Nav from "../components/nav/nav";
import PropTypes from "prop-types";
import FadeLayout from "../route/fadeLayout";
import LenisProvider from "@/components/nav/smoothScrool";
import { Provider } from "@/components/forStyle/animations/animationContext";
import { Display, Body } from "@/utils/fonts";
import ThemeGen from "@/components/forStyle/themeGen/theme";
import Footer from "@/components/footer/footer";
import Script from "next/script";
export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${Display.variable} ${Body.variable}`}>
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
          <ThemeGen />
          <Background />
          <Nav />
          <LenisProvider>
            <FadeLayout>
              {children}
              <Footer />
            </FadeLayout>
          </LenisProvider>
        </Provider>
      </body>
    </html>
  );
}

RootLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
