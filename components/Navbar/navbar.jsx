import React from "react";
import classes from "./navbar.module.css";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

const Navbar = (props) => {
  const { data } = useSession();

  const logoutUser = () => {
    signOut();
  };

  return (
    <>
      <div className={classes.navbarContainer}>
        <div className={classes.blurNav} />
        <nav
          className={classes.navbar + " navbar navbar-expand-lg navbar-light"}
        >
          <div className="container-fluid px-0">
            <button
              className="navbar-toggler mx-3"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0 dropdown px-3">
                <li className="nav-item">
                  <Link legacyBehavior href={"/"}>
                    <a
                      className={`${
                        classes.navLink +
                        " nav-link " +
                        (props.active === "home" && classes.active)
                      }`}
                      aria-current="page"
                    >
                      سەرەکی
                    </a>
                  </Link>
                </li>
                {data && (
                  <li className="nav-item">
                    <Link legacyBehavior href={"/profile"}>
                      <a
                        className={
                          classes.navLink +
                          " nav-link " +
                          (props.active === "profile" && classes.active)
                        }
                      >
                        پڕۆفایل
                      </a>
                    </Link>
                  </li>
                )}
                {!data ? (
                  <>
                    <li className="nav-item">
                      <Link legacyBehavior href={"/login"}>
                        <a
                          className={
                            classes.navLink +
                            " nav-link " +
                            (props.active === "login" && classes.active)
                          }
                        >
                          چوونەژورەوە
                        </a>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link legacyBehavior href={"/register"}>
                        <a
                          className={
                            classes.navLink +
                            " nav-link " +
                            (props.active === "register" && classes.active)
                          }
                        >
                          خۆتۆمارکردن
                        </a>
                      </Link>
                    </li>
                  </>
                ) : (
                  <li className="nav-item">
                    <a
                      className={classes.navLink + " nav-link "}
                      onClick={logoutUser}
                      style={{ cursor: "pointer" }}
                    >
                      چوونە دەرەوە
                    </a>
                  </li>
                )}
              </ul>
              <div className={classes.searchField}>
                <h1 className="px-3">لۆگۆ</h1>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
