import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import logoMark from "../assets/images/logo.svg";

/** Primary site links used by the header navigation. */
const NAV_ITEMS = [
  { to: "/", label: "Home", end: true },
  { to: "/about", label: "About Me" },
  { to: "/projects", label: "Projects" },
  { to: "/services", label: "Services" },
  { to: "/references", label: "References" },
  { to: "/contact", label: "Contact" },
];

/**
 * Sticky site header with logo, page links, and contact CTA.
 * Menu open state is tied to the current path so route changes close it
 * without an effect.
 */
function Header() {
  const location = useLocation();
  const [menuOpenOnPath, setMenuOpenOnPath] = useState(null);
  const isMenuOpen = menuOpenOnPath === location.pathname;

  function handleToggleMenu() {
    setMenuOpenOnPath((previousPath) =>
      previousPath === location.pathname ? null : location.pathname
    );
  }

  function handleCloseMenu() {
    setMenuOpenOnPath(null);
  }

  return (
    <header className={`site-header${isMenuOpen ? " is-menu-open" : ""}`}>
      <nav className="nav-bar" aria-label="Primary">
        <Link className="brand-link" to="/" onClick={handleCloseMenu}>
          <img
            className="brand-logo"
            src={logoMark}
            width="36"
            height="36"
            alt="KI custom logo"
          />
          <span className="brand-meta">
            <span className="brand-wordmark">Kingsley Ihekwaba</span>
            <span className="brand-status">Available for work</span>
          </span>
        </Link>

        <button
          className="nav-toggle"
          type="button"
          aria-expanded={isMenuOpen}
          aria-controls="primary-nav"
          onClick={handleToggleMenu}
        >
          Menu
        </button>

        <ul
          className={`nav-list${isMenuOpen ? " is-open" : ""}`}
          id="primary-nav"
        >
          {NAV_ITEMS.map((navItem) => (
            <li key={navItem.to}>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "nav-link is-active" : "nav-link"
                }
                to={navItem.to}
                end={navItem.end}
                onClick={handleCloseMenu}
              >
                {navItem.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <Link className="nav-cta" to="/contact" onClick={handleCloseMenu}>
          Book A Call ↗
        </Link>
      </nav>
    </header>
  );
}

export default Header;
