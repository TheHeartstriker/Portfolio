import "./footer.css";

import Link from "next/link";
import ThemeButton from "./themeButton";
import FooterAni from "./footerAni";

function Footer() {
  const sessionalThemes = ["Autumn", "Spring", "Summer", "Winter"];

  return (
    <footer className="footer">
      <FooterAni />
      {/*  */}
      {/*  Main heading*/}
      {/*  */}
      <div className="footer-heading">
        <h4>Have something in mind?</h4>
        <h3>Let&apos;s talk</h3>
      </div>
      {/*  */}
      {/*  Links container*/}
      {/*  */}
      <div className="footer-links">
        {/*  */}
        {/* Page nav / discover */}
        <div className="footer-links-item">
          <h4>Discover</h4>
          <Link href={"/"}>Home</Link>
          <Link href={"/work"}>Work</Link>
          <Link href={"/scriptorium"}>Blog</Link>
          <Link href={"/contact"}>Contact</Link>
        </div>
        {/*  */}
        {/* Page nav / discover */}
        <div className="footer-links-item">
          <h4>Themes</h4>
          <ThemeButton theme={sessionalThemes[0]} />
          <ThemeButton theme={sessionalThemes[1]} />
          <ThemeButton theme={sessionalThemes[2]} />
          <ThemeButton theme={sessionalThemes[3]} />
        </div>
        {/*  */}
        {/* Page nav / discover */}
        <div className="footer-links-item">
          <h4>Socials</h4>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={"https://www.upwork.com/freelancers/~01cac9e23edf25b61c"}
          >
            Upwork
          </a>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={"https://x.com/KadenWildauer"}
          >
            Twitter
          </a>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={"https://medium.com/@serkadenwildauer"}
          >
            Medium
          </a>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={"https://www.linkedin.com/in/kaden-wildauer/"}
          >
            LinkedIn
          </a>
        </div>
        {/*  */}
        {/* Page nav / discover */}
        <div className="footer-links-item">
          <h4>Discover</h4>
          <h5>kaden@kadenwildauer.com</h5>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
