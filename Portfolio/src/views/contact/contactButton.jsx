"use client";
import { useState } from "react";
import { TextScramble } from "../../utils/scramble.jsx";
function ContactButton() {
  const [Text, setText] = useState("serkadenwildauer@gmail.com");
  const Orginal = "serkadenwildauer@gmail.com";
  const Alphabet = "abcdefghijklmnopqrstuvwxyz";

  function ChangeText() {
    TextScramble("Copied to Clipboard", Text, Alphabet, setText, 0.8);
    navigator.clipboard.writeText(Text);
    setTimeout(() => {
      TextScramble(Orginal, Text, Alphabet, setText, 0.8);
    }, 3000);
  }

  return <button onClick={ChangeText}>{Text}</button>;
}

export default ContactButton;
