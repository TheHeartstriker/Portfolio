"use client";
import styles from "./hero.module.css";
import { imageLeft, textMiddle, formRight } from "./text";
import ActionButton from "@/components/button/actionButton";
import HeroAni from "./heroAni";
import { useState, useEffect, useRef } from "react";

const COOLDOWN_SECONDS = 10;

function Hero() {
  const [cooldown, setCooldown] = useState(0);
  const intervalRef = useRef(null);
  //
  // Api call to send email
  //
  async function handleSubmit(e) {
    //
    // Block form submission if cooldown is active
    if (cooldown > 0) return;
    //
    // Get data
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(e.currentTarget);
    //
    // Send data to API
    try {
      const data = await fetch("/api/contact", {
        method: "POST",
        body: formData,
      });
      // Check response
      if (data.ok) {
        form.reset();
        startCooldown();
      } else {
        alert(
          "There was an error sending your message. Please try again later.",
        );
      }
    } catch {
      alert("There was an error sending your message. Please try again later.");
    }
  }
  //
  // Count down timer for form submission
  //
  function startCooldown() {
    setCooldown(COOLDOWN_SECONDS);
    intervalRef.current = setInterval(() => {
      setCooldown((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }
  //
  // Cleanup interval on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);
  return (
    <div className={styles["hero"]}>
      <HeroAni />
      {/*  */}
      {/* Left side image */}
      {/*  */}
      <div className={styles["hero-image"]}>
        <div className={styles["hero-image-overlay"]}></div>
        <img src={imageLeft.imageSrc} alt="About" />
      </div>
      {/*  */}
      {/* Middle info / heading */}
      {/*  */}
      <div className={styles["hero-text"]}>
        {/*  */}
        {/* Headings */}
        <h1>{textMiddle.heading}</h1>
        {/*  */}
        {/* Links*/}
        <div className={styles["hero-text-links"]}>
          {[1, 2, 3, 4, 5].map((linkNumber) => {
            const link = textMiddle[`link${linkNumber}`];

            return (
              <a
                key={link.link}
                href={link.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.text}
              </a>
            );
          })}
          <h3>{textMiddle.email}</h3>
        </div>
      </div>
      {/*  */}
      {/* Right side form container*/}
      {/*  */}
      <div className={styles["hero-con"]}>
        {/*  */}
        {/* Main heading */}
        <h2>{formRight.heading}</h2>
        {/*  */}
        {/* Main form item */}
        <form className={styles["hero-con-form"]} onSubmit={handleSubmit}>
          {/* First row */}
          <div className={styles["hero-con-form-row"]}>
            <input
              type="text"
              name="firstName"
              placeholder={formRight.form.placeHolder1}
              required
              maxLength={150}
            />
            <input
              type="text"
              name="lastName"
              placeholder={formRight.form.placeHolder2}
              required
              maxLength={150}
            />
          </div>
          {/* Second row */}
          <div className={styles["hero-con-form-row"]}>
            <input
              type="email"
              name="email"
              placeholder={formRight.form.placeHolder3}
              required
              maxLength={150}
            />
            <input
              type="text"
              name="business"
              placeholder={formRight.form.placeHolder4}
              required
              maxLength={150}
            />
          </div>
          {/* Major text area */}
          <textarea
            name="message"
            placeholder={formRight.form.placeHolder5}
            required
            minLength={10}
            maxLength={2500}
          />
          {/* Final btn */}
          <ActionButton
            text={
              cooldown > 0 ? `MESSAGE SENT ${cooldown}s` : formRight.form.CTA
            }
            type={"form"}
            trueForm={true}
            disabled={cooldown > 0}
          />
        </form>
      </div>
    </div>
  );
}

export default Hero;
