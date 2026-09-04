import ReactMarkdown from "react-markdown";
import PropTypes from "prop-types";
import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import styles from "./render.module.css";
function articleChecker(item) {
  //
  // Check if we are code markdown
  //
  if (typeof item === "string") {
    return (
      <ReactMarkdown
        components={{
          h1: ({ ...props }) => (
            <div className={styles["article-con"]}>
              <h1 {...props} />
            </div>
          ),
          img: ({ ...props }) => <img {...props} />,

          code({ inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "");
            return !inline && match ? (
              <SyntaxHighlighter
                style={atomDark}
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
  } else if (typeof item === "function") {
    // Render as a component, not as a function call!
    return (
      <div className={styles["article-component"]}>
        {React.createElement(item)}
      </div>
    );
  }
}
//
// Insert items into the article like frag's
//
function articleInsert(article) {
  if (Array.isArray(article)) {
    return article.map((item, idx) => (
      <React.Fragment key={idx}>{articleChecker(item)}</React.Fragment>
    ));
  }
  return null;
}
//
//Actual container / parents of items and content
//
export function ArticleReader({ article }) {
  return (
    <>
      <section className={styles["article"]}>{articleInsert(article)}</section>
    </>
  );
}
ArticleReader.propTypes = {
  article: PropTypes.array.isRequired,
  description: PropTypes.object,
};
