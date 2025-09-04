export function ScriptCard({ articleDes, onClick }) {
  return (
    <div className="script-article" onClick={onClick}>
      <div className="script-article-img">
        <img src={articleDes.image} alt={articleDes.title} />
      </div>
      <div className="script-article-info">
        <h2>{articleDes.title}</h2>
        <p>{articleDes.des}</p>
        <div className="script-article-tags">
          {articleDes.tags.map((tag, index) => (
            <span key={index}>{tag}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
