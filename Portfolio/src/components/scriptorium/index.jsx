import ReactMarkdown from "react-markdown";
import PropTypes from "prop-types";
import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import NavMenu from "./navMenu.jsx";
import { nightOwl } from "react-syntax-highlighter/dist/esm/styles/prism";
import "./index.css";
import "./navMenu.css";
//
//
//

function articleChecker(item) {
  //
  // Check if we are code markdown
  //
  if (typeof item === "string") {
    return (
      <ReactMarkdown
        components={{
          h1: ({ ...props }) => (
            <div className="article-h1-container">
              <h1 {...props} />
            </div>
          ),
          img: ({ ...props }) => <img {...props} />,

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
      <React.Fragment key={idx}>{articleChecker(item)}</React.Fragment>
    ));
  }
  return null;
}

export function SubjectContainer({ article, description }) {
  return (
    <>
      <div className={`subject-container-article`}>
        {renderArticles(article)}
      </div>
      <NavMenu article={article} description={description} />
    </>
  );
}
SubjectContainer.propTypes = {
  article: PropTypes.array.isRequired,
};
