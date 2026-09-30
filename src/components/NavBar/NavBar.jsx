/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import "./NavBar.css";
import Schedule from "./Schedule/Schedule";
import { IoSunnyOutline, IoMoonOutline, IoClose } from "react-icons/io5";
import { useScrollY } from "../../hooks/useReveal";

const links = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "deals", label: "Best Deal" },
  { id: "properties", label: "Properties" },
  { id: "contact", label: "Contact Us" },
];

function NavBar({ theme, onToggleTheme }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");
  const y = useScrollY();
  const scrolled = y > 40;

  // highlight the section currently in view
  useEffect(() => {
    const sections = links
      .map((l) => document.getElementById(l.id))
      .filter(Boolean);
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  // lock scroll + close on Escape while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
    <header className={`NavBar ${scrolled ? "scrolled" : ""}`}>
      <nav className="wrap nav-inner" aria-label="Main">
        <a href="#home" className="logo" onClick={close}>
          VILLA<span>.</span>
        </a>

        <ul className="ulNavBar">
          {links.map((l) => (
            <li key={l.id}>
              <a
                href={`#${l.id}`}
                className={active === l.id ? "active-link" : ""}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="nav-actions">
          <button
            className="theme-toggle"
            onClick={onToggleTheme}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            <span className={`ti ${theme === "dark" ? "" : "on"}`}>
              <IoMoonOutline />
            </span>
            <span className={`ti ${theme === "dark" ? "on" : ""}`}>
              <IoSunnyOutline />
            </span>
          </button>
          <Schedule className="nav-cta" />
          <button
            className={`burger ${open ? "open" : ""}`}
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>
    </header>

      <div className={`menu-overlay ${open ? "show" : ""}`} onClick={close} />
      <aside className={`ulmenu ${open ? "open" : ""}`} aria-hidden={!open}>
        <button className="menu-close" onClick={close} aria-label="Close menu">
          <IoClose />
        </button>
        <ul>
          {links.map((l, i) => (
            <li key={l.id} style={{ "--i": i }}>
              <a
                href={`#${l.id}`}
                onClick={close}
                className={active === l.id ? "active-link" : ""}
              >
                <small>0{i + 1}</small>
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="menu-foot" style={{ "--i": links.length }}>
          <Schedule onClick={close} />
          <p>info@company.com</p>
        </div>
      </aside>
    </>
  );
}

export default NavBar;
