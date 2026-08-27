function returnPercentage(value) {
  return `calc(
    ${value} + var(--typo-size-64) * 2 + var(--typo-size-12) + var(--space-8)
  )`;
}

export const highlightImages = [
  {
    src: "/home/about1.jpg",
    width: "50vh",
    height: "50vh",
  },
  { src: "/home/about2.jpg", width: "90vw", height: returnPercentage("100%") },
  {
    src: "/home/about1.jpg",
    width: "50vh",
    height: "50vh",
  },
  { src: "/home/about2.jpg", width: "90vw", height: returnPercentage("90%") },
];

export const highlightHeading = "The work";
export const highlightTitle = "Life";
export const highlightSubtitle = "On The Web";

export const highlightStats = [
  { number: "4", label: "YEARS OF EXPERIANCE" },
  { number: "8", label: "PROJECTS COMPLETED" },
  { number: "1", label: "SATISFIED CLIENTS" },
];
