export function Separator({ headerArr, reverse }) {
  if (!headerArr) {
    return null;
  }
  return (
    <div className={`content-separator ${reverse ? "reverse" : ""}`}>
      <div className={`content-separator-text ${reverse ? "reverse" : ""}`}>
        {headerArr.map((item, index) => {
          return <h2 key={index}>{item}</h2>;
        })}
      </div>
      <hr></hr>
    </div>
  );
}
