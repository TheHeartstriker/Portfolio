import ReactMarkdown from "react-markdown";
//
//
//

function articleChecker(item) {
  if (typeof item === "string") {
    return <ReactMarkdown>{item}</ReactMarkdown>;
  } else if (typeof item === "function") {
    return <div className="componentContainer">{item()}</div>;
  }
}

export function SubjectContainer({
  title,
  subject,
  description,
  active,
  onClick,
  article,
}) {
  return (
    <div className="subject-container" onClick={onClick}>
      <div className="subjectTextContainer">
        <h1>{title}</h1>
        <h2>{subject}</h2>
      </div>
      <div className="subjectDescriptionContainer">
        <p>{description}</p>
      </div>
      <div className="mainArticle">
        <div className={`articleTextContainer${active ? " active" : ""}`}>
          <ReactMarkdown>{article}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
