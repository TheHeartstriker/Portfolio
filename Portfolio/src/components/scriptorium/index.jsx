export function SubjectContainer({ title, subject, description }) {
  return (
    <div className="subject-container">
      <div className="subjectTextContainer">
        <h1>{title}</h1>
        <h2>{subject}</h2>
      </div>
      <div className="subjectDescriptionContainer">
        <p>{description}</p>
      </div>
    </div>
  );
}
