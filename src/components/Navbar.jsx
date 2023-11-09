import { PropTypes } from "prop-types";
import logo from "../images/logo.jpg";
import logoIcon from "../images/logo-icon.jpg";

const Navbar = ({ handleMenu, active }) => {
  return (
    <header className="fixed top-0 bg-white w-full z-[100]">
      <div className="container">
        <div className="flex items-center justify-between w-full pt-8 pb-6 border-b-2 border-slate-300">
          <a className="flex gap-2" href="/dashboard">
            <img className="-mt-[4px]" src={logoIcon} alt="" width={28} />
            <img src={logo} alt="" width={110} />
          </a>

          <a href="#!" className="lg:hidden me-1" onClick={handleMenu}>
            {active ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 9h16.5m-16.5 6.75h16.5"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            )}
          </a>
        </div>
      </div>
    </header>
  );
};

Navbar.propTypes = {
  active: PropTypes.bool,
  handleMenu: PropTypes.func,
};

export default Navbar;
