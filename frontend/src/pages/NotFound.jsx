import { Link } from "react-router-dom";

/**
 * Fallback route for unknown URLs — keeps navigation usable instead of crashing.
 */
function NotFound() {
  return (
    <main>
      <header className="page-hero">
        <p className="section-label">404</p>
        <h1 className="section-title">Page not found</h1>
        <p className="page-hero-lead">
          That link does not match a portfolio page. Use the navigation above or
          head back home.
        </p>
        <div className="btn-group">
          <Link className="btn btn-primary" to="/">
            Back to Home
          </Link>
          <Link className="btn btn-secondary" to="/contact">
            Contact
          </Link>
        </div>
      </header>
    </main>
  );
}

export default NotFound;
