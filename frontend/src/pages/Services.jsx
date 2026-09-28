import { Link } from "react-router-dom";
import serviceIos from "../assets/images/service-ios.svg";
import serviceAndroid from "../assets/images/service-android.svg";
import serviceCross from "../assets/images/service-cross.svg";
import servicePerformance from "../assets/images/service-performance.svg";

/**
 * Services offered as a mobile engineer — title + description (+ image)
 * for a clearer, more appealing presentation.
 */
const SERVICES = [
  {
    title: "iOS app development",
    description:
      "Native Swift and SwiftUI apps with solid architecture, App Store-ready releases, and attention to accessibility and performance.",
    image: serviceIos,
    imageAlt: "Illustration of an iOS device frame",
  },
  {
    title: "Android app development",
    description:
      "Kotlin apps built for real devices and network conditions — from polished UI to background work, notifications, and Play Store delivery.",
    image: serviceAndroid,
    imageAlt: "Illustration of an Android device frame",
  },
  {
    title: "Cross-platform mobile",
    description:
      "React Native and Flutter when one codebase should serve iOS and Android without sacrificing maintainability or release quality.",
    image: serviceCross,
    imageAlt: "Illustration representing cross-platform mobile delivery",
  },
  {
    title: "Architecture & performance",
    description:
      "Audits and refactors for crash rates, startup time, battery use, and codebase structure so products stay healthy after launch.",
    image: servicePerformance,
    imageAlt: "Illustration of a performance trend line",
  },
];

function Services() {
  return (
    <main>
      <header className="page-hero">
        <p className="section-label">Services</p>
        <h1 className="section-title">How I can help</h1>
        <p className="page-hero-lead">
          Practical mobile engineering support — from greenfield apps to
          stabilizing products already in the stores.
        </p>
      </header>

      <div className="site-main">
        <section className="section-block" aria-labelledby="services-heading">
          <div className="section-header-row">
            <div>
              <p className="section-label">Offerings</p>
              <h2 className="section-title" id="services-heading">
                Mobile engineering services
              </h2>
            </div>
            <Link className="text-link" to="/contact">
              Book A Call ↗
            </Link>
          </div>

          <div className="service-grid">
            {SERVICES.map((service) => (
              <article className="service-card" key={service.title}>
                <div className="service-card-media">
                  <img
                    src={service.image}
                    alt={service.imageAlt}
                    width="800"
                    height="560"
                  />
                </div>
                <h3 className="service-card-title">{service.title}</h3>
                <p className="service-card-description">{service.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="cta-band" aria-labelledby="services-cta-heading">
          <h2 className="section-title" id="services-cta-heading">
            Got a vision? Let’s bring it to life.
          </h2>
          <Link className="text-link" to="/contact">
            Get in touch ↗
          </Link>
        </section>
      </div>
    </main>
  );
}

export default Services;
