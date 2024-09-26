import React from "react";

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand p-3" href="/">
        Onito Tech
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navContainer"
        aria-controls="navbarcontrols"
        aria-expanded="false"
        aria-label="navtoggle"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div
        className="collapse navbar-collapse justify-content-end p-3"
        id="navContainer"
      >
        <ul className="navbar-nav ">
          <li className="nav-item">
            <a className="nav-link" href="/">
              Home
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/add-user">
              Add User
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/user-details">
              User Data
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
