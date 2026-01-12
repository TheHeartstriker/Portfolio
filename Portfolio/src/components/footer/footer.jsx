import "./footer.css";
import LogoLinkedIn from "/public/logo-linkedin";
import TwitterLogo from "/public/logo-twitter";
import UpworkRoundedsquare from "/public/upwork-roundedsquare";
import GitHubLogo from "/public/icons/Github";
import ThemeButton from "./themeButton";

import Link from "next/link";

function Footer() {
  const navPages = {
    "About Me": "/",
    Skills: "/skills",
    Scriptorium: "/scriptorium",
    Contact: "/contact",
  };

  const socials = {
    GitHub: "https://github.com/TheHeartstriker",
    LinkedIn: "https://www.linkedin.com/in/kaden-wildauer/",
    Twitter: "https://x.com/KadenWildauer",
    Upwork: "https://www.upwork.com/freelancers/~01cac9e23edf25b61c",
  };
  const sessionalThemes = ["Autumn", "Spring", "Summer", "Winter"];

  return (
    <>
      <div className="container-for-corners">
        <span className="corner-square "></span>
        <span className="corner-square "></span>
      </div>
      <footer className="footer-container">
        <div className="footer-top-section">
          {/* Theme container */}
          <div className="footer-section">
            <h4>Themes</h4>
            <div className="footer-content-container">
              {sessionalThemes.map((theme, index) => (
                <ThemeButton key={index} theme={theme} />
              ))}
            </div>
          </div>

          {/* Socials */}
          <div className="footer-section">
            <h4>Socials</h4>
            <div className="footer-content-container">
              {Object.keys(socials).map((social, index) => (
                <button key={index} className="footer-blue-pill">
                  <h5>{social}</h5>
                  <a
                    href={socials[social]}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Link to ${social} of kaden wildauer`}
                  ></a>
                  {social === "GitHub" && <GitHubLogo />}
                  {social === "LinkedIn" && <LogoLinkedIn />}
                  {social === "Twitter" && <TwitterLogo />}
                  {social === "Upwork" && <UpworkRoundedsquare />}
                </button>
              ))}
            </div>
          </div>

          {/* Navigation Pages */}
          <div className="footer-section">
            <h4>Navigation</h4>
            <div className="footer-content-container">
              {Object.keys(navPages).map((page, index) => (
                <button key={index} className="footer-blue-pill">
                  <Link
                    href={navPages[page]}
                    aria-label={`Link to ${page} page`}
                  ></Link>
                  <h5>{page}</h5>
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="footer-bottom-section">
          <h4>&copy; 2025 Kaden Wildauer. All rights reserved.</h4>
        </div>
      </footer>
    </>
  );
}

export default Footer;
