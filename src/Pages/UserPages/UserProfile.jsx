
import { useNavigate } from "react-router-dom";
import { UserProfile } from "../../Features/UserAuth/LoginAuth";
import { useState, useEffect } from "react";

function Profile() {
    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    useEffect(() => {

        const fetchUser = async () => {
            try {

                const token = localStorage.getItem("accessToken");

                if (!token) {
                    setError("Please log in first.");
                    return;
                }
                const result = await UserProfile(token);

                setUser(result.data)
                // Adjust this according to your API response.



            } catch (err) {
                setError("Unable to load user details.");

            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);


    if (loading) {
        return (
            <div className="min-h-screen bg-slate-900 flex items-center justify-center text-slate-300">
                Loading profile...
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-slate-900 flex items-center justify-center text-slate-300">
                Please Login First
            </div>
        );
    }


    const handleLogout = () => {
        localStorage.removeItem("accessToken");
        navigate("/login", { replace: true });
    };

    return (
        <div className="min-h-screen bg-slate-900 p-6 text-slate-100 sm:p-10">

            <div className="mx-auto max-w-2xl">

                {/* Top */}
                <div className="mb-6 flex items-center justify-between">

                    <button
                        onClick={() => navigate("/dashboard")}
                        className="text-sm text-slate-400 hover:text-white"
                    >
                        ← Dashboard
                    </button>

                    <button
                        onClick={handleLogout}
                        className="rounded-lg bg-red-500/10 px-4 py-2 text-sm font-medium text-red-400 hover:bg-red-500/20"
                    >
                        Logout
                    </button>

                </div>

                {/* Profile Card */}
                <div className="rounded-xl border border-slate-800 bg-slate-800 p-6 sm:p-8">

                    {/* Profile Header */}
                    <div className="flex items-center gap-4 border-b border-slate-700 pb-6">

                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-700 text-xl font-semibold">
                            <div>
                                {user?.username
                                    ?.trim()
                                    .split(/\s+/)
                                    .map(word => word[0])
                                    .join("")
                                    .slice(0, 2)
                                    .toUpperCase()}
                            </div>

                        </div>

                        <div>
                            <h1 className="text-xl font-bold">
                                {user.fullname}
                            </h1>

                            <p className="text-sm text-slate-400">
                                {user.username}
                            </p>
                        </div>

                    </div>

                    {/* User Details */}
                    <div className="mt-6 space-y-5">

                        <div>
                            <p className="text-sm text-slate-400">
                                Full Name
                            </p>

                            <p className="mt-1 font-medium">
                                {user.fullname}
                            </p>
                        </div>

                        <div>
                            <p className="text-sm text-slate-400">
                                Username
                            </p>

                            <p className="mt-1 font-medium">
                                {user.username}
                            </p>
                        </div>

                        <div>
                            <p className="text-sm text-slate-400">
                                Email
                            </p>

                            <p className="mt-1 font-medium">
                                {user.email}
                            </p>
                        </div>

                    </div>

                    <button
                        onClick={() => navigate("/profile/edit")}
                        className="mt-8 rounded-lg bg-indigo-500 px-5 py-3 text-sm font-medium text-white hover:bg-indigo-600"
                    >
                        Edit Profile
                    </button>

                </div>

            </div>
        </div>
    );
}

export default Profile;