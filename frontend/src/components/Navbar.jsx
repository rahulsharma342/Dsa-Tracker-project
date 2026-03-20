import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import "../styles/navbar.css";

const Navbar = () => {
  const { user, handleLogout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropOpen, setDropOpen] = useState(false);
  const dropRef  = useRef(null);
  const location = useLocation();

  const displayName = user?.username || user?.name || "User";

  // Initials avatar
  const initials = displayName
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  // Close everything on route change
  useEffect(() => {
    setMenuOpen(false);
    setDropOpen(false);
  }, [location.pathname]);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (dropRef.current && !dropRef.current.contains(e.target)) {
        setDropOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const logoutUser = async () => {
    await handleLogout();
    setMenuOpen(false);
    setDropOpen(false);
  };

  const closeMenu = () => setMenuOpen(false);

  const NAV_LINKS = [
    { to: "/",          label: "Home"      },
    { to: "/dashboard", label: "Dashboard" },
    { to: "/problems",  label: "Problems"  },
    { to: "/contact",   label: "Contact"   },
  ];

  return (
    <>
      <nav className="navbar">

        {/* ── Logo ── */}
        <div className="logo">
          <Link to="/" onClick={closeMenu}>DSA Tracker 🚀</Link>
        </div>

        {/* ── Nav Links (desktop centered + mobile slide-down) ── */}
        <ul className={`nav-links ${menuOpen ? "active" : ""}`}>

          {/* Regular nav items */}
          {NAV_LINKS.map((l) => (
            <li key={l.to}>
              <Link to={l.to} onClick={closeMenu}>
                {/* Desktop: hover-slide animation */}
                <div className="hover-slide">
                  <span className="top">{l.label}</span>
                  <span className="bottom">{l.label}</span>
                </div>
              </Link>
            </li>
          ))}

          {/* ── Mobile Auth Section ── */}
          {/* Only visible on mobile via CSS */}
          <li className="mobile-auth-section">

            {user ? (
              /* Logged in — show user info + dashboard + logout */
              <>
                <div className="mobile-user-info">
                  <div className="avatar-circle">{initials}</div>
                  <div>
                    <div className="mobile-user-name">{displayName}</div>
                    <div className="mobile-user-email">{user?.email || ""}</div>
                  </div>
                </div>

                <div className="mobile-auth-btns">
                  <Link
                    to="/dashboard"
                    className="mobile-dash-btn"
                    onClick={closeMenu}
                  >
                    📊 &nbsp; Go to Dashboard
                  </Link>

                  <button
                    className="mobile-logout-btn"
                    onClick={logoutUser}
                  >
                    🚪 &nbsp; Log Out
                  </button>
                </div>
              </>
            ) : (
              /* Not logged in — show login + signup */
              <div className="mobile-auth-btns">
                <Link
                  to="/login"
                  className="mobile-login-btn"
                  onClick={closeMenu}
                >
                  Log In
                </Link>

                <Link
                  to="/register"
                  className="mobile-signup-btn"
                  onClick={closeMenu}
                >
                  Sign Up Free
                </Link>
              </div>
            )}
          </li>
        </ul>

        {/* ── Desktop Auth Buttons ── */}
        <div className="auth-btns desktop-auth">
          {user ? (
            /* Logged in — avatar + dropdown */
            <div className="user-section" ref={dropRef}>
              <button
                className="avatar-btn"
                onClick={() => setDropOpen(!dropOpen)}
                aria-label="User menu"
              >
                <div className="avatar-circle">{initials}</div>
                <span className="username">Hi, {displayName}</span>
                <span className={`chevron ${dropOpen ? "chevron--up" : ""}`}>▾</span>
              </button>

              {dropOpen && (
                <div className="dropdown">
                  {/* Header */}
                  <div className="dropdown__header">
                    <div className="avatar-circle avatar-circle--lg">{initials}</div>
                    <div>
                      <div className="dropdown__name">{displayName}</div>
                      <div className="dropdown__email">{user?.email || "—"}</div>
                    </div>
                  </div>

                  <div className="dropdown__divider" />

                  {/* Menu items */}
                  {[
                    { to: "/dashboard", icon: "📊", label: "Dashboard"   },
                    { to: "/progress",  icon: "📈", label: "My progress" },
                    { to: "/bookmarks", icon: "⭐", label: "Bookmarks"   },
                    { to: "/settings",  icon: "⚙️", label: "Settings"    },
                  ].map((item) => (
                    <Link
                      key={item.to}
                      to={item.to}
                      className="dropdown__item"
                      onClick={() => setDropOpen(false)}
                    >
                      <span className="dropdown__icon">{item.icon}</span>
                      {item.label}
                    </Link>
                  ))}

                  <div className="dropdown__divider" />

                  <button
                    className="dropdown__item dropdown__item--danger"
                    onClick={logoutUser}
                  >
                    <span className="dropdown__icon">🚪</span>
                    Log out
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* Not logged in */
            <>
              <Link to="/login">
                <button className="login">Log In</button>
              </Link>
              <Link to="/register">
                <button className="signup">Sign Up</button>
              </Link>
            </>
          )}
        </div>

        {/* ── Hamburger toggle ── */}
        <button
          className={`menu-toggle ${menuOpen ? "menu-toggle--open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
          type="button"
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      {/* Dark overlay behind mobile menu */}
      {menuOpen && (
        <div
          className="mobile-overlay"
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}
    </>
  );
};

export default Navbar;