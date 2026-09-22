import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b bg-white shadow-sm">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

        {/* Logo */}
        <Link to="/" className="text-2xl font-bold">
          <span className="text-blue-600">&lt;/&gt;</span>{" "}
          <span className="text-slate-900">Dev</span>
          <span className="text-blue-600">Market</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `relative py-2 text-sm font-medium transition ${
                  isActive
                    ? "text-blue-600 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-blue-600"
                    : "text-slate-700 hover:text-blue-600"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-4 md:flex">

          {/* Search */}
          <div className="flex items-center rounded-full bg-slate-100 px-4 py-2">
            <span className="mr-2 text-slate-500">⌕</span>

            <input
              type="text"
              placeholder="Search..."
              className="w-28 bg-transparent text-sm outline-none placeholder:text-slate-500"
            />
          </div>

          {/* Cart */}
          <button className="relative text-xl text-slate-700 hover:text-blue-600">
            🛒
            <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 text-[10px] text-white">
              2
            </span>
          </button>

          {/* Notification */}
          <button className="relative text-xl text-slate-700 hover:text-blue-600">
            🔔
            <span className="absolute right-0 top-0 h-2 w-2 rounded-full bg-red-500"></span>
          </button>

          {/* Divider */}
          <div className="h-8 w-px bg-slate-200"></div>

          {/* Login */}
          <Link
            to="/login"
            className="font-medium text-blue-600 hover:text-blue-800"
          >
            Login
          </Link>

          {/* Signup */}
          <Link
            to="/signup"
            className="rounded-lg bg-blue-600 px-5 py-2.5 font-medium text-white transition hover:bg-blue-700"
          >
            Sign Up
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-2xl text-slate-700 md:hidden"
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? "✕" : "☰"}
        </button>
      </nav>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="border-t bg-white px-6 py-4 md:hidden">

          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) =>
                  `rounded-md px-3 py-2 text-sm font-medium ${
                    isActive
                      ? "bg-blue-50 text-blue-600"
                      : "text-slate-700 hover:bg-slate-50"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}

            {/* Mobile Login */}
            <Link
              to="/login"
              onClick={() => setIsMenuOpen(false)}
              className="rounded-md px-3 py-2 text-sm font-medium text-blue-600"
            >
              Login
            </Link>

            {/* Mobile Signup */}
            <Link
              to="/signup"
              onClick={() => setIsMenuOpen(false)}
              className="rounded-lg bg-blue-600 px-4 py-2.5 text-center font-medium text-white hover:bg-blue-700"
            >
              Sign Up
            </Link>
          </div>

        </div>
      )}
    </header>
  );
}

export default Header;                                 