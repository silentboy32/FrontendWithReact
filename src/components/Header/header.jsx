
import { Link, NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header className="shadow sticky top-0 z-50">
      <nav className="bg-white border-gray-200 px-4 py-2.5">
        <div className="flex justify-between items-center mx-auto max-w-screen-xl">

          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              src="https://alexharkness.com/wp-content/uploads/2020/06/logo-2.png"
              className="mr-3 h-12"
              alt="Logo"
            />
          </Link>

          {/* Center Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink to="/" className="hover:text-orange-700">Home</NavLink>
            <NavLink to="/about" className="hover:text-orange-700">About</NavLink>
            <NavLink to="/contact" className="hover:text-orange-700">Contact</NavLink>

            <NavLink to="/github" className="hover:text-orange-700">Github</NavLink>

            <NavLink to="/gameplay" className="hover:text-orange-700">GamePlay</NavLink>

          </div>

          {/* Right Buttons */}
          <div className="flex items-center space-x-3">
            <Link
              to="/login"
              className="text-gray-800 hover:bg-gray-50 font-medium rounded-lg text-sm px-4 py-2"
            >
              Log in
            </Link>

            <Link
              to="#"
              className="text-white bg-orange-700 hover:bg-orange-800 font-medium rounded-lg text-sm px-4 py-2"
            >
              Get started
            </Link>
          </div>

        </div>
      </nav>
    </header>
  );
}