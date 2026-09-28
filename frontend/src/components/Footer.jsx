import { Link } from "react-router-dom";

/**
 * Dark site footer with compact nav and large email contact cue.
 */
function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div>
          <ul className="footer-nav">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About Me</Link>
            </li>
            <li>
              <Link to="/projects">Projects</Link>
            </li>
            <li>
              <Link to="/services">Services</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
          <p className="footer-copy">
            &copy; {currentYear} Kingsley Ihekwaba
          </p>
        </div>
        <a className="footer-email" href="mailto:kingsleyihekwaba208@gmail.com">
          kingsleyihekwaba208@gmail.com
        </a>
      </div>
    </footer>
  );
}

export default Footer;
