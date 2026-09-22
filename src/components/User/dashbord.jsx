import React from "react";
import { useLocation } from "react-router-dom";

function Dashboard() {
  const users = {
    name: "John Doe",
    username: "johndoe",
    email: "john@example.com",
    status: "Active",
    joined: "September 22, 2026",
  };


    const location = useLocation();
    const user = location.state || {};

  return (
    <div className="min-h-screen bg-gray-700 px-4 py-10">
      <div className="mx-auto max-w-3xl">

        {/* Heading */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold ">
            <span className="text-white">Dash</span>
            <span className="text-blue-700">board</span>
          </h1>

          <p className="mt-1 text-sm text-white">
            Manage your account information
          </p>
        </div>

        {/* User Card */}
        <div className="rounded-2xl border border-gray-200 bg-gray-300 shadow-sm">

          {/* Profile Header */}
          <div className="flex flex-col items-center border-b border-gray-100 px-6 py-8 sm:flex-row sm:gap-5 bg-blue-400 rounded-2xl">

            {/* Avatar */}
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-indigo-100 text-2xl font-bold text-indigo-600">
              JD
            </div>

            <div className="mt-4 text-center sm:mt-0 sm:text-left">
              <h2 className="text-3xl font-bold text-black">
                {user.username}
              </h2>

              <p className="text-sm text-pink-600">
                @{user.username}
              </p>

              <span className="mt-2 inline-block rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-600">
                {user.status || "active"}
              </span>
            </div>
          </div>

          {/* User Details */}
          <div className="px-6 py-6">

            <h3 className="mb-5 text-sm font-semibold text-gray-900">
              Account Information
            </h3>

            <div className="space-y-5">

              {/* Name */}
              <div>
                <p className="text-xs black">
                  Full Name
                </p>

                <p className="mt-1 text-sm font-medium text-gray-800">
                  {user.username}
                </p>
              </div>

              {/* Username */}
              <div>
                <p className="text-xs text-black">
                  Username
                </p>

                <p className="mt-1 text-sm font-medium text-gray-800">
                  @{user.username}
                </p>
              </div>

              {/* Email */}
              <div>
                <p className="text-xs text-black">
                  Email Address
                </p>

                <p className="mt-1 text-sm font-medium text-gray-800">
                  {user.email}
                </p>
              </div>

              {/* Joined */}
              <div>
                <p className="text-xs text-black">
                  Member Since
                </p>

                <p className="mt-1 text-sm font-medium text-gray-800">
                  {user.joined || "recently-added "}
                </p>
              </div>

            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-3 border-t border-gray-100 px-6 py-5 sm:flex-row">

            <button className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-700">
              Edit Profile
            </button>

            <button className="rounded-lg border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50">
              Change Password
            </button>

          </div>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;

// import { useLocation } from "react-router-dom";

// function Dashboard() {

//     const location = useLocation();
//     const user = location.state || {};

//     return (
//         <div className=" bg-gray-700 text-white text-center text-3xl  ">
//             <div className=" p-4 m-4 ">

//                 <h1>Welcome {user.username}</h1>
//                 <p>Email: {user.email}</p>
//                 <p>Full Name: {user.fullname}</p>
//             </div>
//         </div>
//     );

// }


// export default Dashboard