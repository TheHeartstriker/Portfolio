import ReactMarkdown from "react-markdown";
import DownArr from "../../assets/DownArrow";
import { useState, useEffect } from "react";
import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { nightOwl } from "react-syntax-highlighter/dist/esm/styles/prism";
//
//
//

function articleChecker(item) {
  if (typeof item === "string") {
    return (
      <ReactMarkdown
        components={{
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "");
            return !inline && match ? (
              <SyntaxHighlighter
                style={nightOwl}
                language={match[1]}
                PreTag="div"
                {...props}
              >
                {String(children).replace(/\n$/, "")}
              </SyntaxHighlighter>
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
        }}
      >
        {item}
      </ReactMarkdown>
    );
  } else if (typeof item === "function") {
    // Render as a component, not as a function call!
    return (
      <div className="componentContainerArticle">
        {React.createElement(item)}
      </div>
    );
  }
}

function renderArticles(showContent, article) {
  if (showContent && Array.isArray(article)) {
    return article.map((item, idx) => (
      <div key={idx}>{articleChecker(item)}</div>
    ));
  }
  return null;
}

export function SubjectContainer({
  title,
  subject,
  description,
  active,
  onClick,
  article,
  articleName,
}) {
  const [showContent, setShowContent] = useState(active);

  useEffect(() => {
    let timeout;
    if (active) {
      setShowContent(true);
    } else {
      timeout = setTimeout(() => setShowContent(false), 1500);
    }
    return () => clearTimeout(timeout);
  }, [active]);

  return (
    <div
      className={`subject-container-article${!active ? " pointerScript" : ""}`}
      onClick={() => onClick(articleName, true)}
    >
      <div className="subjectTextContainerArticle">
        <h1>{title}</h1>
        <h2>{subject}</h2>
      </div>
      <div className="subjectDescriptionContainerArticle">
        <p>{description}</p>
      </div>
      <div className={`articleTextContainer${active ? " active" : ""}`}>
        {renderArticles(showContent, article)}
        {active && (
          <button
            className="unFurlArticle"
            onClick={() => {
              onClick(articleName, false);
            }}
          >
            <DownArr />
          </button>
        )}
      </div>
    </div>
  );
}
