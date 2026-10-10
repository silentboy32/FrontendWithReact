
import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { UserProfile } from "../../../Store/UserAuth/UserAuth";

function Header() {

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // const { user, isLoggedIn, logout } = useAuth(); // <-- NEW
  const [ user, setUser ] = useState({
     "username" : "Dk Barman",
     "password" : "something "
  })
  const [ isLoggedIn, setisLoggedIn ] = useState(true);


 useEffect(() => {
        const checkLogin = async () => {
            try {
                const res = await UserProfile();

                if (res.success) {
                  setUser(res.data);
                  setisLoggedIn(true)
                }

            } catch (error) {
              
              setisLoggedIn(false) // User is not logged in
            }
        };

        checkLogin();
    }, []);
  

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
    navigate("/login");
  };

  const navLinks = [
      { name : "Message", path: "/chatpage" },
      { name : "Dashboard", path: "/dashboard" },
  ];

  return (
    <header className="sticky top-0 z-60 border-b bg-gray-950 shadow-sm h-25">

      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

        {/* Logo */}
        <Link to="/" className="text-2xl font-bold">
          <span className="text-blue-600">&lt;/&gt;</span>{" "}
          <span className="text-slate-50">Butter</span>
          <span className="text-blue-600">fly</span>
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
                    : "text-white hover:text-blue-600"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-4 md:flex">

          {/* ✨ CONDITIONAL: Profile vs Login ✨ */}
          {isLoggedIn ? (
            <div className="flex items-center gap-3">
              <Link
                to="/profile"
                className="flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1.5 hover:bg-slate-200 transition"
              >
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
                  {user?.username?.[0]?.toUpperCase() || "U"}
                </div>
                <span className="text-sm font-medium text-slate-700">
                  {user?.username || "Profile"}
                </span>
              </Link>
            </div>
          ) : (
            <Link
              to="/login"
              className="font-medium text-blue-600 hover:text-blue-800"
            >
              Login
            </Link>
          )}
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
        <div className="border-t bg-blue-950 px-6 py-4 md:hidden">
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
                      : "text-gray-100 hover:bg-slate-50"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}

            {/* ✨ CONDITIONAL: Mobile Profile vs Login ✨ */}
            {isLoggedIn ? (
              <>
                <Link
                  to="/profile"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-orange-600 hover:bg-slate-50"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
                    {user?.username?.[0]?.toUpperCase() || "U"}
                  </div>
                  {user?.username || "Profile"}
                </Link>
                
                <button
                 
                  className="rounded-md px-3 py-2 text-left text-sm font-medium text-white hover:bg-red-50"
                >
                  Edit Profile
                </button>
                <button
                 
                  className="rounded-md px-3 py-2 text-left text-sm font-medium text-white hover:bg-red-50"
                >
                   Settings 
                </button>
              </>

            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="rounded-md px-3 py-2 text-sm font-medium text-blue-600"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setIsMenuOpen(false)}
                  className="rounded-lg bg-blue-600 px-4 py-2.5 text-center font-medium text-white hover:bg-blue-700"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;














// import React, { useState } from "react";
// import { Link, NavLink } from "react-router-dom";

// function Header() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   const navLinks = [
//     { name: "Home", path: "/" },
//     { name: "About", path: "/about" },
//     { name: "Contact", path: "/contact" },
    
//   ];

//   return (
//     <header className="sticky top-0 z-50 border-b bg-white shadow-sm">
//       <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

//         {/* Logo */}
//         <Link to="/" className="text-2xl font-bold">
//           <span className="text-blue-600">&lt;/&gt;</span>{" "}
//           <span className="text-slate-900">Dev</span>
//           <span className="text-blue-600">Market</span>
//         </Link>

//         {/* Desktop Navigation */}
//         <div className="hidden items-center gap-8 md:flex">
//           {navLinks.map((link) => (
//             <NavLink
//               key={link.path}
//               to={link.path}
//               className={({ isActive }) =>
//                 `relative py-2 text-sm font-medium transition ${
//                   isActive
//                     ? "text-blue-600 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-blue-600"
//                     : "text-slate-700 hover:text-blue-600"
//                 }`
//               }
//             >
//               {link.name}
//             </NavLink>
//           ))}
//         </div>

//         {/* Desktop Actions */}
//         <div className="hidden items-center gap-4 md:flex">

//           {/* Search */}
//           {/* <div className="flex items-center rounded-full bg-slate-100 px-2 py-2">
//             <span className="mr-2 text-slate-500">⌕</span>

//             <input
//               type="text"
//               placeholder="Search..."
//               className="w-28 bg-transparent text-sm outline-none placeholder:text-slate-500"
//             />
//           </div> */}

//           {/* Cart */}
//           <button className="relative text-xl text-slate-700 hover:text-blue-600">
//             🛒
//             <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 text-[10px] text-white">
//               2
//             </span>
//           </button>

//           {/* Notification */}
//           <button className="relative text-xl text-slate-700 hover:text-blue-600">
//             🔔
//             <span className="absolute right-0 top-0 h-2 w-2 rounded-full bg-red-500"></span>
//           </button>

//           {/* Divider */}
//           <div className="h-8 w-px bg-slate-200"></div>

//           {/* Login */}
//           <Link
//             to="/login"
//             className="font-medium text-blue-600 hover:text-blue-800"
//           >
//             Login
//           </Link>

//           {/* Signup */}
//           {/* <Link
//             to="/signup"
//             className="rounded-lg bg-blue-600 px-5 py-2.5 font-medium text-white transition hover:bg-blue-700"
//           >
//             Sign Up
//           </Link> */}
//         </div>    

//         {/* Mobile Menu Button */}
//         <button
//           onClick={() => setIsMenuOpen(!isMenuOpen)}
//           className="text-2xl text-slate-700 md:hidden"
//           aria-label="Toggle menu"
//           aria-expanded={isMenuOpen}
//         >
//           {isMenuOpen ? "✕" : "☰"}
//         </button>
//       </nav>

//       {/* Mobile Navigation */}
//       {isMenuOpen && (
//         <div className="border-t bg-white px-6 py-4 md:hidden">

//           <div className="flex flex-col gap-4">
//             {navLinks.map((link) => (
//               <NavLink
//                 key={link.path}
//                 to={link.path}
//                 onClick={() => setIsMenuOpen(false)}
//                 className={({ isActive }) =>
//                   `rounded-md px-3 py-2 text-sm font-medium ${
//                     isActive
//                       ? "bg-blue-50 text-blue-600"
//                       : "text-slate-700 hover:bg-slate-50"
//                   }`
//                 }
//               >
//                 {link.name}
//               </NavLink>
//             ))}

//             {/* Mobile Login */}
//             <Link
//               to="/login"
//               onClick={() => setIsMenuOpen(false)}
//               className="rounded-md px-3 py-2 text-sm font-medium text-blue-600"
//             >
//               Login
//             </Link>

//             {/* Mobile Signup */}
//             <Link
//               to="/signup"
//               onClick={() => setIsMenuOpen(false)}
//               className="rounded-lg bg-blue-600 px-4 py-2.5 text-center font-medium text-white hover:bg-blue-700"
//             >
//               Sign Up
//             </Link>
//           </div>

//         </div>
//       )}
//     </header>
//   );
// }

// export default Header;                                 