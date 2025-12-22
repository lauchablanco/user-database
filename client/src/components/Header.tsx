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

      <div className="header-right">
        <span className="header-label">Logged in as</span>
        <RoleSelector />
      </div>
    </header>
  );
};

export default Header;
