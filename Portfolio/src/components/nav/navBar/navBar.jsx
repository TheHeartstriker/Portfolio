"use client";
import "./navBar.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLenis } from "@studio-freight/react-lenis";
function NavBar() {
  const router = useRouter();
  const lenis = useLenis();

  function handleNav(href) {
    if (lenis) {
      lenis.stop();
      lenis.scrollTo(0, { immediate: true });
    }

    router.push(href);

    lenis?.start();
  }
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
          <button className="nav-bar-mid-item" onClick={() => handleNav("/")}>
            <h3>Home</h3>
          </button>
          <button
            className="nav-bar-mid-item"
            onClick={() => handleNav("/skills")}
          >
            <h3>Portfolio</h3>
          </button>
          <button
            onClick={() => handleNav("/scriptorium")}
            className="nav-bar-mid-item"
          >
            <h3>Blog</h3>
          </button>
          <button
            onClick={() => handleNav("/contact")}
            className="nav-bar-mid-item"
          >
            <h3>Contact</h3>
          </button>
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
