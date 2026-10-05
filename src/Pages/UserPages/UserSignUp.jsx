
import { useState } from "react";
import { SignUp } from "../../Features/UserAuth/UserAuth";




function Signup() {



  const [loading, setLoading] = useState("")
  const [message, setMessage] = useState("");
  const [Error, setError] = useState("")
  const [confirmPassword, setconfirmPassword] = useState("")
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    username: "",
    password: ""
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setMessage("");

    // Check password
    if (formData.password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }


    try {

      const result = await SignUp(formData);


      if (result.success) {
        setMessage(result.data);
      }

    } catch (error) {




      setError(
        error.response?.data?.message || "Something went wrong. Please try again."
      );

    } finally {
      setLoading(false);
    }
  };

  return (

    <div className="flex min-h-screen items-center justify-center bg-slate-900 p-6  px-4 py-10">

      <div className="w-full max-w-md rounded-2xl border border-gray-500 bg-slate-700 p-6 px-4 shadow-sm">

        {/* Heading */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-blue-600">
            Create an account
          </h1>

          <p className="mt-2 text-sm text-gray-400">
            Join MarketPlace and get started today.
          </p>

          <h1 className="text-2xl text-red-500 font-bold ">{Error}</h1>
          <h1 className="text-2xl text-red-500 font-bold ">{message}</h1>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="mb-2 block text-sm font-bold text-orange-600">
              Full Name
            </label>

            <input
              type="text"
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
              className="w-full rounded-lg border border-gray-600 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-700  bg-slate-700 text-green-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-bold text-orange-600 ">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-700 bg-slate-700 text-green-600"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-bold text-orange-600 ">
              Username
            </label>

            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Choose a username"
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-700 bg-slate-700 text-green-600 "
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-bold text-orange-600 ">
              Password
            </label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password"
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-700 bg-slate-700 text-pink-600"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-bold text-orange-600 ">
              Confirm Password
            </label>

            <input
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setconfirmPassword(e.target.value)}
              placeholder="Confirm your password"
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-700 bg-slate-700 text-pink-600"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 py-3 font-medium text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Create Account
          </button>

        </form>

        {/* Login Link */}
        <p className="mt-6 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <a
            href="/login"
            className="font-medium text-blue-600 hover:text-blue-700"
          >
            Log in
          </a>
        </p>

      </div>
    </div>
  );
}


export default Signup