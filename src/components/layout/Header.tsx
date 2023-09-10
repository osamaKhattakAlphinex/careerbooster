"use client";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

const Header = () => {
  const { data, status }: { data: any; status: any } = useSession();
  const isAuth = status === "authenticated";
  const role = data?.user?.role;

  return (
    <nav
      className="navbar navbar-expand-lg fixed-top bg-dark"
      data-bs-theme="dark"
    >
      <div className="container">
        {/* <!-- Logo --> */}
        <Link className="navbar-brand" href="/">
          <img src="assets/images/logo.svg" alt="" width="165" />
        </Link>

        {/* <!-- Navbar toggler button --> */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <div className="navbar-toggler-icon">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>

        {/* <!-- Navbar content --> */}
        <div className="collapse navbar-collapse" id="navbarContent">
          <div className="navbar-content-inner ms-lg-auto d-flex flex-column flex-lg-row align-lg-center gap-4 gap-lg-10 p-2 p-lg-0">
            <ul className="navbar-nav gap-lg-2 gap-xl-5">
              <li className="nav-item dropdown">
                <Link
                  className="nav-link active"
                  href="/"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  aria-current="page"
                >
                  Home
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" href="/about">
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="/blogs">
                  Blogs
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="/use-cases">
                  Use cases
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="/pricing">
                  Pricing
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="/contact">
                  Contact
                </Link>
              </li>
              {isAuth ? (
                <li className="nav-item">
                  <button className="nav-link" onClick={() => signOut()}>
                    Logout
                  </button>
                </li>
              ) : (
                <li className="nav-item">
                  <Link className="nav-link" href="/login">
                    Login
                  </Link>
                </li>
              )}
            </ul>
            <div className="">
              {isAuth ? (
                <Link
                  href={role === "admin" ? "/admin" : "/dashboard"}
                  className="btn btn-outline-primary-dark"
                >
                  Dashboard
                </Link>
              ) : (
                <>
                  <Link
                    href="/register"
                    className="btn btn-outline-primary-dark"
                  >
                    Get started
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
