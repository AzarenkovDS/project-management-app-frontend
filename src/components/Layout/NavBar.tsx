import { useUser } from "../../context/UserContext";
import { NavLink } from "react-router-dom";
import ThemeSwitcher from "../ThemeSwitcher/ThemeSwitcher";

function NavBar() {
  const { currentUser } = useUser();

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? "nav-link active" : "nav-link";

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary border-bottom">
      <div className="container">
        <a className="navbar-brand" href="/">
          PM App
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {currentUser ? (
              <>
                <li className="nav-item">
                  <NavLink to="/projects" className={linkClass}>
                    Projects
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <NavLink to="/register" className={linkClass}>
                    Register
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/login" className={linkClass}>
                    Login
                  </NavLink>
                </li>
              </>
            )}

            <li className="nav-item">
              <ThemeSwitcher />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
