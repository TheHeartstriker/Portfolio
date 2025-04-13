export function TextScramble(Original, Text, Alphabet, setText, speed) {
  let Iter = 0;
  let Interval = setInterval(() => {
    let newText = Text.split("")
      .map((char, index) => {
        // Don't scramble spaces
        if (char === " ") {
          return char;
        }
        // If we have reached the end of the text
        if (Iter >= Original.length) {
          clearInterval(Interval);
          return Original[index];
        }
        // Slowly reveal the text
        if (index < Iter) {
          return Original[index];
        }
        // Scramble the text
        let Num = Math.floor(Math.random() * 26);
        if (char === char.toUpperCase()) {
          return Alphabet[Num].toUpperCase();
        } else {
          return Alphabet[Num];
        }
      })
      .join("");
    Iter += speed;

    setText(newText);
  }, 40);
  return true;
}
