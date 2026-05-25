import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const { pathname } = useLocation();

  return (
    <nav className="navbar navbar-expand-lg navbar-vacuna mb-4">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center gap-2" to="/">
          <span style={{ fontSize: 22 }}> </span> Vacuna Monitor
        </Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto gap-1">
            {[
              { path: "/",          label: "Dashboard" },
              { path: "/historial", label: "Historial" },
              { path: "/config",    label: "Configuración" },
            ].map(({ path, label }) => (
              <li className="nav-item" key={path}>
                <Link className={`nav-link ${pathname === path ? "active" : ""}`} to={path}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}