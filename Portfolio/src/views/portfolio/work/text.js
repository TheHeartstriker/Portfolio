import { project1, project2, project3 } from "./project/text";

export const mainLeft = {
  heading: `Selected Work`,
  subHeading: `Case studies of selected websites designed to be visual, distinctive, and purposeful.`,
  image1: project1.main.image,
  image2: project2.main.image,
  image3: project3.main.image,
};

export const mainRight = {
  item1: {
    imgSrc: project1.main.image,
    heading: project1.hero.heading,
    details: [
      project1.main.leftDetails[1].value,
      project1.main.rightDetails.values[0],
      project1.main.rightDetails.values[1],
    ],
    endPoint: "/portfolio/fgraphs",
  },
  item2: {
    imgSrc: project2.main.image,
    heading: project2.hero.heading,
    details: [
      project2.main.leftDetails[1].value,
      project2.main.rightDetails.values[0],
      project2.main.rightDetails.values[1],
    ],
    endPoint: "/portfolio/matsuri",
  },
  item3: {
    imgSrc: project3.main.image,
    heading: project3.hero.heading,
    details: [
      project3.main.leftDetails[1].value,
      project3.main.rightDetails.values[0],
      project3.main.rightDetails.values[1],
    ],
    endPoint: "/portfolio/peyton",
  },
};

export const cta = {
  mainText: `See some\nof my creations`,
  ctaText: `SEE A EXAMPLE`,
  numberCount: `03`,
};
