import {
  desParticle,
  desMappingFullstack,
  desPolySVG,
  desFlowField,
  desBackendLookLike,
  desHoverCards,
  desColor,
} from "./articles/articleDes";

const typeImages = {
  Design: "/scriptorium/main/design.webp",
  Creative: "/scriptorium/main/creative.webp",
  Web: "/scriptorium/main/web.webp",
  Visual: "/scriptorium/main/visual.webp",
  Systems: "/scriptorium/main/systems.webp",
  Coding: "/scriptorium/main/coding.webp",
};

const MONTH_INDEX = {
  January: 0,
  February: 1,
  March: 2,
  April: 3,
  May: 4,
  June: 5,
  July: 6,
  August: 7,
  September: 8,
  October: 9,
  November: 10,
  December: 11,
};
// Function that counts total words across all articles
export const getTotalWords = () => {
  const articles = [
    desParticle,
    desMappingFullstack,
    desPolySVG,
    desFlowField,
    desBackendLookLike,
    desHoverCards,
    desColor,
  ];

  return articles.reduce((total, article) => total + article.wordCount, 0);
};

export function getTotalTimeHour() {
  const wordsPerMinute = 200;
  const totalWords = getTotalWords();
  const totalTime = Math.ceil(totalWords / wordsPerMinute);
  return Math.floor(totalTime / 60);
}

export function getRecentArticles(limit = 3) {
  const articles = [
    desParticle,
    desMappingFullstack,
    desPolySVG,
    desFlowField,
    desBackendLookLike,
    desHoverCards,
    desColor,
  ];

  return [...articles]
    .sort((a, b) => {
      const da = new Date(a.date.year, MONTH_INDEX[a.date.month], a.date.day);
      const db = new Date(b.date.year, MONTH_INDEX[b.date.month], b.date.day);
      return db - da;
    })
    .slice(0, limit);
}

export function getTopTags(limit = 3) {
  const articles = [
    desParticle,
    desMappingFullstack,
    desPolySVG,
    desFlowField,
    desBackendLookLike,
    desHoverCards,
    desColor,
  ];

  const tagCounts = articles
    .flatMap((article) => article.tags)
    .reduce((acc, tag) => {
      acc[tag] = (acc[tag] ?? 0) + 1;
      return acc;
    }, {});

  return Object.entries(tagCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .reduce((acc, [tag, count], i) => {
      acc[`tag${i + 1}`] = { tagname: tag, count, imgSrc: typeImages[tag] };
      return acc;
    }, {});
}
