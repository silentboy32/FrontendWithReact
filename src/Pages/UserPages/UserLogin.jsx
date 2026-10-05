
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginUser, UserProfile } from "../../Features/UserAuth/UserAuth";
import { Link, NavLink } from "react-router-dom";



function UserLogin() {


    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(true)
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        setError("");




        try {

            const result = await LoginUser(username, password)

            const { success, data, message } = result;



            if (success) {

                navigate("/dashboard", { replace: true });

            }



        } catch (error) {
            setError("Wrong Credentials !! Please Enter Right Credentials.")
        }


    };



    return (


        <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-900 p-6  px-4 py-8 sm:px-8">

            {/* Background decoration
            <div className="pointer-events-none absolute -bottom-32 -right-24 h-80 w-80 rounded-full bg-[#c81c06]" /> */}

            {/* Main Card */}
            <div className="relative z-10 w-full max-w-5xl overflow-hidden rounded-2xl border border-[#e8edf6] bg-slate-600 shadow-[0_10px_40px_rgba(40,70,130,0.04)]">

                <div className="mx-auto w-full max-w-2xl px-6 py-12 sm:px-12 sm:py-16 md:px-16 md:py-20">

                    {/* Logo */}
                    <div className="mb-16 flex items-center gap-4">
                        <svg
                            width="88"
                            height="52"
                            viewBox="0 0 88 52"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            aria-hidden="true"
                        >
                            <path
                                d="M5 39L25 5C28 0 35 0 38 5L57 39C60 44 56 50 50 50H12C5 50 1 45 5 39Z"
                                fill="#4F46E5"
                                opacity="0.48"
                            />
                            <path
                                d="M27 39L47 5C50 0 57 0 60 5L79 39C82 44 78 50 72 50H34C27 50 23 45 27 39Z"
                                fill="#4338E8"
                            />
                            <path
                                d="M5 39L25 5C28 0 35 0 38 5L57 39C60 44 56 50 50 50H44L25 17L12 39C10 42 10 46 13 50H12C5 50 1 45 5 39Z"
                                fill="#6366F1"
                            />
                        </svg>

                        <span className="text-3xl font-bold tracking-tight text-[#111827]">
                            <span className="font-bold text-black ">Maket</span>
                            <span className="font-bold text-blue-800 ">Place</span>
                        </span>
                    </div>

                    {/* Heading */}
                    <div className="mb-12">
                        <h1 className="mb-3 text-4xl font-bold tracking-tight text-orange-600 sm:text-5xl">
                            Login
                        </h1>

                        <p className="text-base leading-7 text-gray-300 sm:text-xl">
                            Enter your email and password to sign in.
                        </p>
                        <br />
                        <h1 className="text-red-600 text-2xl  font-bold">{error}</h1>
                    </div>

                    {/* Login Form */}
                    <form onSubmit={handleSubmit} className="space-y-10">

                        {/* Email / Username */}
                        <div>
                            <label
                                htmlFor="username"
                                className="mb-4 block text-base font-medium text-[#eb6314] sm:text-lg"
                            >
                                Email or Username
                            </label>

                            <div className="flex h-[76px] items-center gap-5 rounded-xl border-2 border-[#e5e9f2] px-6 transition focus-within:border-indigo-500 focus-within:ring-4 focus-within:ring-indigo-500/10">
                                <svg
                                    className="h-7 w-7 shrink-0 text-[#64748b]"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.8"
                                    aria-hidden="true"
                                >
                                    <rect x="3" y="5" width="18" height="14" rx="1.5" />
                                    <path d="m4 7 8 6 8-6" />
                                </svg>

                                <input
                                    id="username"
                                    name="username"
                                    type="text"
                                    autoComplete="username"
                                    placeholder="Enter your email or username"
                                    required
                                    className="h-full w-full min-w-0 bg-transparent text-base text-[#16991a] outline-none placeholder:text-[#9aa3b4] sm:text-lg"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label
                                htmlFor="password"
                                className="mb-4 block text-base font-medium text-[#e1551a] sm:text-lg"
                            >
                                Password
                            </label>

                            <div className="flex h-[76px] items-center gap-5 rounded-xl border-2 border-[#e5e9f2] px-6 transition focus-within:border-indigo-500 focus-within:ring-4 focus-within:ring-indigo-500/10">
                                <svg
                                    className="h-7 w-7 shrink-0 text-[#64748b]"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.8"
                                    aria-hidden="true"
                                >
                                    <rect x="3" y="10" width="18" height="12" rx="1.5" />
                                    <path d="M7 10V7a5 5 0 0 1 10 0v3" />
                                </svg>

                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    autoComplete="current-password"
                                    placeholder="Enter your password"
                                    required
                                    className="h-full w-full min-w-0 bg-transparent text-base text-[#17b414] outline-none placeholder:text-[#9aa3b4] sm:text-lg"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />

                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    aria-label={
                                        showPassword ? "Hide password" : "Show password"
                                    }
                                    className="shrink-0 text-[#64748b] transition hover:text-indigo-600"
                                >
                                    {showPassword ? (
                                        <svg
                                            className="h-6 w-6"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="1.8"
                                            aria-hidden="true"
                                        >
                                            <path d="M3 3l18 18" />
                                            <path d="M10.6 10.6a2 2 0 0 0 2.8 2.8" />
                                            <path d="M9.9 5.2A11 11 0 0 1 12 5c5 0 8.5 4.5 9.5 7-.4 1-1.2 2.2-2.3 3.3" />
                                            <path d="M6.2 6.2C3.9 7.7 2.5 10 2 12c1 2.5 4.5 7 10 7 1 0 2-.2 2.9-.5" />
                                        </svg>
                                    ) : (
                                        <svg
                                            className="h-6 w-6"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="1.8"
                                            aria-hidden="true"
                                        >
                                            <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
                                            <circle cx="12" cy="12" r="3" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Remember me / Forgot password */}
                        <div className="flex flex-wrap items-center justify-between gap-4">
                            <label className="flex cursor-pointer items-center gap-4">
                                <input
                                    type="checkbox"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                    className="h-7 w-7 cursor-pointer appearance-none rounded-md border border-[#d7deeb] bg-white checked:border-indigo-600 checked:bg-indigo-600 checked:bg-[url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 16 16%22 fill=%22none%22%3E%3Cpath d=%22m3 8 3 3 7-7%22 stroke=%22white%22 stroke-width=%222%22 stroke-linecap=%22round%22 stroke-linejoin=%22round%22/%3E%3C/svg%3E')] checked:bg-center checked:bg-no-repeat"
                                />

                                <span className="text-base text-[#f0f3f8] sm:text-lg">
                                    Remember me
                                </span>
                            </label>

                            <a
                                href="/forgot-password"
                                className="text-base font-medium text-[#4775e8] transition hover:text-indigo-700 sm:text-lg"
                            >
                                Forgot password?
                            </a>
                        </div>

                        {/* Login Button */}
                        <button
                            type="submit"
                            className="flex h-[76px] w-full items-center justify-center gap-5 rounded-xl bg-gradient-to-r from-[#4263eb] to-[#345eea] text-lg font-medium text-white shadow-sm transition hover:from-[#3455db] hover:to-[#284bd1] focus:outline-none focus:ring-4 focus:ring-indigo-500/20 active:scale-[0.99]"
                        >
                            Login

                            <svg
                                className="h-6 w-6"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.8"
                                aria-hidden="true"
                            >
                                <path d="M5 12h14" />
                                <path d="m13 6 6 6-6 6" />
                            </svg>
                        </button>

                    </form>

                    {/* Divider */}
                    <div className="my-12 flex items-center gap-6">
                        <div className="h-px flex-1 bg-[#e2e7f0]" />
                        <span className="text-base text-[#7b8497]">or</span>
                        <div className="h-px flex-1 bg-[#e2e7f0]" />
                    </div>

                    {/* Google Login */}
                    <button
                        type="button"
                        onClick={() => {
                            // Connect Google OAuth here
                        }}
                        className="flex h-[76px] w-full items-center justify-center gap-5 rounded-xl border-2 border-[#e5e9f2] bg-white text-base font-medium text-[#273449] transition hover:bg-gray-50 sm:text-lg"
                    >
                        <svg
                            className="h-7 w-7 shrink-0"
                            viewBox="0 0 48 48"
                            aria-hidden="true"
                        >
                            <path
                                fill="#EA4335"
                                d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5Z"
                                transform="translate(0 5)"
                            />
                            <path
                                fill="#4285F4"
                                d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.71 7.18l7.62 5.91c4.45-4.1 7.13-10.14 7.13-17.56Z"
                            />
                            <path
                                fill="#FBBC05"
                                d="M10.53 28.59a14.4 14.4 0 0 1 0-9.18l-7.98-6.19a23.93 23.93 0 0 0 0 21.56l7.98-6.19Z"
                                transform="translate(0 5)"
                            />
                            <path
                                fill="#34A853"
                                d="M24 48c6.48 0 11.93-2.13 15.9-5.89l-7.62-5.91c-2.12 1.42-4.85 2.26-8.28 2.26-6.26 0-11.57-4.22-13.46-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48Z"
                                transform="translate(0 -5)"
                            />
                        </svg>

                        Continue with Google
                    </button>

                    {/* Sign Up */}
                    <p className="mt-14 text-center text-base text-[#7b8497] sm:text-lg">
                        Don't have an account?{" "}
                        <a
                            href="/signup"
                            className="ml-2 font-medium text-[#4775e8] transition hover:text-indigo-700"
                        >
                            Sign up
                        </a>
                    </p>

                </div>
            </div>
        </div>
    );
}



export default UserLogin;