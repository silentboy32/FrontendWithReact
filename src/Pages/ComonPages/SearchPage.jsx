
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Search, X, Send } from "lucide-react";
import toast from "react-hot-toast";

const SearchPage = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();

  // Debounced search — fires 400ms after the user stops typing
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      setIsSearching(true);
      try {
        const res = await SearchUsers(query.trim());
        if (res.success) setResults(res.data);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    setIsSearching(true);
    try {
      const res = await SearchUsers(query.trim());
      if (res.success) setResults(res.data);
    } catch (err) {
      toast.error("Search failed");
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#121212]">

      {/* ===== TOP SEARCH BAR ===== */}
      <div className="sticky top-0 z-20 bg-[#121212] px-3 py-3 flex items-center gap-3 border-b border-[#1f1f1f]">

        {/* Back arrow */}
        <button
          onClick={() => navigate(-1)}
          className="p-1.5 rounded-full hover:bg-[#1f1f1f] text-white transition shrink-0"
          aria-label="Back"
        >
          <ArrowLeft className="w-6 h-6" strokeWidth={2} />
        </button>

        {/* Search input pill */}
        <form
          onSubmit={handleSubmit}
          className="flex-1 flex items-center gap-2 bg-[#1f1f1f] rounded-full px-4 py-2.5"
        >
          <Search className="w-5 h-5 text-white/70 shrink-0" />

          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search"
            autoFocus
            className="flex-1 min-w-0 bg-transparent text-white placeholder:text-white/50 text-base outline-none"
          />

          {query && (
            <button
              type="button"
              onClick={handleClear}
              className="p-0.5 rounded-full hover:bg-white/10 text-white/70 transition shrink-0"
              aria-label="Clear"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </form>

        {/* Send / submit button */}
        <button
          onClick={handleSubmit}
          className="p-1.5 shrink-0 text-[#4f7cff] hover:opacity-80 transition"
          aria-label="Submit search"
        >
          <Send className="w-6 h-6" strokeWidth={2} />
        </button>
      </div>

      {/* ===== RESULTS AREA ===== */}
      <div className="px-3 py-4">

        {/* Loading */}
        {isSearching && (
          <div className="flex items-center justify-center py-10">
            <div className="w-6 h-6 border-2 border-white/20 border-t-[#4f7cff] rounded-full animate-spin" />
          </div>
        )}

        {/* Results list */}
        {!isSearching && results.length > 0 && (
          <div className="space-y-1">
            {results.map((user) => (
              <button
                key={user._id}
                onClick={() => navigate(`/profile/${user._id}`)}
                className="w-full flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-[#1f1f1f] transition text-left"
              >
                {/* Avatar — icon style like the screenshot */}
                <div className="w-11 h-11 shrink-0 rounded-full border border-[#2a2a2a] bg-[#1a1a1a] flex items-center justify-center text-white/70">
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.username}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <Search className="w-5 h-5" />
                  )}
                </div>

                {/* Username */}
                <span className="text-white text-base font-medium truncate">
                  {user.username}
                </span>
              </button>
            ))}
          </div>
        )}

        {/* Empty state */}
        {!isSearching && query.trim() && results.length === 0 && (
          <div className="text-center py-12">
            <p className="text-white/60 text-sm">No users found for "{query}"</p>
          </div>
        )}

        {/* Idle state (nothing typed yet) */}
        {!isSearching && !query.trim() && (
          <div className="text-center py-12">
            <p className="text-white/40 text-sm">Search for people by username</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;