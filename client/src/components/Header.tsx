import { NavLink } from "react-router";
import "../styles/Header.css";
import RoleSelector from "./RoleSelector";

const Header = () => {
  return (
    <header className="header-bar">
      <div className="header-left">
        <img
          src="/hogwarts.png"
          alt="Hogwarts"
          className="hogwarts-logo"
        />
      </div>

      <nav>
        <NavLink className={'nav-link'} to="/magic-files">Magic Files</NavLink>
        <NavLink className={'nav-link'} to="/sortering-hat">Sortering Hat</NavLink>
        <NavLink className={'nav-link'} to="/quiddich-forecast">Quiddich Forecast</NavLink>
      </nav>

      <div className="header-right">
        <span className="header-label">Logged in as</span>
        <RoleSelector />
      </div>
    </header>
  );
};

export default Header;
