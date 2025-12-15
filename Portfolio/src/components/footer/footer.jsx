import "./footer.css";
function Footer() {
  const navPages = ["About me", "Skills", "scriptorium", "Contact"];
  const socials = ["GitHub", "LinkedIn", "Twitter", "Upwork"];

  return (
    <>
      <div className="container-for-corners"></div>
      <footer className="footer-container">
        <div className="footer-content-container"></div>
        <div className="footer-content-container"></div>
        {/* Pill container's */}
        <div className="footer-content-container">
          {socials.map((social, index) => (
            <div key={index} className="blue-pill">
              <h4>{social}</h4>
            </div>
          ))}
        </div>
        <div className="footer-content-container">
          {navPages.map((page, index) => (
            <div key={index} className="blue-pill">
              <h4>{page}</h4>
            </div>
          ))}
        </div>
      </footer>
    </>
  );
}

export default Footer;
