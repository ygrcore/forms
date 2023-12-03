import { NavLink, Link } from 'react-router-dom';
import './appHeader.scss';
import '../../style/variables.scss';

const AppHeader = () => {
  return (
    <header className="app__header">
      <h1 className="app__title">
        <Link to="/">
          <span className="logo">React.Forms</span>
        </Link>
      </h1>
      <nav className="app__menu">
        <ul>
          <li>
            <NavLink
              end
              style={({ isActive }) => ({
                color: isActive ? '#565ddc' : 'inherit',
              })}
              to="/rhf"
            >
              React Hook Form
            </NavLink>
          </li>
          /
          <li>
            <NavLink
              style={({ isActive }) => ({
                color: isActive ? '#565ddc' : 'inherit',
              })}
              to="/uf"
            >
              Uncontrolled Form
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default AppHeader;
