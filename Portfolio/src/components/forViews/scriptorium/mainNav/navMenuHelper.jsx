//Returns an array of JSX elements representing the table of contents based on the article content
export function tocScan(article, currentSection, headingRef, crossPoint) {
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
        let obj = {
          toc: tocItems,
          idx: i,
          match: match,
          headingIndex: headingIndex,
          currentSection: currentSection,
          headingRef: headingRef,
          crossPoint: crossPoint,
          className: "",
          headingText: headingText,
        };

        if (level === 1) {
          obj.className = "";
          obj.headingText = "Introduction";
          tocPush(obj);
        }
        if (level === 2) {
          obj.className = "medium";
          tocPush(obj);
        }
        if (level === 3) {
          obj.className = "small";
          tocPush(obj);
        }

        headingIndex++;
      }
    }
  }
  return tocItems;
}
// Helper function to push a table of contents item as JSX / html
function tocPush(objData) {
  objData.toc.push(
    <div
      key={`${objData.idx}-${objData.match}`}
      id={`toc-section-${objData.headingIndex}`}
      onClick={() => {
        if (objData.headingRef.current[objData.headingIndex]) {
          const el = objData.headingRef.current[objData.headingIndex];
          const y = el.getBoundingClientRect().top + window.scrollY;
          window.scrollTo({
            top: y - objData.crossPoint + 1,
            behavior: "smooth",
          });
        }
      }}
      className={`toc-item ${objData.className} ${
        objData.currentSection === objData.headingIndex ? "active" : ""
      }`}
    >
      <h3>{objData.headingText}</h3>
    </div>
  );
}
