import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import portraitImage from "../assets/images/Ebuka.JPG";
import projectThumbA from "../assets/images/project-thumb-a.svg";
import projectThumbB from "../assets/images/project-thumb-b.svg";
import projectThumbC from "../assets/images/project-thumb-c.svg";
import {
  clearContactSubmission,
  readContactSubmission,
} from "../constants/contactStorage";

const FEATURED_WORKS = [
  {
    title: "Fintech wallet app",
    category: "React Native",
    meta: "Mobile",
    image: projectThumbA,
  },
  {
    title: "Health tracking client",
    category: "Swift",
    meta: "iOS",
    image: projectThumbB,
  },
  {
    title: "Field ops companion",
    category: "Kotlin",
    meta: "Android",
    image: projectThumbC,
  },
];

/**
 * Home page — welcome hero, mission, featured work preview.
 * Also surfaces a confirmation banner after a successful Contact form submit.
 */
function Home() {
  const location = useLocation();
  const [dismissedLocationKey, setDismissedLocationKey] = useState(null);

  const shouldShowSubmissionBanner =
    Boolean(location.state?.contactSubmitted) &&
    location.key !== dismissedLocationKey;

  const contactSubmission = shouldShowSubmissionBanner
    ? readContactSubmission()
    : null;

  function handleDismissSubmission() {
    clearContactSubmission();
    setDismissedLocationKey(location.key);
  }

  return (
    <main>
      {contactSubmission ? (
        <div className="submission-banner" role="status">
          <div className="submission-banner-inner">
            <p>
              Thanks, <strong>{contactSubmission.firstName}</strong>. Your
              message was captured and you’re back on the home page.
            </p>
            <p className="submission-banner-meta">
              {contactSubmission.emailAddress} · {contactSubmission.contactNumber}
            </p>
            <button
              className="btn btn-secondary"
              type="button"
              onClick={handleDismissSubmission}
            >
              Dismiss
            </button>
          </div>
        </div>
      ) : null}

      {/* Hero: Hello + intro left, grayscale portrait right */}
      <section className="home-hero" aria-labelledby="hero-greeting">
        <div className="hero-copy">
          <div className="hero-stats" aria-label="Highlights">
            <div>
              <span className="hero-stat-value">+20</span>
              <span className="hero-stat-label">Apps shipped</span>
            </div>
            <div>
              <span className="hero-stat-value">5+</span>
              <span className="hero-stat-label">Years building mobile</span>
            </div>
          </div>

          <div>
            <h1 className="hero-greeting" id="hero-greeting">
              Hello
            </h1>
            <p className="hero-intro">
              — I’m Kingsley, a mobile engineer who ships stable apps with clean
              architecture and lasting performance.
            </p>
            <div className="btn-group">
              <Link className="btn btn-primary" to="/about">
                About Me
              </Link>
              <Link className="btn btn-secondary" to="/projects">
                View Projects
              </Link>
            </div>
          </div>

          <a className="hero-scroll" href="#mission">
            Scroll down ↓
          </a>
        </div>

        <div className="hero-media">
          <img
            src={portraitImage}
            alt="Portrait of Kingsley Ihekwaba"
            width="800"
            height="1000"
          />
        </div>
      </section>

      <div className="site-main">
        <section
          className="section-block mission-grid"
          id="mission"
          aria-labelledby="mission-heading"
        >
          <div className="mission-copy">
            <p className="section-label">Mission</p>
            <h2 className="section-title" id="mission-heading">
              What I stand for
            </h2>
            <p className="section-lead">
              My mission is to ship mobile software that is clear, stable, and
              built to last — prioritizing thoughtful architecture over trendy
              noise, and reliable performance over decorative complexity.
            </p>
            <p className="section-lead">
              Explore <Link to="/about">my background</Link>,{" "}
              <Link to="/projects">selected projects</Link>, or{" "}
              <Link to="/contact">get in touch</Link>.
            </p>
          </div>

          <aside className="stat-card" aria-label="Impact highlight">
            <p className="section-label">Focus</p>
            <p className="stat-card-value">iOS · Android</p>
            <p className="stat-card-caption">
              Native and cross-platform delivery with architecture that stays
              maintainable after launch.
            </p>
          </aside>
        </section>

        <section className="section-block" aria-labelledby="works-heading">
          <div className="section-header-row">
            <div>
              <p className="section-label">Portfolio</p>
              <h2 className="section-title" id="works-heading">
                Latest works
              </h2>
            </div>
            <Link className="text-link" to="/projects">
              View more →
            </Link>
          </div>

          <div className="card-grid">
            {FEATURED_WORKS.map((work) => (
              <Link className="work-card" to="/projects" key={work.title}>
                <div className="work-card-media">
                  <img src={work.image} alt="" width="800" height="560" />
                  <div className="work-card-action" aria-hidden="true">
                    <span>↗</span>
                  </div>
                </div>
                <h3 className="work-card-title">{work.title}</h3>
                <p className="work-card-meta">
                  <span className="tag tag-dark">{work.category}</span>{" "}
                  {work.meta}
                </p>
              </Link>
            ))}
          </div>
        </section>

        <section className="cta-band" aria-labelledby="cta-heading">
          <h2 className="section-title" id="cta-heading">
            Got a vision? Let’s bring it to life.
          </h2>
          <p className="section-lead cta-band-lead">
            Open to product teams who need a mobile engineer focused on shipping
            stable apps.
          </p>
          <Link className="text-link" to="/contact">
            Book A Call ↗
          </Link>
        </section>
      </div>
    </main>
  );
}

export default Home;
