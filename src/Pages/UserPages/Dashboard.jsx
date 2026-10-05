import { useNavigate } from "react-router-dom";
import { ApiUrl } from "../../Services/Api";
import { UserProfile } from "../../Features/UserAuth/UserAuth";
import { useState, useEffect } from "react";

function Dashboard() {
  const navigate = useNavigate();


  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  useEffect(() => {


    const fetchUser = async () => {
      try {

       
        const result = await UserProfile();

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

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center text-slate-300">
        Plese Login First
      </div>
    );
  }

  
  return (
    <div className="min-h-screen bg-slate-900 p-6 text-slate-100 sm:p-10">

      <div className="mx-auto max-w-5xl">

        {/* Header */}
        <div className="flex items-center justify-between">

          <div>
            <h1 className="text-2xl font-bold">
              Dashboard
            </h1>

            <p className="mt-1 text-slate-400">
              <span className=" text-blue-600 font-bold text-2xl">Welcome Back </span>
            
              <span className=" text-orange-600 font-bold text-2xl">{ user.username}</span>
            </p>
          </div>

          <div className="flex gap-3">

            <button
              onClick={() => navigate("/profile")}
              className="rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-sm font-medium hover:bg-slate-700"
            >
              Profile
            </button>



          </div>
        </div>

        {/* Welcome */}
        <div className="mt-8 rounded-xl border border-slate-800 bg-slate-800 p-6">
          <h2 className="text-xl font-semibold">
            Welcome to your marketplace
          </h2>

          <p className="mt-2 text-slate-400">
            Manage your items, requests, and conversations from here.
          </p>
        </div>

        {/* Actions */}
        <div className="mt-6 grid gap-4 sm:grid-cols-3">

          <button
            onClick={() => navigate("/my-items")}
            className="rounded-xl border border-slate-800 bg-slate-800 p-6 text-left hover:bg-slate-750"
          >
            <h3 className="font-semibold">
              My Items
            </h3>

            <p className="mt-2 text-sm text-slate-400">
              View and manage your uploaded items.
            </p>
          </button>

          <button
            onClick={() => navigate("/requests")}
            className="rounded-xl border border-slate-800 bg-slate-800 p-6 text-left hover:bg-slate-750"
          >
            <h3 className="font-semibold">
              Requests
            </h3>

            <p className="mt-2 text-sm text-slate-400">
              Manage requests from buyers.
            </p>
          </button>

          <button
            onClick={() => navigate("/messages")}
            className="rounded-xl border border-slate-800 bg-slate-800 p-6 text-left hover:bg-slate-750"
          >
            <h3 className="font-semibold">
              Messages
            </h3>

            <p className="mt-2 text-sm text-slate-400">
              Chat with marketplace users.
            </p>
          </button>

        </div>

        {/* Add Item */}
        <button
          onClick={() => navigate("/add-item")}
          className="mt-6 rounded-lg bg-indigo-500 px-5 py-3 text-sm font-medium text-white hover:bg-indigo-600"
        >
          + Add New Item
        </button>

      </div>
    </div>
  );
}

export default Dashboard;