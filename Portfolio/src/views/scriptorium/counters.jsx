import {
  desParticle,
  desMappingFullstack,
  desPolySVG,
  desFlowField,
  desBackendLookLike,
  desHoverCards,
  desColor,
} from "./articles/articleDes";

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
