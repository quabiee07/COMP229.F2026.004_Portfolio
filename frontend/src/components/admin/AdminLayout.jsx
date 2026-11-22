import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { ADMIN_SECTION_ORDER, RESOURCES } from "../../constants/adminResources";

function AdminLayout() {
  const location = useLocation();
  const resourceKey = location.pathname.split("/").filter(Boolean)[1];
  const sectionLabel =
    resourceKey && RESOURCES[resourceKey] ? RESOURCES[resourceKey].label : "Overview";

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar" aria-label="Admin sections">
        <Link className="admin-sidebar-brand" to="/admin">
          <span className="admin-brand-mark">KI</span>
          <span className="admin-brand-copy">
            <strong>Studio Console</strong>
            <small>Content workspace</small>
          </span>
        </Link>

        <div>
          <p className="admin-sidebar-label">Manage</p>
          <nav className="admin-sidebar-nav">
            <NavLink
              className={({ isActive }) =>
                isActive ? "admin-sidebar-link is-active" : "admin-sidebar-link"
              }
              end
              to="/admin"
            >
              <span className="admin-sidebar-index">00</span>
              <span>Overview</span>
            </NavLink>

            {ADMIN_SECTION_ORDER.map((key, index) => (
              <NavLink
                className={({ isActive }) =>
                  isActive ? "admin-sidebar-link is-active" : "admin-sidebar-link"
                }
                key={key}
                to={`/admin/${key}`}
              >
                <span className="admin-sidebar-index">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span>{RESOURCES[key].label}</span>
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="admin-sidebar-foot">
          <span className="admin-status-line">
            <span className="admin-status-dot" />
            API connected
          </span>
          <Link className="admin-view-site" to="/">
            View portfolio ↗
          </Link>
        </div>
      </aside>

      <div className="admin-content">
        <div className="admin-topbar">
          <div className="admin-breadcrumb">
            <Link to="/admin">Workspace</Link>
            <span aria-hidden="true">/</span>
            <span>{sectionLabel}</span>
          </div>
          <span className="admin-topbar-tag">Portfolio CMS</span>
        </div>

        <main className="admin-main">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
