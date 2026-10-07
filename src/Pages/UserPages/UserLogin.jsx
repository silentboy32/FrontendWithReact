
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LoginUser, UserProfile } from "../../Store/UserAuth/UserAuth";
import { Link, NavLink } from "react-router-dom";
import { User, Lock } from "lucide-react";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";
import backgroundImage from "../../assets/Image-2026-10-06-23.04.13.jpeg"





function UserLogin() {


    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(true)
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null)
    
    useEffect(() => {
        const checkLogin = async () => {
            try {
                const res = await UserProfile();

                if (res.success) {

                    // Access token cookie is valid
                    navigate("/dashboard", { replace: true });
                }

            } catch (error) {
                // User is not logged in
            }
        };

        checkLogin();
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        setError("");

        try {
           
            const result = await LoginUser(username, password)

    
            const { success, data, message } = result;



            if (success) {
                toast.success("Login Successfully ");
                navigate("/profile", { replace: true });

            }



        } catch (error) {

            toast.error(error.response.data.message)
            setLoading(false); // <-- Add this so the user can try again
        } finally {
            setLoading(false)
        }



    };



    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-cover bg-center bg-no-repeat relative"
            style={{ backgroundImage: `url(${backgroundImage})` }
            }
        >
            <Toaster

                containerStyle={{
                    top: "80px",
                }}
            />


            {/* Dark overlay goes OUTSIDE the BorderAnimation */}
            <div className="absolute inset-0 bg-purple-900/40 mix-blend-multiply"></div>


            <div className="relative z-10 w-full max-w-md p-8 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl">
                <h2 className="text-4xl font-bold text-center text-white mb-8 drop-shadow-md">
                    Login
                </h2>

                {/* 4. Pass the function reference (NO parentheses!) */}
                <form className="space-y-5" onSubmit={handleSubmit}>

                    <div className="relative group">
                        <input
                            type="text"
                            id="username"
                            name="usernae"
                            placeholder="Username"
                            className="w-full bg-white/20 text-white placeholder-gray-200 rounded-full py-3 px-6 pr-12 outline-none focus:bg-white/30 transition-all border border-transparent focus:border-white/50"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <User className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 w-5 h-5" />
                    </div>

                    <div className="relative group">
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Password"
                            className="w-full bg-white/20 text-white placeholder-gray-200 rounded-full py-3 px-6 pr-12 outline-none focus:bg-white/30 transition-all border border-transparent focus:border-white/50"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Lock className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 w-5 h-5" />
                    </div>

                    <div className="flex items-center justify-between text-sm text-white/90 px-2">
                        <label className="flex items-center space-x-2 cursor-pointer select-none">
                            <input
                                type="checkbox"
                                className="w-4 h-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500 cursor-pointer accent-purple-500"
                            />
                            <span>Remember me</span>
                        </label>
                        <Link to="/forgot-password" className="hover:text-white transition-colors">
                            Forgot password?
                        </Link>
                    </div>

                    {/* Since we are handling form submission, we change this back to a type="submit" button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className={`
    w-full py-3 rounded-full font-bold text-purple-900 
    bg-white shadow-lg shadow-purple-900/30
    transition-all duration-300 ease-in-out
    hover:bg-purple-50 hover:shadow-xl hover:shadow-purple-900/40 hover:-translate-y-0.5
    active:translate-y-0 active:scale-[0.98]
    focus:outline-none focus:ring-2 focus:ring-white/70 focus:ring-offset-2 focus:ring-offset-purple-900/50
    disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-lg
  `}
                    >
                        {loading ? (
                            <span className="flex items-center justify-center gap-2">
                                {/* Simple CSS Spinner */}
                                <svg className="animate-spin h-5 w-5 text-purple-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Logging in...
                            </span>
                        ) : (
                            "Login"
                        )}
                    </button>

                    <div className="text-center text-sm text-white/90 mt-4">
                        Don't have an account?{' '}
                        <Link to="/signup" className="font-semibold hover:text-white underline decoration-2 underline-offset-2 transition-all">
                            Register
                        </Link>
                    </div>

                </form>
            </div>


        </div >
    )
};


export default UserLogin;