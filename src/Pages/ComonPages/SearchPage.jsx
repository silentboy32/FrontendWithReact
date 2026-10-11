
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Search, X, Send } from "lucide-react";
import toast from "react-hot-toast";
import { SearchUsers } from "../../Store/UserAuth/UserAuth";


const SearchPage = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      setIsSearching(true);
      try {
        const res = await SearchUsers(query.trim());


        if (res.success) {
          setResults(res.data.users);
        }

      } catch (err) {
        toast.error(err?.response?.data?.message || "Search failed");
      } finally {
        setIsSearching(false);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [query]);

  const handleClear = () => {
    setQuery("");
    setResults([]);
  };

  const GoToProfile = (data) => {
    navigate("/profile" , {state : { data } } )
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    setIsSearching(true);
    try {
      const res = await SearchUsers(query.trim());
      if (res.success) {
        setResults(res.data.users);
      }
    } catch {
      toast.error("Search failed");
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#121212] overflow-x-hidden">

      {/* ===== TOP SEARCH BAR ===== */}
      <div className="sticky top-0 z-20 bg-[#121212] border-b border-[#1f1f1f]">
        <div className="flex items-center gap-2 px-2 py-2.5 w-full">

          {/* Back arrow */}
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-full hover:bg-[#1f1f1f] text-white shrink-0"
            aria-label="Back"
          >
            <ArrowLeft className="w-5 h-5" strokeWidth={2.2} />
          </button>

          {/* Search pill */}
          <form
            onSubmit={handleSubmit}
            className="flex-1 min-w-0 flex items-center gap-2 bg-[#1f1f1f] rounded-full px-3 py-2"
          >
            <Search className="w-4 h-4 text-white/70 shrink-0" />

            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search"
              autoFocus
              enterKeyHint="search"
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="none"
              className="flex-1 min-w-0 bg-transparent text-white placeholder:text-white/50 text-sm outline-none"
            />

            {query && (
              <button
                type="button"
                onClick={handleClear}
                className="p-0.5 rounded-full hover:bg-white/10 text-white/70 shrink-0"
                aria-label="Clear"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </form>

          {/* Send */}
          <button
            onClick={handleSubmit}
            className="p-2 shrink-0 text-[#4f7cff] hover:opacity-80 active:opacity-60"
            aria-label="Submit search"
          >
            <Send className="w-5 h-5" strokeWidth={2.2} />
          </button>
        </div>
      </div>

      {/* ===== RESULTS AREA ===== */}
      <div className="px-2 py-3">

        {isSearching && (
          <div className="flex items-center justify-center py-10">
            <div className="w-5 h-5 border-2 border-white/20 border-t-[#4f7cff] rounded-full animate-spin" />
          </div>
        )}

        {!isSearching && results.length > 0 && (
          <div className="space-y-1">
            {results.map((user) => (
              <button
                key={user._id}
                onClick={() => GoToProfile(user)}
                className="w-full flex items-center gap-3 px-2 py-2.5 rounded-xl hover:bg-[#1f1f1f] active:bg-[#1f1f1f] transition text-left"
              >
                <div className="w-10 h-10 shrink-0 rounded-full border border-[#2a2a2a] bg-[#1a1a1a] flex items-center justify-center text-white/70">
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.username}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <Search className="w-4 h-4" />
                  )}
                </div>

                <span className="text-white text-sm font-medium truncate flex-1 min-w-0">
                  {user.username}
                </span>
              </button>
            ))}
          </div>
        )}

        {!isSearching && query.trim() && results.length === 0 && (
          <div className="text-center py-12">
            <p className="text-white/60 text-sm">No users found for "{query}"</p>
          </div>
        )}

        {!isSearching && !query.trim() && (
          <div className="text-center py-12">
            <p className="text-white/40 text-xs sm:text-sm">Search for people by username</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;