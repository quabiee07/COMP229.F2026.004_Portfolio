import { Link } from "react-router-dom";
import fallbackImage from "../assets/images/project-thumb-a.svg";
import { useResource } from "../hooks/useResource";

function getCompletion(value) {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;

  return {
    year: String(date.getFullYear()),
    label: date.toLocaleDateString("en-CA", {
      year: "numeric",
      month: "long",
    }),
    iso: date.toISOString().slice(0, 10),
  };
}

function ProjectVisual({ project, index }) {
  return (
    <div className="project-visual">
      <img
        src={project.image || fallbackImage}
        alt={`${project.title} interface preview`}
        loading={index === 0 ? "eager" : "lazy"}
        width="1200"
        height="900"
      />
      <span className="project-visual-index" aria-hidden="true">
        {String(index + 1).padStart(2, "0")}
      </span>
    </div>
  );
}

function ProjectCard({ project, index, featured = false }) {
  const completion = getCompletion(project.completion);

  return (
    <article className={featured ? "project-card is-featured" : "project-card"}>
      <ProjectVisual project={project} index={index} />

      <div className="project-copy">
        <div className="project-meta">
          <span className="project-kicker">
            {featured ? "Featured work" : "Case study"}
          </span>
          <span className="project-year">{completion?.year ?? "Undated"}</span>
        </div>

        <h3 className="project-title">{project.title}</h3>
        <p className="project-description">{project.description}</p>

        <div className="project-foot">
          <span className="project-line" aria-hidden="true" />
          {completion ? (
            <time className="project-completion" dateTime={completion.iso}>
              Completed {completion.label}
            </time>
          ) : (
            <span className="project-completion">Completion date on request</span>
          )}
        </div>
      </div>
    </article>
  );
}

function Projects() {
  const { items: projects, loading, error } = useResource("projects");
  const [featured, ...remainingProjects] = projects;

  return (
    <main>
      <header className="page-hero projects-hero">
        <div className="projects-hero-top">
          <p className="section-label">Portfolio</p>
          <span className="projects-hero-badge">
            <span className="projects-status-dot" aria-hidden="true" />
            Available for select projects
          </span>
        </div>

        <h1 className="section-title">Product work, built to last.</h1>
        <p className="page-hero-lead">
          A focused set of mobile products I’ve built or led — from architecture
          and delivery to the details that keep an app healthy after launch.
        </p>

        <div className="projects-hero-meta">
          <span>
            <strong>{loading ? "—" : projects.length}</strong> published{" "}
            {projects.length === 1 ? "project" : "projects"}
          </span>
          <span>Live from the portfolio API</span>
        </div>
      </header>

      <div className="site-main">
        <section
          className="section-block projects-section"
          aria-labelledby="projects-heading"
        >
          <div className="projects-section-head">
            <div>
              <p className="section-label">Case studies</p>
              <h2 className="projects-section-title" id="projects-heading">
                Recent work
              </h2>
            </div>
            <Link className="text-link" to="/contact">
              Discuss a project ↗
            </Link>
          </div>

          {loading ? (
            <div
              className="projects-skeleton"
              role="status"
              aria-label="Loading projects"
            >
              {[0, 1, 2].map((item) => (
                <div className="project-skeleton-card" key={item} aria-hidden="true">
                  <span className="project-skeleton-media" />
                  <span className="project-skeleton-line" />
                  <span className="project-skeleton-line is-short" />
                </div>
              ))}
            </div>
          ) : error || projects.length === 0 ? (
            <div className="projects-notice" role={error ? "alert" : undefined}>
              <span className="projects-notice-mark" aria-hidden="true">
                {error ? "!" : "+"}
              </span>
              <h3>
                {error ? "Projects are unavailable" : "No projects published yet"}
              </h3>
              <p>
                {error ||
                  "Add a case study in the admin dashboard and it will appear here."}
              </p>
              <div className="btn-group">
                <Link className="btn btn-secondary" to="/">
                  Back home
                </Link>
                <Link className="btn btn-primary" to="/admin/projects">
                  Manage projects
                </Link>
              </div>
            </div>
          ) : (
            <div className="projects-list">
              {featured ? (
                <ProjectCard project={featured} index={0} featured />
              ) : null}

              {remainingProjects.length > 0 ? (
                <div className="projects-grid">
                  {remainingProjects.map((project, index) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      index={index + 1}
                    />
                  ))}
                </div>
              ) : null}
            </div>
          )}
        </section>

        <section
          className="cta-band projects-cta"
          aria-labelledby="projects-cta-heading"
        >
          <div>
            <p className="section-label">Next step</p>
            <h2 className="section-title" id="projects-cta-heading">
              Need a reliable mobile build?
            </h2>
            <p className="cta-band-lead">
              I help teams ship focused, maintainable apps — from first release
              to long-term growth.
            </p>
          </div>
          <Link className="btn btn-primary" to="/services">
            View services →
          </Link>
        </section>
      </div>
    </main>
  );
}

export default Projects;
