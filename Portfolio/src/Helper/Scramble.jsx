export function TextScramble(Original, Text, Alphabet, setText, speed, id) {
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
    //Check for id (if the file has multiple scrambleable text then it will have an id)
    if (id) {
      setText((prev) => ({
        ...prev,
        [id]: { Text: newText },
      }));
    }
    //Id nor found
    else {
      setText(newText);
    }
  }, 40);
  // setText((prev) => ({
  //   ...prev,
  //   [id]: { ...prev[id], Mouse: false },
  // }));
}
