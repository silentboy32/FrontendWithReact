
import ButterflyIcon from "./ButterflyIcon";

import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Bell, MessageCircle, ChevronDown, User, Settings, Pencil, LogOut, Search } from "lucide-react";
import { UserProfile, UserLogOut } from "../../../Store/UserAuth/UserAuth";
import toast from "react-hot-toast";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const res = await UserProfile();
        if (res.success) {
          setUser(res.data);
          setIsLoggedIn(true);
        }
      } catch (error) {
        setIsLoggedIn(false);
      }
    };
    checkLogin();
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      const response = await UserLogOut();
      if (response.success) {
        toast.success("User LogOut Successfully");
        navigate("/login");
      }
    } catch (error) {
      toast.error("failed to logout user");
    }
  };

  return (
    <header className="sticky top-0 z-50">
      <div className="bg-slate-950/95 backdrop-blur-md border-b border-slate-800/80 shadow-lg shadow-black/30">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 md:px-6 py-3 md:py-4">

          {/* ================= LOGO ================= */}
          <Link to="/" className="flex items-center gap-2 group flex-shrink-0">
            <div className="relative">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/40 group-hover:scale-110 transition-transform duration-300">
                <span className="text-white font-bold text-sm"><ButterflyIcon size={40} /></span>
              </div>
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 blur-md opacity-40 group-hover:opacity-70 transition-opacity"></div>
            </div>
            <span className="text-xl md:text-2xl font-bold tracking-tight">
              <span className="text-white">Butter</span>
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">fly</span>
            </span>
          </Link>

          {/* ================= DESKTOP ACTIONS ================= */}
          <div className="hidden md:flex items-center gap-4">

            {/* Search */}
            <button
              onClick={() => navigate("/searchpage")}
              className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/70 transition-all duration-200 group"
              aria-label="Search"
            >
              <Search className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </button>

            {/* Notification */}
            <button
              className="relative p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/70 transition-all duration-200 group"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-slate-950"></span>
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500 animate-ping"></span>
            </button>

            {/* Chat */}
            <button
              onClick={() => navigate("/chatpage")}
              className="relative p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/70 transition-all duration-200 group"
              aria-label="Chats"
            >
              <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="absolute -top-0.5 -right-0.5 h-4 w-4 flex items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-[10px] font-bold text-white shadow-md shadow-blue-500/50">
                2
              </span>
            </button>

            {/* Divider */}
            <div className="h-6 w-px bg-gradient-to-b from-transparent via-slate-700 to-transparent"></div>

            {/* Profile / Login */}
            {isLoggedIn ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsProfileOpen((p) => !p)}
                  className={`flex items-center gap-2 rounded-full pl-1 pr-3 py-1 transition-all duration-200 ${
                    isProfileOpen
                      ? "bg-slate-800 ring-2 ring-blue-500/40"
                      : "bg-slate-800/60 hover:bg-slate-800 ring-1 ring-slate-700"
                  }`}
                >
                  <div className="relative">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-xs font-bold text-white shadow-md shadow-blue-500/40">
                      {user?.username?.[0]?.toUpperCase() || "U"}
                    </div>
                    <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-400 ring-2 ring-slate-900"></span>
                  </div>
                  <span className="text-sm font-medium text-slate-100 max-w-[100px] truncate">
                    {user?.username || "Profile"}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${
                      isProfileOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Dropdown */}
                {isProfileOpen && (
                  <div className="absolute right-0 mt-3 w-64 origin-top-right rounded-2xl bg-slate-900/95 backdrop-blur-xl border border-slate-700/80 shadow-2xl shadow-black/50 overflow-hidden animate-dropdown">
                    <div className="h-[2px] bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>

                    <div className="px-4 py-3.5 border-b border-slate-800">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-sm font-bold text-white shadow-lg shadow-blue-500/40">
                            {user?.username?.[0]?.toUpperCase() || "U"}
                          </div>
                          <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-emerald-400 ring-2 ring-slate-900"></span>
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-white truncate">
                            {user?.username || "User"}
                          </p>
                          <p className="text-xs text-slate-400 truncate">
                            {user?.email || "user@example.com"}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="p-2">
                      <Link
                        to="/profile"
                        onClick={() => setIsProfileOpen(false)}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-slate-200 hover:bg-slate-800/80 hover:text-white transition-all group"
                      >
                        <div className="w-8 h-8 rounded-lg bg-blue-500/15 border border-blue-500/30 flex items-center justify-center group-hover:bg-blue-500/25 transition">
                          <User className="w-4 h-4 text-blue-400" />
                        </div>
                        <span className="font-medium">Profile</span>
                      </Link>

                      <Link
                        to="/profile/edit"
                        onClick={() => setIsProfileOpen(false)}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-slate-200 hover:bg-slate-800/80 hover:text-white transition-all group"
                      >
                        <div className="w-8 h-8 rounded-lg bg-purple-500/15 border border-purple-500/30 flex items-center justify-center group-hover:bg-purple-500/25 transition">
                          <Pencil className="w-4 h-4 text-purple-400" />
                        </div>
                        <span className="font-medium">Edit Profile</span>
                      </Link>

                      <Link
                        to="/settings"
                        onClick={() => setIsProfileOpen(false)}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-slate-200 hover:bg-slate-800/80 hover:text-white transition-all group"
                      >
                        <div className="w-8 h-8 rounded-lg bg-amber-500/15 border border-amber-500/30 flex items-center justify-center group-hover:bg-amber-500/25 transition">
                          <Settings className="w-4 h-4 text-amber-400" />
                        </div>
                        <span className="font-medium">Settings</span>
                      </Link>
                    </div>

                    <div className="p-2 border-t border-slate-800">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all group"
                      >
                        <div className="w-8 h-8 rounded-lg bg-red-500/15 border border-red-500/30 flex items-center justify-center group-hover:bg-red-500/25 transition">
                          <LogOut className="w-4 h-4 text-red-400" />
                        </div>
                        <span className="font-medium">Logout</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="relative group px-5 py-2 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-purple-500/40 hover:-translate-y-0.5 transition-all duration-200 overflow-hidden"
              >
                <span className="relative z-10">Login</span>
                <span className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity"></span>
              </Link>
            )}
          </div>

          {/* ================= MOBILE ACTIONS (search + menu) ================= */}
          <div className="flex items-center gap-1 md:hidden">
            {/* Search */}
            <button
              onClick={() => navigate("/searchpage")}
              className="p-2 rounded-lg text-slate-200 hover:bg-slate-800 transition"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Menu toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="relative p-2 rounded-lg text-slate-200 hover:bg-slate-800 transition"
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>

        </nav>
      </div>

      {/* ================= MOBILE MENU ================= */}
      {isMenuOpen && (
        <div className="md:hidden bg-slate-950/98 backdrop-blur-xl border-b border-slate-800 shadow-2xl shadow-black/50 animate-dropdown">
          <div className="px-4 py-4 space-y-2">

            {/* Notifications + Chats */}
            <div className="grid grid-cols-2 gap-2">
              <button className="relative flex items-center justify-center gap-2 px-3 py-3 rounded-xl text-sm font-medium text-slate-200 bg-slate-800/50 border border-slate-700/60 hover:bg-slate-800 transition">
                <Bell className="w-4 h-4" />
                Notifications
                <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500"></span>
              </button>
              <Link
                to="/chatpage"
                onClick={() => setIsMenuOpen(false)}
                className="relative flex items-center justify-center gap-2 px-3 py-3 rounded-xl text-sm font-medium text-slate-200 bg-slate-800/50 border border-slate-700/60 hover:bg-slate-800 transition"
              >
                <MessageCircle className="w-4 h-4" />
                Chats
                <span className="absolute top-1.5 right-3 h-4 w-4 flex items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-[10px] font-bold text-white">
                  2
                </span>
              </Link>
            </div>

            <div className="h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent my-3"></div>

            {/* Profile / Login */}
            {isLoggedIn ? (
              <div className="space-y-1.5">
                <Link
                  to="/profile"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-3 rounded-xl p-3 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 hover:border-blue-500/40 transition"
                >
                  <div className="relative">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-sm font-bold text-white shadow-lg shadow-blue-500/40">
                      {user?.username?.[0]?.toUpperCase() || "U"}
                    </div>
                    <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-emerald-400 ring-2 ring-slate-950"></span>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-sm font-semibold text-white truncate">
                      {user?.username || "Profile"}
                    </span>
                    <span className="text-xs text-slate-400 truncate">
                      {user?.email || "user@example.com"}
                    </span>
                  </div>
                </Link>

                <Link
                  to="/profile/edit"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-200 hover:bg-slate-800/70 transition"
                >
                  <div className="w-8 h-8 rounded-lg bg-purple-500/15 border border-purple-500/30 flex items-center justify-center">
                    <Pencil className="w-4 h-4 text-purple-400" />
                  </div>
                  Edit Profile
                </Link>

                <Link
                  to="/settings"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-200 hover:bg-slate-800/70 transition"
                >
                  <div className="w-8 h-8 rounded-lg bg-amber-500/15 border border-amber-500/30 flex items-center justify-center">
                    <Settings className="w-4 h-4 text-amber-400" />
                  </div>
                  Settings
                </Link>

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-red-400 hover:bg-red-500/10 transition"
                >
                  <div className="w-8 h-8 rounded-lg bg-red-500/15 border border-red-500/30 flex items-center justify-center">
                    <LogOut className="w-4 h-4 text-red-400" />
                  </div>
                  Logout
                </button>
              </div>
            ) : (
              <div className="space-y-2 pt-1">
                <Link
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="block rounded-xl px-4 py-3 text-sm font-medium text-center text-white bg-slate-800/60 border border-slate-700 hover:bg-slate-800 transition"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setIsMenuOpen(false)}
                  className="block rounded-xl px-4 py-3 text-center font-semibold text-white bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-purple-500/40 transition"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
