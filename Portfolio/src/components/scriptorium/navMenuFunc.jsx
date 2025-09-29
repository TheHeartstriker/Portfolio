export function tocScan(article, currentSection) {
  const tocItems = [];
  const headingRegex = /^(#{1,6})\s+(.*)$/gm;
  let headingIndex = 0; // Track the sequential heading number

  for (let i = 0; i < article.length; i++) {
    const item = article[i];
    if (typeof item === "function") continue;
    if (typeof item === "string") {
      let match;
      while ((match = headingRegex.exec(item)) !== null) {
        const level = match[1].length; // Number of #
        const headingText = match[2];

        if (level === 1) {
          tocPush(
            tocItems,
            i,
            match,
            headingIndex,
            currentSection,
            "",
            "Introduction"
          );
        }
        if (level === 2) {
          tocPush(
            tocItems,
            i,
            match,
            headingIndex,
            currentSection,
            "medium",
            headingText
          );
        }
        if (level === 3) {
          tocPush(
            tocItems,
            i,
            match,
            headingIndex,
            currentSection,
            "small",
            headingText
          );
        }

        headingIndex++; // Increment for each heading found
      }
    }
  }
  return tocItems;
}

function tocPush(
  arr,
  i,
  match,
  headingIndex,
  currentSection,
  className,
  headingText
) {
  arr.push(
    <div
      key={`${i}-${match.index}`}
      id={`toc-section-${headingIndex}`} // Use headingIndex instead of i
      className={`toc-item ${className} ${
        currentSection === headingIndex ? "active" : ""
      }`}
    >
      <h3>{headingText}</h3>
    </div>
  );
}
