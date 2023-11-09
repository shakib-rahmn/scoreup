import { PropTypes } from "prop-types";
import { Link, useLocation } from "react-router-dom";

const Sidebar = ({ menu }) => {
  const url = useLocation();

  return (
    <div
      className={`min-w-[240px] border-r bg-white border-slate-300 h-[80vh] max-lg:bg-slate-50 max-lg:absolute max-lg:border max-lg:p-5 max-lg:rounded-lg overflow-hidden transition-all duration-300 z-50 ${
        menu ? "max-lg:-ml-[400px]" : ""
      }`}
    >
      <div className="flex flex-col lg:pr-6">
        <Link
          className={`flex items-center text-center py-2 px-4 rounded-lg gap-2 mb-1 hover:bg-slate-100 transition duration-300 ${
            url.pathname === "/dashboard" && "bg-slate-200"
          }`}
          to="/dashboard"
        >
          <div className="min-w-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
              />
            </svg>
          </div>
          Dashboard
        </Link>

        <Link
          className={`flex items-center text-center py-2 px-4 rounded-lg gap-2 mb-1 hover:bg-slate-100 transition duration-300 ${
            url.pathname === "/publish" && "bg-slate-200"
          }`}
          to="/publish"
        >
          <div className="min-w-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 -mt-1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
              />
            </svg>
          </div>
          Publish Score
        </Link>

        <Link
          className={`flex items-center text-center py-2 px-4 rounded-lg gap-2 mb-1 hover:bg-slate-100 transition duration-300 ${
            url.pathname === "/published" && "bg-slate-200"
          }`}
          to="/published"
        >
          <div className="min-w-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
              />
            </svg>
          </div>
          Published
        </Link>
      </div>
    </div>
  );
};

Sidebar.propTypes = {
  menu: PropTypes.bool,
};

export default Sidebar;
