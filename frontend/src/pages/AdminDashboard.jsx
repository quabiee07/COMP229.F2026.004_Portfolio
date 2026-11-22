import { Link } from "react-router-dom";
import {
  ADMIN_SECTION_ORDER,
  RESOURCES,
} from "../constants/adminResources";
import { useResource } from "../hooks/useResource";

function AdminSectionCard({ resourceKey, index }) {
  const config = RESOURCES[resourceKey];
  const { items, loading, error } = useResource(resourceKey);
  const count = loading ? "—" : error ? "!" : items.length;

  return (
    <Link className="admin-card admin-section-card" to={`/admin/${resourceKey}`}>
      <span className="admin-card-top">
        <span className="admin-card-index">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="admin-card-arrow" aria-hidden="true">
          ↗
        </span>
      </span>
      <h3>{config.label}</h3>
      <p>{config.description}</p>
      <span className="admin-card-meta">
        <strong>{count}</strong>
        <span>{config.singular.toLowerCase()} records</span>
      </span>
    </Link>
  );
}

function AdminDashboard() {
  return (
    <>
      <header className="admin-page-head">
        <div>
          <p className="admin-eyebrow">Overview</p>
          <h1 className="admin-page-title">Content dashboard</h1>
          <p className="admin-page-lead">
            Manage the data that powers your public portfolio. Every change is
            sent through the API and stored in the database.
          </p>
        </div>
        <Link className="admin-button admin-button-primary" to="/admin/projects/new">
          New project
        </Link>
      </header>

      <section className="admin-section" aria-labelledby="admin-sections-title">
        <div className="admin-section-head">
          <div>
            <h2 id="admin-sections-title">Sections</h2>
            <p>Four collections, one workspace.</p>
          </div>
        </div>

        <div className="admin-card-grid">
          {ADMIN_SECTION_ORDER.map((resourceKey, index) => (
            <AdminSectionCard
              key={resourceKey}
              resourceKey={resourceKey}
              index={index}
            />
          ))}
        </div>
      </section>

      <section className="admin-hint" aria-label="How the workspace works">
        <div>
          <h3>Connected end to end</h3>
          <p>Your admin edits and the public pages share one source of truth.</p>
        </div>
        <div className="admin-hint-steps">
          <span>01 Edit here</span>
          <span>02 Backend API</span>
          <span>03 MongoDB</span>
          <span>04 Live site</span>
        </div>
      </section>
    </>
  );
}

export default AdminDashboard;
