import { Link } from "react-router-dom";

const ADMIN_LINKS = [
    { to: "/admin/projects", label: "Manage Projects", description: "Add, edit and remove projects." },
    { to: "/admin/services", label: "Manage Services", description: "Maintain the services you offer." },
    { to: "/admin/references", label: "Manage References", description: "Update testimonials and references." },
    { to: "/admin/users", label: "Manage Users", description: "Maintain user accounts." },
];

function AdminDashboard() {
    return (
        <main>
            <header className="page-hero">
                <p className="section-label">Admin</p>
                <h1 className="section-title">Dashboard</h1>
                <p className="page-hero-lead">Choose a section to manage</p>
            </header>
            <div className="site-main">
                <section className="section-block" aria-labelledby="admin-heading">
                    <h2 className="section-title" id="admin-heading">Manage content</h2>
                    <div className="service-grid">
                        {ADMIN_LINKS.map(({ to, label, description }) => (
                            <Link className="service-card" to={to} key={to}>
                                <h3 className="service-card-title">{label}</h3>
                                <p className="service-card-description">{description}</p>
                            </Link>
                        ))}
                    </div>
                </section>
            </div>

        </main>
    );
}

export default AdminDashboard;