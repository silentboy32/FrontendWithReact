import React from "react";
import { Link } from "react-router-dom";

function Footer() {
    return (
        <footer className="relative bg-slate-950 text-slate-300">
            {/* Top Gradient Border */}
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-80" />

            {/* Main Footer */}
            <div className="mx-auto grid max-w-7xl gap-8 px-4 pt-10 pb-8 sm:px-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
                
                {/* Brand Section */}
                <div>
                    <Link to="/" className="flex items-center gap-1.5 text-xl font-bold group w-fit">
                        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform">
                            <span className="text-white text-xs font-bold">&lt;/&gt;</span>
                        </div>
                        <span className="text-white">Dev</span>
                        <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Market</span>
                    </Link>

                    <p className="mt-4 max-w-xs text-xs sm:text-sm leading-5 text-slate-400">
                        Discover, connect, and grow with DevMarket.
                        Your marketplace for digital products and services.
                    </p>

                    {/* Social Links */}
                    <div className="mt-5 flex gap-2">
                        {['GitHub', 'Twitter', 'LinkedIn'].map((social) => (
                            <a 
                                key={social}
                                href={social === 'GitHub' ? '/github' : '#'} 
                                className="px-3 py-1.5 rounded-md bg-slate-900 border border-slate-800 text-[11px] font-medium text-slate-400 hover:text-white hover:border-slate-600 hover:bg-slate-800 transition-all"
                            >
                                {social}
                            </a>
                        ))}
                    </div>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-sm font-semibold text-white tracking-wide">
                        Quick Links
                    </h3>
                    <ul className="mt-4 space-y-2.5 text-xs sm:text-sm">
                        {[
                            { name: "Home", path: "/" },
                            { name: "Products", path: "/" },
                            { name: "About Us", path: "/about" },
                            { name: "Contact", path: "/contact" },
                            { name: "GamePlay", path: "/GamePlay" }
                        ].map((link) => (
                            <li key={link.name}>
                                <Link 
                                    to={link.path} 
                                    className="inline-block text-slate-400 hover:text-blue-400 hover:translate-x-1 transition-all duration-200"
                                >
                                    {link.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Support */}
                <div>
                    <h3 className="text-sm font-semibold text-white tracking-wide">
                        Support
                    </h3>
                    <ul className="mt-4 space-y-2.5 text-xs sm:text-sm">
                        {[
                            { name: "Help Center", path: "/help" },
                            { name: "Privacy Policy", path: "/privacy" },
                            { name: "Terms & Conditions", path: "/terms" },
                            { name: "FAQ", path: "/faq" }
                        ].map((link) => (
                            <li key={link.name}>
                                <Link 
                                    to={link.path} 
                                    className="inline-block text-slate-400 hover:text-purple-400 hover:translate-x-1 transition-all duration-200"
                                >
                                    {link.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Newsletter */}
                <div>
                    <h3 className="text-sm font-semibold text-white tracking-wide">
                        Stay Updated
                    </h3>
                    <p className="mt-4 text-xs sm:text-sm text-slate-400">
                        Subscribe to our newsletter for updates.
                    </p>

                    <form className="mt-4 flex flex-col gap-2.5">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            required
                            className="w-full rounded-xl border border-slate-800 bg-slate-900 px-4 py-2.5 text-xs sm:text-sm text-white outline-none placeholder:text-slate-500 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all"
                        />
                        <button
                            type="submit"
                            className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-md shadow-purple-500/20 hover:shadow-lg hover:shadow-purple-500/40 hover:-translate-y-0.5 transition-all duration-200"
                        >
                            Subscribe
                        </button>
                    </form>
                </div>

            </div>

            {/* Bottom Footer */}
            <div className="border-t border-slate-800/60">
                <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-5 text-xs sm:text-sm text-slate-500 sm:flex-row sm:px-6">
                    <p>© {new Date().getFullYear()} DevMarket. All rights reserved.</p>
                    <div className="flex gap-5">
                        <Link to="/privacy" className="hover:text-slate-300 transition-colors">Privacy</Link>
                        <Link to="/terms" className="hover:text-slate-300 transition-colors">Terms</Link>
                    </div>
                </div>
            </div>

        </footer>
    );
}

export default Footer;