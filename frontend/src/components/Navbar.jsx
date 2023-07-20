import { useState } from "react";
import { useSelector } from "react-redux";

export default function Navbar() {
  const isAuth = Boolean(useSelector((state) => state.auth.token));
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleMenu = () => {
    setIsExpanded(!isExpanded);
  };
  return (
    <>
      <nav className="bg-gray-900">
        <div className="flex flex-wrap items-center justify-between mx-auto p-2 md:p-3">
          <button className="flex items-center">
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="h-8 mr-3"
              alt="Flowbite Logo"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-slate-100">
              SkyVault
            </span>
          </button>
          <button
            data-collapse-toggle="navbar-default"
            type="button"
            onClick={toggleMenu}
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-default"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
          <div
            className={`${
              isExpanded ? "block" : "hidden"
            } w-full md:block md:w-auto`}
            id="navbar-default"
          >
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              {isAuth ? (
                <>
                  <li>
                    <button className="text-lg font-semibold text-slate-100 hover:text-blue-800 p-1">
                      Log Out
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <button className="text-lg font-semibold text-slate-100 hover:text-blue-800 p-1">
                      Sign Up
                    </button>
                  </li>
                  <li>
                    <button
                      href="#"
                      className="text-lg font-semibold text-slate-100 hover:text-blue-800 p-1"
                    >
                      Login
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
