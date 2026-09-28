import { Link } from "react-router-dom";
import portraitImage from "../assets/images/Ebuka.JPG";
import resumePdf from "../assets/documents/Kingsley_Ihekwaba_Resume.pdf";

const EXPERIENCES = [
  {
    organization: "Independent / Contract",
    dates: "2023 — Present",
    role: "Mobile Engineer — shipping client apps, hardening release pipelines, and mentoring on native architecture.",
    tags: ["React Native", "Swift", "Kotlin"],
  },
  {
    organization: "Product team collaboration",
    dates: "2020 — 2023",
    role: "Mobile Engineer — owned feature delivery across iOS and Android, including offline sync and push notification flows.",
    tags: ["iOS", "Android", "APIs"],
  },
  {
    organization: "Early mobile projects",
    dates: "2018 — 2020",
    role: "Junior Mobile Developer — built UI screens, fixed production bugs, and learned store release and crash triage fundamentals.",
    tags: ["Flutter", "UI"],
  },
];

/**
 * About Me — legal name, portrait, bio, resume PDF, and experience list.
 * Written to stay clean and employer-ready.
 */
function About() {
  return (
    <main>
      <header className="page-hero">
        <p className="section-label">About Me</p>
        <h1 className="section-title">Engineering with clarity and care</h1>
        <p className="page-hero-lead">
          A concise look at who I am, how I work, and where I’ve built mobile
          products — written for hiring managers and collaborators.
        </p>
      </header>

      <div className="site-main">
        {/* Legal name, headshot, bio, resume PDF — keep employer-ready */}
        <section className="about-intro" aria-labelledby="about-name">
          <div className="about-portrait">
            <img
              src={portraitImage}
              alt="Head and shoulders portrait of Kingsley Ihekwaba"
              width="800"
              height="1000"
            />
          </div>

          <div>
            <p className="about-identity">Legal name</p>
            <h2 className="about-name" id="about-name">
              Kingsley Ihekwaba
            </h2>
            <p className="about-bio">
              I’m a mobile engineer who designs and ships production apps for
              iOS and Android. I care about clean architecture, readable code,
              and the performance work that keeps products stable long after
              launch. Whether I’m working natively or with a cross-platform
              stack, I focus on dependable delivery and clear collaboration with
              design and product partners.
            </p>

            <ul className="about-points">
              <li>
                I turn product requirements into maintainable mobile
                architectures that teams can extend safely.
              </li>
              <li>
                I prioritize shipping quality: testing, observability, and
                release discipline over short-term shortcuts.
              </li>
            </ul>

            <div className="about-actions">
              <a
                className="btn btn-primary"
                href={resumePdf}
                target="_blank"
                rel="noopener noreferrer"
              >
                Download Resume (PDF)
              </a>
              <Link className="btn btn-secondary" to="/contact">
                Get in touch
              </Link>
            </div>
          </div>
        </section>

        <section className="section-block" aria-labelledby="experience-heading">
          <div className="section-header-row">
            <div>
              <p className="section-label">Experiences</p>
              <h2 className="section-title" id="experience-heading">
                Explore my engineering journey
              </h2>
            </div>
            <Link className="text-link" to="/contact">
              Book A Call ↗
            </Link>
          </div>

          <ul className="experience-list">
            {EXPERIENCES.map((experience) => (
              <li className="experience-item" key={experience.organization}>
                <div>
                  <h3 className="experience-org">{experience.organization}</h3>
                  <p className="experience-dates">{experience.dates}</p>
                </div>
                <p className="experience-role">{experience.role}</p>
                <div className="experience-tags">
                  {experience.tags.map((tag) => (
                    <span className="tag" key={tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="cta-band" aria-labelledby="about-cta-heading">
          <h2 className="section-title" id="about-cta-heading">
            Want to work together?
          </h2>
          <Link className="text-link" to="/projects">
            See selected projects →
          </Link>
        </section>
      </div>
    </main>
  );
}

export default About;
