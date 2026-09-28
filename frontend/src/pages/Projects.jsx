import { Link } from "react-router-dom";
import projectThumbA from "../assets/images/project-thumb-a.svg";
import projectThumbB from "../assets/images/project-thumb-b.svg";
import projectThumbC from "../assets/images/project-thumb-c.svg";

/**
 * Highlighted mobile projects — each includes title, image, description,
 * role/outcome, and completion date (assignment requirements).
 */
const PROJECTS = [
  {
    title: "Fintech wallet app",
    image: projectThumbA,
    imageAlt: "Abstract preview of a fintech wallet mobile interface",
    description:
      "A cross-platform wallet for everyday transfers and balance tracking. Built with a modular feature structure so new payment methods can ship without rewriting core flows.",
    role: "Lead Mobile Engineer — owned React Native architecture, secure storage, and release cadence.",
    outcome:
      "Shipped to production with crash-free sessions above 99.5% in the first quarter after launch.",
    completedOn: "March 2025",
    tags: ["React Native", "TypeScript", "Fintech"],
  },
  {
    title: "Health tracking client",
    image: projectThumbB,
    imageAlt: "Abstract preview of a health tracking iOS app",
    description:
      "An iOS client for logging activity, syncing wearable data, and surfacing weekly trends. Focused on offline-first storage and clear accessibility for daily use.",
    role: "iOS Engineer — SwiftUI screens, HealthKit integration, and background sync.",
    outcome:
      "Reduced sync failures by roughly 40% after introducing resilient retry and conflict handling.",
    completedOn: "November 2024",
    tags: ["Swift", "SwiftUI", "HealthKit"],
  },
  {
    title: "Field ops companion",
    image: projectThumbC,
    imageAlt: "Abstract preview of a field operations Android app",
    description:
      "An Android companion for field teams to capture job notes, photos, and status updates with poor connectivity. Designed for fast entry with gloves and outdoor lighting.",
    role: "Android Engineer — Kotlin UI, local queue, and camera capture pipeline.",
    outcome:
      "Cut average job close-out time by several minutes per visit through offline drafts and batch upload.",
    completedOn: "June 2024",
    tags: ["Kotlin", "Android", "Offline"],
  },
];

function Projects() {
  return (
    <main>
      <header className="page-hero">
        <p className="section-label">Portfolio</p>
        <h1 className="section-title">Selected projects</h1>
        <p className="page-hero-lead">
          A short set of mobile products I’ve built or led — each with the role
          I played, the outcome, and when the work completed.
        </p>
      </header>

      <div className="site-main">
        <section className="section-block" aria-labelledby="projects-heading">
          <div className="section-header-row">
            <div>
              <p className="section-label">Works</p>
              <h2 className="section-title" id="projects-heading">
                Latest works
              </h2>
            </div>
            <Link className="text-link" to="/contact">
              Discuss a project ↗
            </Link>
          </div>

          <div className="project-grid">
            {PROJECTS.map((project) => (
              <article className="project-card" key={project.title}>
                <div className="project-card-media">
                  <img
                    src={project.image}
                    alt={project.imageAlt}
                    width="800"
                    height="560"
                  />
                </div>

                <div className="project-card-body">
                  <div className="project-card-tags">
                    {project.tags.map((tag) => (
                      <span className="tag" key={tag}>
                        {tag}
                      </span>
                    ))}
                  </div>

                  <h3 className="project-card-title">{project.title}</h3>
                  <p className="project-card-description">{project.description}</p>

                  <p className="project-card-role">
                    <strong>Role:</strong> {project.role}
                  </p>
                  <p className="project-card-outcome">
                    <strong>Outcome:</strong> {project.outcome}
                  </p>
                  <p className="project-card-date">
                    Completed {project.completedOn}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="cta-band" aria-labelledby="projects-cta-heading">
          <h2 className="section-title" id="projects-cta-heading">
            Need a reliable mobile build?
          </h2>
          <Link className="text-link" to="/services">
            View services →
          </Link>
        </section>
      </div>
    </main>
  );
}

export default Projects;
