

import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Mail, Calendar, MapPin, Link as LinkIcon,
  Pencil, MessageCircle, UserPlus, CheckCircle,
  Settings, Camera,
} from "lucide-react";
import backgroundImage from "../../assets/Image-2026-10-06-23.04.13.jpeg";
import { UserProfile } from "../../Store/UserAuth/UserAuth";
import toast from "react-hot-toast";
import LoadingPage from "../ComonPages/LoadingPage";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const res = await UserProfile();
        if (res.success) setUser(res.data);
      } catch (err) {
        toast.error(err?.response?.data?.message || "Something went wrong");
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  if (isLoading) return <LoadingPage message="Profile Loading" />;

  const u = {
    username: user?.username || "Dk Barman",
    fullname: user?.fullname || "Dev Kumar Barman",
    email: user?.email || "dk@butterfly.dev",
    bio: user?.bio || "Full-stack developer crafting beautiful, fast web experiences.",
    location: user?.location || "Kolkata, India",
    website: user?.website || "dkbarman.dev",
    joined: user?.joined || "March 2024",
    followers: user?.followers ?? 1240,
    following: user?.following ?? 342,
    projects: user?.projects ?? 47,
  };

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center relative"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="fixed inset-0 bg-purple-900/50 mix-blend-multiply pointer-events-none" />
      <div className="fixed inset-0 bg-gradient-to-b from-transparent via-purple-950/30 to-purple-950/80 pointer-events-none" />

      <div className="relative z-10 max-w-3xl mx-auto px-4 py-6 md:py-10">

        {/* ===== PROFILE CARD ===== */}
        <div className="rounded-2xl overflow-hidden bg-white/10 backdrop-blur-md border border-white/20 shadow-xl">

          {/* Cover */}
          <div className="relative h-28 md:h-40 bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-700">
            <div className="absolute inset-0 bg-gradient-to-t from-purple-950/70 to-transparent" />
            <button className="absolute top-3 right-3 p-2 rounded-full bg-white/15 border border-white/25 text-white hover:bg-white/25 transition">
              <Camera className="w-4 h-4" />
            </button>
          </div>

          <div className="px-5 pb-5">
            {/* Avatar + Action buttons */}
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 -mt-12 sm:-mt-16 mb-4">
              <div className="relative w-fit">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 border-slate-950 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-xl">
                  <span className="text-3xl sm:text-4xl font-bold text-white">
                    {u.username[0].toUpperCase()}
                  </span>
                </div>
                <span className="absolute bottom-1.5 right-1.5 w-4 h-4 rounded-full bg-emerald-400 ring-4 ring-slate-950" />
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <button
                  onClick={() => setIsFollowing(!isFollowing)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition ${
                    isFollowing
                      ? "bg-white/15 text-white border border-white/25"
                      : "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md shadow-purple-500/40"
                  }`}
                >
                  {isFollowing ? <CheckCircle className="w-4 h-4" /> : <UserPlus className="w-4 h-4" />}
                  {isFollowing ? "Following" : "Follow"}
                </button>

                <button
                  onClick={() => navigate("/chatpage")}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/15 border border-white/25 text-white text-xs sm:text-sm font-semibold hover:bg-white/25 transition"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span className="hidden sm:inline">Message</span>
                </button>

                <Link
                  to="/profile/edit"
                  className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/15 border border-white/25 text-white text-xs sm:text-sm font-semibold hover:bg-white/25 transition"
                >
                  <Pencil className="w-4 h-4" />
                  <span className="hidden sm:inline">Edit</span>
                </Link>

                <button className="p-2 rounded-full bg-white/15 border border-white/25 text-white hover:bg-white/25 transition">
                  <Settings className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Name + Username */}
            <div className="mb-4">
              <h1 className="text-xl sm:text-2xl font-bold text-white">{u.fullname}</h1>
              <p className="text-slate-300 text-sm">@{u.username}</p>
            </div>

            {/* Bio */}
            <p className="text-slate-200 text-sm leading-relaxed mb-5">{u.bio}</p>

            {/* Info - 2 columns on mobile, 4 on desktop */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-5">
              <Info icon={Mail} label={u.email} />
              <Info icon={MapPin} label={u.location} />
              <Info icon={LinkIcon} label={u.website} />
              <Info icon={Calendar} label={u.joined} />
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-2">
              <Stat value={u.followers} label="Followers" />
              <Stat value={u.following} label="Following" />
              <Stat value={u.projects} label="Projects" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ===== TINY HELPERS ===== */

const Info = ({ icon: Icon, label }) => (
  <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10 min-w-0">
    <Icon className="w-3.5 h-3.5 text-purple-300 shrink-0" />
    <span className="text-xs text-slate-200 truncate">{label}</span>
  </div>
);

const Stat = ({ value, label }) => (
  <div className="text-center px-2 py-2.5 rounded-lg bg-white/5 border border-white/10">
    <p className="text-lg sm:text-xl font-bold text-white">{value}</p>
    <p className="text-[10px] sm:text-xs text-slate-400">{label}</p>
  </div>
);

export default Profile;