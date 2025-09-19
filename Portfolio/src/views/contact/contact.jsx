import InteractiveBG from "./interactiveBG.jsx";
import ContactButton from "./contactButton.jsx";
import "./contact.css";
function Contact() {
  return (
    <>
      <div className="contact-container">
        <InteractiveBG />
        <div className="contact">
          <h1>Contact me :)</h1>
          <ContactButton />
        </div>
      </div>
    </>
  );
}

export default Contact;
