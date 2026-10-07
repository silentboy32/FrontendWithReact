
import React, { useState } from 'react';
import { Search, X, SlidersHorizontal } from 'lucide-react';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(query);
    console.log('Searching for:', query);
  };

  const handleClear = () => {
    setQuery('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`
        relative w-full max-w-xl md:max-w-2xl lg:max-w-3xl mx-auto
        transition-all duration-300 ease-out
        ${isFocused ? 'scale-[1.02]' : 'scale-100'}
      `}
    >
      {/* Glow effect behind the bar when focused */}
      <div
        className={`
          absolute -inset-1 rounded-full blur-lg
          bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500
          transition-opacity duration-300
          ${isFocused ? 'opacity-50' : 'opacity-20'}
        `}
      ></div>

      {/* Search Bar Container — Gradient Background */}
      <div
        className={`
          relative flex items-center gap-1.5 sm:gap-2
          bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600
          rounded-full
          p-1.5 sm:p-2
          border border-white/20
          shadow-lg shadow-purple-900/30
          transition-all duration-300
          ${isFocused ? 'shadow-xl shadow-purple-500/40' : ''}
        `}
      >
        {/* Inner White Pill (holds the actual input) */}
        <div
          className="
            flex flex-1 items-center gap-1.5 sm:gap-2
            bg-white/95 backdrop-blur-md
            rounded-full
            pl-3 sm:pl-5 pr-1 sm:pr-2 py-1 sm:py-1.5
            min-w-0
          "
        >
          {/* Search Icon */}
          <Search
            style={{ flexShrink: 0 }}
            className={`
              w-4 h-4 sm:w-5 sm:h-5 transition-colors duration-300
              ${isFocused ? 'text-purple-500' : 'text-slate-400'}
            `}
          />

          {/* Input */}
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Search for anything..."
            className="
              flex-1 min-w-0 bg-transparent outline-none
              text-slate-800 placeholder:text-slate-400
              text-xs sm:text-sm md:text-base
              py-1.5 sm:py-2
            "
          />

          {/* Clear Button */}
          {query && (
            <button
              type="button"
              onClick={handleClear}
              style={{ flexShrink: 0 }}
              className="
                flex items-center justify-center
                w-6 h-6 sm:w-7 sm:h-7 rounded-full
                text-slate-400 hover:text-slate-700 hover:bg-slate-100
                transition-all
              "
              aria-label="Clear search"
            >
              <X className="w-3 h-3 sm:w-4 sm:h-4" />
            </button>
          )}

          {/* Divider (hidden on tiny screens) */}
          <div
            style={{ flexShrink: 0 }}
            className="hidden md:block h-5 sm:h-6 w-px bg-slate-200"
          ></div>

          {/* Filter Button (hidden on small screens) */}
          <button
            type="button"
            style={{ flexShrink: 0 }}
            className="
              hidden md:flex items-center gap-1.5
              px-2 sm:px-3 py-1 sm:py-1.5 rounded-full
              text-xs sm:text-sm font-medium text-slate-600
              hover:bg-slate-100 hover:text-slate-900
              transition-all
            "
          >
            <SlidersHorizontal className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>Filter</span>
          </button>
        </div>

        {/* Gradient Search Button */}
        <button
          type="submit"
          style={{ flexShrink: 0 }}
          className="
            flex items-center justify-center gap-2
            bg-white/15 backdrop-blur-md
            border border-white/30
            text-white text-xs sm:text-sm font-semibold
            px-3 sm:px-5 md:px-6 py-2 sm:py-2.5 rounded-full
            hover:bg-white/25 hover:-translate-y-0.5
            active:translate-y-0 active:scale-95
            transition-all duration-300
          "
        >
          <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:hidden" />
          <span className="hidden md:inline">Search</span>
        </button>
      </div>
    </form>
  );
};

export default SearchBar;