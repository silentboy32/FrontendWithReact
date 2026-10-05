
import { useEffect, useState, useTransition } from "react";
import axios from "axios";
import { AllContact } from "../../Features/UserAuth/UserAuth";

const Contact = () => {

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    // Get all users from backend
    const getUsers = async () => {

        try {

            const response = await AllContact();
            
            if (response.success) {

                setUsers(response.data.filteredUsers);
                
            }  
            
         
        } catch (error) {

            console.log("Error:", error);

            setError("Unable to load users.");

        } finally {

            setLoading(false);

        }
    };


    // Run when page opens
    useEffect(() => {
        getUsers();
    }, []);


    // Create initials
    const getInitials = (name) => {

        return name
            .trim()
            .split(/\s+/)
            .map((word) => word[0])
            .join("")
            .slice(0, 2)
            .toUpperCase();

    };


    // Loading
    if (loading) {

        return (
            <div className="min-h-screen bg-[#1e252b] flex items-center justify-center">

                <p className="text-[#aeb8bd]">
                    Loading people...
                </p>

            </div>
        );

    }


    // Error
    if (error) {

        return (
            <div className="min-h-screen bg-[#1e252b] flex items-center justify-center">

                <p className="text-red-400">
                    {error}
                </p>

            </div>
        );

    }


    return (

        <div className="min-h-screen bg-[#1e252b] px-6 py-10">

            <div className="mx-auto max-w-5xl">

                {/* Header */}

                <div className="mb-8">

                    <h1 className="text-3xl font-bold text-[#f1f5f6]">
                        People
                    </h1>

                    <p className="mt-2 text-[#aeb8bd]">
                        Find people on Marketplace
                    </p>

                </div>


                {/* Users */}

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">

                    {users.map((user) => (

                        <div
                            key={user._id}
                            className="rounded-2xl border border-[#343d44] bg-[#273038] p-6"
                        >

                            <div className="flex items-center gap-4">

                                {/* Avatar */}

                                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#5a39ed] text-lg font-bold text-white">

                                    {getInitials(user.fullname)}

                                </div>


                                {/* User information */}

                                <div className="min-w-0">

                                    <h2 className="truncate text-lg font-semibold text-[#f1f5f6]">
                                        {user.fullname}
                                    </h2>

                                    <p className="truncate text-sm text-[#9da9af]">
                                        @{user.username}
                                    </p>

                                </div>

                            </div>


                            {/* Button */}

                            <button
                                className="mt-6 w-full rounded-xl bg-[#2b76d7] py-3 text-sm font-medium text-white transition hover:bg-[#426a66]"
                            >
                                View Profile
                            </button>

                        </div>

                    ))}

                </div>


                {/* No users */}

                {users.length === 0 && (

                    <div className="mt-10 text-center">

                        <p className="text-[#9da9af]">
                            No people found.
                        </p>

                    </div>

                )}

            </div>

        </div>

    );
};

export default Contact;
