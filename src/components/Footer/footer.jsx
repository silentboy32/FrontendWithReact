
import React from "react";
import { Link } from "react-router-dom";

function Footer() {
    return (
        <footer className="bg-slate-900 text-slate-300">

            {/* Main Footer */}
            <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 sm:grid-cols-2 lg:grid-cols-4">

                {/* Brand Section */}
                <div>
                    <Link to="/" className="text-2xl font-bold">
                        <span className="text-blue-500">&lt;/&gt;</span>{" "}
                        <span className="text-white">Dev</span>
                        <span className="text-blue-500">Market</span>
                    </Link>

                    <p className="mt-4 max-w-xs text-sm leading-6 text-slate-400">
                        Discover, connect, and grow with DevMarket.
                        Your marketplace for digital products and services.
                    </p>

                    {/* Social Links */}
                    <div className="mt-6 flex gap-4">
                        <a
                            href="/github"
                            className="transition hover:text-blue-400"
                            aria-label="GitHub"
                        >
                            GitHub
                        </a>

                        <a
                            href="#"
                            className="transition hover:text-blue-400"
                            aria-label="Twitter"
                        >
                            Twitter
                        </a>

                        <a
                            href="#"
                            className="transition hover:text-blue-400"
                            aria-label="LinkedIn"
                        >
                            LinkedIn
                        </a>
                    </div>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-lg font-semibold text-white">
                        Quick Links
                    </h3>

                    <ul className="mt-5 space-y-3 text-sm">
                        <li>
                            <Link to="/" className="hover:text-blue-400">
                                Home
                            </Link>
                        </li>

                        <li>
                            <Link to="/products" className="hover:text-blue-400">
                                Products
                            </Link>
                        </li>

                        <li>
                            <Link to="/about" className="hover:text-blue-400">
                                About Us
                            </Link>
                        </li>

                        <li>
                            <Link to="/contact" className="hover:text-blue-400">
                                Contact
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Support */}
                <div>
                    <h3 className="text-lg font-semibold text-white">
                        Support
                    </h3>

                    <ul className="mt-5 space-y-3 text-sm">
                        <li>
                            <Link to="/help" className="hover:text-blue-400">
                                Help Center
                            </Link>
                        </li>

                        <li>
                            <Link to="/privacy" className="hover:text-blue-400">
                                Privacy Policy
                            </Link>
                        </li>

                        <li>
                            <Link to="/terms" className="hover:text-blue-400">
                                Terms & Conditions
                            </Link>
                        </li>

                        <li>
                            <Link to="/faq" className="hover:text-blue-400">
                                FAQ
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Newsletter */}
                <div>
                    <h3 className="text-lg font-semibold text-white">
                        Stay Updated
                    </h3>

                    <p className="mt-4 text-sm text-slate-400">
                        Subscribe to our newsletter for the latest updates.
                    </p>

                    <form className="mt-5 flex flex-col gap-3">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            required
                            className="rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-blue-500"
                        />

                        <button
                            type="submit"
                            className="rounded-lg bg-blue-600 px-4 py-3 text-sm font-medium text-white transition hover:bg-blue-700"
                        >
                            Subscribe
                        </button>
                    </form>
                </div>

            </div>

            {/* Bottom Footer */}
            <div className="border-t border-slate-800">

                <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-6 text-sm text-slate-400 sm:flex-row">

                    <p>
                        © {new Date().getFullYear()} DevMarket. All rights reserved.
                    </p>

                    <div className="flex gap-5">
                        <Link
                            to="/privacy"
                            className="hover:text-blue-400"
                        >
                            Privacy
                        </Link>

                        <Link
                            to="/terms"
                            className="hover:text-blue-400"
                        >
                            Terms
                        </Link>
                    </div>

                </div>

            </div>

        </footer>
    );
}

export default Footer;                                                              
