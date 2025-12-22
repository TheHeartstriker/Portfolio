"use client";
import "./footer.css";
import LogoLinkedIn from "/public/logo-linkedin";
import TwitterLogo from "/public/logo-twitter";
import UpworkRoundedsquare from "/public/upwork-roundedsquare";
import GitHubLogo from "/public/icons/Github";
import ThemeGen from "../forStyle/themeGen/theme";
import {
  winterTheme,
  summerTheme,
  springTheme,
  autumnTheme,
} from "@/components/forStyle/themeGen/themes";
import { applyTheme } from "../forStyle/themeGen/theme";
import { useContext } from "react";
import { Context } from "../forStyle/animations/animationContext";

function Footer() {
  const navPages = ["About me", "Skills", "scriptorium", "Contact"];
  const socials = ["GitHub", "LinkedIn", "Twitter", "Upwork"];
  const sessionalThemes = ["Autumn", "Spring", "Summer", "Winter"];
  const { currTheme, setCurrTheme } = useContext(Context);

  return (
    <>
      <div className="container-for-corners">
        <button
          onClick={() => {
            applyTheme(autumnTheme), setCurrTheme(autumnTheme);
          }}
        ></button>
        <span className="corner-square "></span>
        <span className="corner-square "></span>
      </div>
      <footer className="footer-container">
        {/* Theme container */}
        <div className="footer-section">
          <h4>Themes</h4>
          <div className="footer-content-container">
            {sessionalThemes.map((theme, index) => (
              <button
                key={index}
                className={`footer-blue-pill footer-blue-pill-${theme.toLowerCase()}`}
                onClick={() => {}}
              >
                <h5>{theme}</h5>
              </button>
            ))}
          </div>
        </div>

        {/* Socials */}
        <div className="footer-section">
          <h4>Socials</h4>
          <div className="footer-content-container">
            {socials.map((social, index) => (
              <button key={index} className="footer-blue-pill">
                <h5>{social}</h5>
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
            {navPages.map((page, index) => (
              <button key={index} className="footer-blue-pill">
                <h5>{page}</h5>
              </button>
            ))}
          </div>
        </div>
        <h4></h4>
      </footer>
    </>
  );
}

export default Footer;
