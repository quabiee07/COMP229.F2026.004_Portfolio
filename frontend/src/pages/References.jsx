import { Link } from "react-router-dom";

/**
 * Testimonials — each entry includes name, company, position, and quote
 * as required for the References page.
 */
const REFERENCES = [
  {
    name: "Amara Okonkwo",
    company: "Northline Payments",
    position: "Product Manager",
    testimonial:
      "Kingsley delivered our wallet app with calm focus. He clarified trade-offs early, kept releases predictable, and left the codebase in a state the team could own confidently.",
  },
  {
    name: "Daniel Reyes",
    company: "Pulse Health",
    position: "Engineering Manager",
    testimonial:
      "He treated performance and crash hygiene as product features. Our iOS client became more stable after his sync redesign, and stakeholders always knew where things stood.",
  },
  {
    name: "Priya Nair",
    company: "FieldGrid Systems",
    position: "CTO",
    testimonial:
      "Working offline in the field is unforgiving. Kingsley’s Android companion handled poor connectivity without drama, and support tickets dropped after launch.",
  },
];

function References() {
  return (
    <main>
      <header className="page-hero">
        <p className="section-label">References</p>
        <h1 className="section-title">What collaborators say</h1>
        <p className="page-hero-lead">
          Short testimonials from people who have referred my work or partnered
          with me on mobile products.
        </p>
      </header>

      <div className="site-main">
        <section className="section-block" aria-labelledby="references-heading">
          <div className="section-header-row">
            <div>
              <p className="section-label">Testimonials</p>
              <h2 className="section-title" id="references-heading">
                Trusted by teams shipping apps
              </h2>
            </div>
            <Link className="text-link" to="/contact">
              Request a reference ↗
            </Link>
          </div>

          <div className="reference-grid">
            {REFERENCES.map((reference) => (
              <article className="reference-card" key={reference.name}>
                <p className="reference-quote">“{reference.testimonial}”</p>
                <div className="reference-meta">
                  <p className="reference-name">{reference.name}</p>
                  <p className="reference-role">
                    {reference.position}, {reference.company}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="cta-band" aria-labelledby="references-cta-heading">
          <h2 className="section-title" id="references-cta-heading">
            Ready to start a conversation?
          </h2>
          <Link className="text-link" to="/contact">
            Book A Call ↗
          </Link>
        </section>
      </div>
    </main>
  );
}

export default References;
