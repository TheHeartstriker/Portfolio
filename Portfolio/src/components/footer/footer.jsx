import "./footer.css";
import LogoLinkedIn from "/public/logo-linkedin";
import TwitterLogo from "/public/logo-twitter";
import UpworkRoundedsquare from "/public/upwork-roundedsquare";
import GitHubLogo from "/public/icons/Github";
function Footer() {
  const navPages = ["About me", "Skills", "scriptorium", "Contact"];
  const socials = ["GitHub", "LinkedIn", "Twitter", "Upwork"];

  return (
    <>
      <div className="container-for-corners">
        <span className="corner-square "></span>
        <span className="corner-square "></span>
      </div>
      <footer className="footer-container">
        <div className="footer-content-container"></div>
        {/* Theme container */}
        <div className="footer-content-container">
          <span className="footer-theme-element">
            <h5>Autumn</h5>
          </span>
          <span className="footer-theme-element">
            <h5>Spring</h5>
          </span>
          <span className="footer-theme-element">
            <h5>Summer</h5>
          </span>
          <span className="footer-theme-element">
            <h5>Winter</h5>
          </span>
        </div>
        {/* Pill container's */}
        {/* Socials */}
        <div className="footer-content-container">
          {socials.map((social, index) => (
            <div key={index} className="blue-pill">
              <h5>{social}</h5>
              {social === "GitHub" && <GitHubLogo />}
              {social === "LinkedIn" && <LogoLinkedIn />}
              {social === "Twitter" && <TwitterLogo />}
              {social === "Upwork" && <UpworkRoundedsquare />}
            </div>
          ))}
        </div>
        {/* Navigation Pages */}
        <div className="footer-content-container">
          {navPages.map((page, index) => (
            <div key={index} className="blue-pill">
              <h5>{page}</h5>
            </div>
          ))}
        </div>
      </footer>
    </>
  );
}

export default Footer;
