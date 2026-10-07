

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, UserCheck, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import backgroundImage from "../../assets/Image-2026-10-06-23.04.13.jpeg"






const SignupPage = () => {
  const navigate = useNavigate();
  const [confirmpasswd , setConfirmpasswd ] = useState("")
  // Form State
  const [formData, setFormData] = useState({
    fullname: '',
    username: '',
    email: '',
    password: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Handle Input Changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing again
    if (error) setError('');
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const { fullname, username, email, password } = formData;



    if (!fullname || !username || !email || !password || !confirmpasswd) {
      toast.error("Please Fill All Fields !!")
      setLoading(false);
      return;
    }

    if (password !== confirmpasswd) {
      toast.error("Password do not match !!")
      setLoading(false);
      return;
    }

    try {
      

      console.log('Signup Data:', formData);
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Fake delay
      
      navigate('/login', { replace: true });
      
    } catch (err) {
      
      toast.error(err.response.data.message)
      

    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="min-h-screen w-full flex items-center justify-center bg-cover bg-center bg-no-repeat relative py-10"
      style={{
        backgroundImage: ` url(${backgroundImage})`,
      }}
    >

    

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-purple-900/40 mix-blend-multiply"></div>

      {/* Signup Card */}
      <div className="relative z-10 w-full max-w-md p-8 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl">
        
        {/* Header */}
        <h2 className="text-4xl font-bold text-center text-white mb-8 drop-shadow-md">
          Sign Up
        </h2>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          
          {/* Full Name */}
          <div className="relative group">
            <input
              type="text"
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
              placeholder="Full Name"
              className="w-full bg-white/20 text-white placeholder-gray-200 rounded-full py-3 px-6 pr-12 outline-none focus:bg-white/30 transition-all border border-transparent focus:border-white/50"
            />
            <UserCheck className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 w-5 h-5" />
          </div>

          {/* Username */}
          <div className="relative group">
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Username"
              className="w-full bg-white/20 text-white placeholder-gray-200 rounded-full py-3 px-6 pr-12 outline-none focus:bg-white/30 transition-all border border-transparent focus:border-white/50"
            />
            <User className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 w-5 h-5" />
          </div>

          {/* Email */}
          <div className="relative group">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Address"
              className="w-full bg-white/20 text-white placeholder-gray-200 rounded-full py-3 px-6 pr-12 outline-none focus:bg-white/30 transition-all border border-transparent focus:border-white/50"
            />
            <Mail className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 w-5 h-5" />
          </div>

          {/* Password */}
          <div className="relative group">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full bg-white/20 text-white placeholder-gray-200 rounded-full py-3 px-6 pr-12 outline-none focus:bg-white/30 transition-all border border-transparent focus:border-white/50"
            />
            <Lock className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 w-5 h-5" />
          </div>

          {/* Confirm Password */}
          <div className="relative group">
            <input
              type="password"
              name="confirmpasswd"
              value={confirmpasswd}
              onChange={(e) => setConfirmpasswd(e.target.value )}
              placeholder="Confirm Password"
              className="w-full bg-white/20 text-white placeholder-gray-200 rounded-full py-3 px-6 pr-12 outline-none focus:bg-white/30 transition-all border border-transparent focus:border-white/50"
            />
            <Lock className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 w-5 h-5" />
          </div>

          {/* ✨ BEAUTIFUL ERROR MESSAGE ✨ */}
          {error && (
            <div className="flex items-center gap-2 p-3 rounded-xl bg-red-500/20 border border-red-400/50 backdrop-blur-sm text-red-100 text-sm animate-fade-in">
              <AlertCircle className="w-5 h-5 text-red-300 " />
              <span>{error}</span>
            </div>
          )}

          {/* Submit Button */}
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
              mt-2
            `}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5 text-purple-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating Account...
              </span>
            ) : (
              "Sign Up"
            )}
          </button>

          {/* Login Link */}
          <div className="text-center text-sm text-white/90 mt-4 pt-2">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold hover:text-white underline decoration-2 underline-offset-2 transition-all">
              Login
            </Link>
          </div>

        </form>
      </div>
    
    
    </div>
  );
};

export default SignupPage;












// import { useState } from "react";
// import { SignUp } from "../../Store/UserAuth/UserAuth";
// import { UserCheck , User, Mail, AlertCircle} from "lucide-react";
// import { Link, NavLink } from "react-router-dom";


// function Signup() {



//   const [loading, setLoading] = useState("")
//   const [message, setMessage] = useState("");
//   const [error, setError] = useState("")
//   const [confirmPassword, setconfirmPassword] = useState("")
//   const [formData, setFormData] = useState({
//     fullname: "",
//     email: "",
//     username: "",
//     password: ""
//   });

//   const handleChange = (e) => {

//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     setError("");
//     setMessage("");

//     // Check password
//     if (formData.password !== confirmPassword) {
//       setError("Passwords do not match.");
//       return;
//     }


//     try {

//       const result = await SignUp(formData);


//       if (result.success) {
//         setMessage(result.data);
//       }

//     } catch (error) {




//       setError(
//         error.response?.data?.message || "Something went wrong. Please try again."
//       );

//     } finally {
//       setLoading(false);
//     }
//   };

//   return (

//     // <div
//     //   className="min-h-screen w-full flex items-center justify-center bg-cover bg-center bg-no-repeat relative py-10"
//     //   style={{
//     //     backgroundImage: `url('https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=2094&auto=format&fit=crop')`,
//     //   }}
//     // >
//     //   {/* Dark Overlay */}
//     //   <div className="absolute inset-0 bg-purple-900/40 mix-blend-multiply"></div>

//     //   {/* Signup Card */}
//     //   <div className="relative z-10 w-full max-w-md p-8 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl">

//     //     {/* Header */}
//     //     <h2 className="text-4xl font-bold text-center text-white mb-8 drop-shadow-md">
//     //       Sign Up
//     //     </h2>

//     //     {/* Form */}
//     //     <form className="space-y-4" onSubmit={handleSubmit}>

//     //       {/* Full Name */}
//     //       <div className="relative group">
//     //         <input
//     //           type="text"
//     //           name="fullname"
//     //           value={formData.fullname}
//     //           onChange={handleChange}
//     //           placeholder="Full Name"
//     //           className="w-full bg-white/20 text-white placeholder-gray-200 rounded-full py-3 px-6 pr-12 outline-none focus:bg-white/30 transition-all border border-transparent focus:border-white/50"
//     //         />
//     //         <UserCheck className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 w-5 h-5" />
//     //       </div>

//     //       {/* Username */}
//     //       <div className="relative group">
//     //         <input
//     //           type="text"
//     //           name="username"
//     //           value={formData.username}
//     //           onChange={handleChange}
//     //           placeholder="Username"
//     //           className="w-full bg-white/20 text-white placeholder-gray-200 rounded-full py-3 px-6 pr-12 outline-none focus:bg-white/30 transition-all border border-transparent focus:border-white/50"
//     //         />
//     //         <User className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 w-5 h-5" />
//     //       </div>

//     //       {/* Email */}
//     //       <div className="relative group">
//     //         <input
//     //           type="email"
//     //           name="email"
//     //           value={formData.email}
//     //           onChange={handleChange}
//     //           placeholder="Email Address"
//     //           className="w-full bg-white/20 text-white placeholder-gray-200 rounded-full py-3 px-6 pr-12 outline-none focus:bg-white/30 transition-all border border-transparent focus:border-white/50"
//     //         />
//     //         <Mail className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 w-5 h-5" />
//     //       </div>

//     //       {/* Password */}
//     //       <div className="relative group">
//     //         <input
//     //           type="password"
//     //           name="password"
//     //           value={formData.password}
//     //           onChange={handleChange}
//     //           placeholder="Password"
//     //           className="w-full bg-white/20 text-white placeholder-gray-200 rounded-full py-3 px-6 pr-12 outline-none focus:bg-white/30 transition-all border border-transparent focus:border-white/50"
//     //         />
//     //         <Lock className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 w-5 h-5" />
//     //       </div>

//     //       {/* Confirm Password */}
//     //       <div className="relative group">
//     //         <input
//     //           type="password"
//     //           name="confirmPassword"
//     //           value={confirmPassword}
//     //           onChange={(e) => setconfirmPassword(e.target.value)}
//     //           placeholder="Confirm Password"
//     //           className="w-full bg-white/20 text-white placeholder-gray-200 rounded-full py-3 px-6 pr-12 outline-none focus:bg-white/30 transition-all border border-transparent focus:border-white/50"
//     //         />
//     //         <Lock className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 w-5 h-5" />
//     //       </div>

//     //       {/* ✨ BEAUTIFUL ERROR MESSAGE ✨ */}
//     //       {(
//     //         <div className="flex items-center gap-2 p-3 rounded-xl bg-red-500/20 border border-red-400/50 backdrop-blur-sm text-red-100 text-sm animate-fade-in">
//     //           <AlertCircle className="w-5 h-5 text-red-300 flex-shrink-0" />
//     //           <span>{error}</span>
//     //         </div>
//     //       )}

//     //       {/* Submit Button */}
//     //       <button
//     //         type="submit"
//     //         disabled={loading}
//     //         className={`
//     //           w-full py-3 rounded-full font-bold text-purple-900 
//     //           bg-white shadow-lg shadow-purple-900/30
//     //           transition-all duration-300 ease-in-out
//     //           hover:bg-purple-50 hover:shadow-xl hover:shadow-purple-900/40 hover:-translate-y-0.5
//     //           active:translate-y-0 active:scale-[0.98]
//     //           focus:outline-none focus:ring-2 focus:ring-white/70 focus:ring-offset-2 focus:ring-offset-purple-900/50
//     //           disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-lg
//     //           mt-2
//     //         `}
//     //       >
//     //         {(
//     //           <span className="flex items-center justify-center gap-2">
//     //             <svg className="animate-spin h-5 w-5 text-purple-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//     //               <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//     //               <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//     //             </svg>
//     //             Creating Account...
//     //           </span>
//     //         )
//     //         (
//     //           "Sign Up"
//     //         )}
//     //       </button>

//     //       {/* Login Link */}
//     //       <div className="text-center text-sm text-white/90 mt-4 pt-2">
//     //         Already have an account?{' '}
//     //         <Link to="/login" className="font-semibold hover:text-white underline decoration-2 underline-offset-2 transition-all">
//     //           Login
//     //         </Link>
//     //       </div>

//     //     </form>
//     //   </div>
//     // </div>

//     // <div className="flex min-h-screen items-center justify-center bg-slate-900 p-6  px-4 py-10">

//     //   <div className="w-full max-w-md rounded-2xl  bg-slate-900 p-6 px-4 shadow-sm">

//     //     {/* Heading */}
//     //     <div className="mb-8">
//     //       <h1 className="text-2xl font-bold text-blue-600">
//     //         Create an account
//     //       </h1>

//     //       <p className="mt-2 text-sm text-gray-400">
//     //         Join MarketPlace and get started today.
//     //       </p>

//     //       <h1 className="text-2xl text-red-500 font-bold ">{Error}</h1>
//     //       <h1 className="text-2xl text-red-500 font-bold ">{message}</h1>
//     //     </div>

//     //     {/* Form */}
//     //     <form onSubmit={handleSubmit} className="space-y-5">

//     //       <div>
//     //         <label className="mb-2 block text-sm font-bold text-orange-600">
//     //           Full Name
//     //         </label>

//     //         <input
//     //           type="text"
//     //           name="fullname"
//     //           value={formData.fullname}
//     //           onChange={handleChange}
//     //           placeholder="Enter your full name"
//     //           required
//     //           className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-700  bg-slate-900 text-green-500"
//     //         />
//     //       </div>

//     //       <div>
//     //         <label className="mb-2 block text-sm font-bold text-orange-600 ">
//     //           Email
//     //         </label>

//     //         <input
//     //           type="email"
//     //           name="email"
//     //           value={formData.email}
//     //           onChange={handleChange}
//     //           placeholder="Enter your email"
//     //           required
//     //           className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-700 bg-slate-900 text-green-600"
//     //         />
//     //       </div>

//     //       <div>
//     //         <label className="mb-2 block text-sm font-bold text-orange-600 ">
//     //           Username
//     //         </label>

//     //         <input
//     //           type="text"
//     //           name="username"
//     //           value={formData.username}
//     //           onChange={handleChange}
//     //           placeholder="Choose a username"
//     //           required
//     //           className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-700 bg-slate-900 text-green-600 "
//     //         />
//     //       </div>

//     //       <div>
//     //         <label className="mb-2 block text-sm font-bold text-orange-600 ">
//     //           Password
//     //         </label>

//     //         <input
//     //           type="password"
//     //           name="password"
//     //           value={formData.password}
//     //           onChange={handleChange}
//     //           placeholder="Create a password"
//     //           required
//     //           className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-700 bg-slate-900 text-pink-600"
//     //         />
//     //       </div>

//     //       <div>
//     //         <label className="mb-2 block text-sm font-bold text-orange-600 ">
//     //           Confirm Password
//     //         </label>

//     //         <input
//     //           type="password"
//     //           name="confirmPassword"
//     //           value={confirmPassword}
//     //           onChange={(e) => setconfirmPassword(e.target.value)}
//     //           placeholder="Confirm your password"
//     //           required
//     //           className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-700 bg-slate-900 text-pink-600"
//     //         />
//     //       </div>

//     //       <button
//     //         type="submit"
//     //         className="w-full rounded-lg bg-blue-600 py-3 font-medium text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
//     //       >
//     //         Create Account
//     //       </button>

//     //     </form>

//     //     {/* Login Link */}
//     //     <p className="mt-6 text-center text-sm text-gray-500">
//     //       Already have an account?{" "}
//     //       <a
//     //         href="/login"
//     //         className="font-medium text-blue-600 hover:text-blue-700"
//     //       >
//     //         Log in
//     //       </a>
//     //     </p>

//     //   </div>
//     // </div>
//   );
// }


// export default Signup