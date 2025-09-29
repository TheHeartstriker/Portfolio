function NavMenu() {
  return (
    <div className="article-nav-Menu">
      <div className="published-time">
        <h3>Published</h3>
        <p>August 2024</p>
      </div>
      <h2>Article Topics</h2>
      <div className="article-topic">
        <h3>Programming</h3>
      </div>
      <h2>Table of Contents</h2>
      <div className="table-of-contents"></div>
    </div>
  );
}

//For secondary elements reduce the left side width by 20% for each level of depth

export default NavMenu;
