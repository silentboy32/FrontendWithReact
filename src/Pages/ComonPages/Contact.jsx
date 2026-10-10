
import { useEffect, useState, useTransition } from "react";
import axios from "axios";
import { AllContact } from "../../Store/UserAuth/UserAuth";

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


    // // Error
    // if (error) {

    //     return (
    //         <div className="min-h-screen bg-[#1e252b] flex items-center justify-center">

    //             <p className="text-red-400">
    //                 {error}
    //             </p>

    //         </div>
    //     );

    // }


    return (

        <div className="min-h-screen bg-[#1e252b] px-4 sm:px-6 py-8 sm:py-10">
            <div className="mx-auto max-w-6xl">

                {/* Header */}
                <div className="mb-8 flex items-end justify-between">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-[#f1f5f6] tracking-tight">
                            People
                        </h1>
                        <p className="mt-1.5 text-sm text-[#aeb8bd]">
                            Find people on Marketplace
                        </p>
                    </div>

                    {users.length > 0 && (
                        <span className="hidden sm:inline-flex items-center gap-1.5 text-xs text-[#aeb8bd] bg-[#273038] border border-[#343d44] px-3 py-1.5 rounded-full">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                            {users.length} online
                        </span>
                    )}
                </div>

                {/* Users Grid */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {users.map((user) => (
                        <div
                            key={user._id}
                            className="
            group relative overflow-hidden
            rounded-2xl border border-[#343d44] bg-[#273038]
            p-5
            transition-all duration-300
            hover:border-[#5a39ed]/60 hover:bg-[#2b343c]
            hover:shadow-lg hover:shadow-[#5a39ed]/10
            hover:-translate-y-0.5
          "
                        >
                            {/* Subtle gradient glow on top */}
                            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#5a39ed]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                            {/* Avatar + Info */}
                            <div className="flex items-center gap-3.5 mb-5">
                                <div className="relative shrink-0">
                                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#5a39ed] to-[#8b5cf6] text-lg font-bold text-white shadow-lg shadow-[#5a39ed]/30">
                                        {getInitials(user.fullname)}
                                    </div>
                                    {user.isOnline && (
                                        <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-400 ring-2 ring-[#273038]" />
                                    )}
                                </div>

                                <div className="min-w-0 flex-1">
                                    <div className="flex items-center gap-1.5">
                                        <h2 className="truncate text-base font-semibold text-[#f1f5f6]">
                                            {user.fullname}
                                        </h2>
                                        {user.isVerified && (
                                            <svg className="w-4 h-4 text-[#5a39ed] shrink-0" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M12 2l2.4 1.8L17 3l1.5 2.6L21 6.5l-.6 3 2.1 2.5-2.1 2.5.6 3-2.5.9L17 21l-2.6-.8L12 22l-2.4-1.8L7 21l-1.5-2.6L3 17.5l.6-3L1.5 12l2.1-2.5-.6-3 2.5-.9L7 3l2.6.8L12 2z" />
                                                <path d="M9.5 12l2 2 3.5-3.5" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        )}
                                    </div>
                                    <p className="truncate text-sm text-[#9da9af]">
                                        @{user.username}
                                    </p>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex items-center gap-2">
                                <button
                                    className="
                flex-1 rounded-xl bg-gradient-to-r from-[#5a39ed] to-[#7c3aed]
                py-2.5 text-sm font-medium text-white
                shadow-md shadow-[#5a39ed]/30
                transition-all duration-200
                hover:shadow-lg hover:shadow-[#5a39ed]/40
                active:scale-[0.98]
              "
                                >
                                    View Profile
                                </button>

                                <button
                                    className="
                flex h-10 w-10 items-center justify-center rounded-xl
                bg-[#1e252b] border border-[#343d44]
                text-[#aeb8bd]
                transition-all duration-200
                hover:bg-[#343d44] hover:text-white hover:border-[#5a39ed]/50
                active:scale-95
              "
                                    aria-label="Message"
                                >
                                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Empty State */}
                {users.length === 0 && (
                    <div className="mt-16 text-center">
                        <div className="mx-auto w-16 h-16 rounded-full bg-[#273038] border border-[#343d44] flex items-center justify-center mb-4">
                            <svg className="w-7 h-7 text-[#5a39ed]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                                <circle cx="9" cy="7" r="4" />
                                <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                            </svg>
                        </div>
                        <p className="text-[#9da9af] text-sm">No people found</p>
                        <p className="text-[#6b767c] text-xs mt-1">Try adjusting your search</p>
                    </div>
                )}

            </div>
        </div>

    );
};

export default Contact;
