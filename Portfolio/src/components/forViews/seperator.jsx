export function Separator({ header, para }) {
  return (
    <div className="content-separator">
      <h2>{header}</h2>
      <p>{para}</p>
    </div>
  );
}
