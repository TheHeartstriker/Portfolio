import "./navBar.css";
import Link from "next/link";
function NavBar() {
  return (
    <>
      {/*  */}
      {/* Main nav bar */}
      {/*  */}
      <nav className="nav-bar">
        {/*  */}
        {/* Left side home button */}
        <div className="nav-bar-left">
          <Link href="/">KW</Link>
        </div>
        {/*  */}
        {/* Middle section */}
        <div className="nav-bar-mid">
          <div className="nav-bar-mid-item">
            <Link href="/">Home</Link>
          </div>
          <div className="nav-bar-mid-item">
            <Link href="/skills">Portfolio</Link>
          </div>
          <div className="nav-bar-mid-item">
            <Link href="/scriptorium">Blog</Link>
          </div>
          <div className="nav-bar-mid-item">
            <Link href="/contact">Contact</Link>
          </div>
        </div>
        {/*  */}
        {/* My current time */}
        <div className="nav-bar-right">
          <h4>6:20 PM</h4>
        </div>
      </nav>
      {/*  */}
      {/* Invisible nav bar */}
      {/*  */}

      <div className="nav-bar" style={{ opacity: 0, position: "static" }}>
        {/*  */}
        {/* Left side home button */}
        <div className="nav-bar-left">
          <Link href="/">KW</Link>
        </div>
        {/*  */}
        {/* Middle section */}
        <div className="nav-bar-mid">
          <div className="nav-bar-mid-item">
            <Link href="/">Home</Link>
          </div>
          <div className="nav-bar-mid-item">
            <Link href="/skills">Portfolio</Link>
          </div>
          <div className="nav-bar-mid-item">
            <Link href="/scriptorium">Blog</Link>
          </div>
          <div className="nav-bar-mid-item">
            <Link href="/contact">Contact</Link>
          </div>
        </div>
        {/*  */}
        {/* My current time */}
        <div className="nav-bar-right">
          <h4>6:20 PM</h4>
        </div>
      </div>
    </>
  );
}

export default NavBar;
