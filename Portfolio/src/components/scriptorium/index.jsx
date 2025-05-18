export function SubjectContainer({
  title,
  subject,
  description,
  active,
  onClick,
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
          <h1>Article</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
            tincidunt, nunc at bibendum facilisis, nunc nisl aliquet nunc, eget
            aliquam nisl nunc eget nunc. Sed tincidunt, nunc at bibendum
            facilisis, nunc nisl aliquet nunc, eget aliquam nisl nunc eget nunc.
          </p>
        </div>
      </div>
    </div>
  );
}
