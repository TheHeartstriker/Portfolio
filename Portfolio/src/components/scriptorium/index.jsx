import ReactMarkdown from "react-markdown";
import PropTypes from "prop-types";
import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { nightOwl } from "react-syntax-highlighter/dist/esm/styles/prism";
import "./index.css";
//
//
//

function articleChecker(item) {
  //
  // Check if we are an img
  //
  if (typeof item === "string" && item.endsWith(".png")) {
    // Assuming the string is a path to an image
    return (
      <div className="image-container-article">
        <img src={item} alt="Article related" />
      </div>
    );
  }
  //
  // Check if we are code markdown
  //
  if (typeof item === "string") {
    return (
      <ReactMarkdown
        components={{
          code({ inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "");
            return !inline && match ? (
              <SyntaxHighlighter
                style={nightOwl}
                language={match[1]}
                PreTag="div"
                className="code-block"
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
          a: ({ ...props }) => (
            <a {...props} target="_blank" rel="noopener noreferrer">
              {props.children}
            </a>
          ),
        }}
      >
        {item}
      </ReactMarkdown>
    );

    //
    // Check if we are a React component
    //
  } else if (typeof item === "function") {
    // Render as a component, not as a function call!
    return (
      <div className="component-container-article">
        {React.createElement(item)}
      </div>
    );
  }
}

function renderArticles(article) {
  if (Array.isArray(article)) {
    return article.map((item, idx) => (
      <div key={idx}>{articleChecker(item)}</div>
    ));
  }
  return null;
}

export function SubjectContainer({ article }) {
  return (
    <div className={`subject-container-article`}>
      <div className={`article-text-container`}>{renderArticles(article)}</div>
    </div>
  );
}
SubjectContainer.propTypes = {
  article: PropTypes.array.isRequired,
};
