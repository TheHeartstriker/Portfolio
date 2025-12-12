import "../site.css";
import "../animation.css";
import Background from "../components/backgrounds/background";
import Nav from "../components/nav/nav";
import PropTypes from "prop-types";
import FadeLayout from "../route/fadeLayout";
import LenisProvider from "@/components/nav/smoothScrool";
import { AnimationProvider } from "@/components/animationContext";
import { protestGuerrilla, exo2 } from "@/utils/fonts";
export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${exo2.variable} ${protestGuerrilla.variable}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="icon" type="image/png" href="/favicon-32x32.png" />
        {/* Google Analytics */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-EKDZD6L7ZT"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-EKDZD6L7ZT');
            `,
          }}
        />
      </head>
      <body>
        <AnimationProvider>
          <Background />
          <Nav />
          <LenisProvider>
            <FadeLayout>{children}</FadeLayout>
          </LenisProvider>
        </AnimationProvider>
      </body>
    </html>
  );
}

RootLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
