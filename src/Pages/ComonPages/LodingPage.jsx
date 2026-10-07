
import React from 'react';
import backgroundImage from "../../assets/Image-2026-10-06-23.04.13.jpeg"

const LoadingPage = ({ message = 'Loading...' }) => {
  return (
    <div
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat relative flex items-center justify-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* Dark Overlay — same as other pages */}
      <div className="fixed inset-0 bg-purple-900/50 mix-blend-multiply pointer-events-none"></div>
      <div className="fixed inset-0 bg-gradient-to-b from-transparent via-purple-950/30 to-purple-950/80 pointer-events-none"></div>

      {/* Centered Loader Card */}
      <div className="relative z-10 flex flex-col items-center gap-8 px-6">
        
        {/* Spinner with pulsing rings */}
        <div className="relative flex items-center justify-center w-32 h-32">
          
          {/* Outer pulse ring */}
          <span className="absolute inset-0 rounded-full border-2 border-purple-400/40 animate-ping"></span>

          {/* Middle pulse ring with delay */}
          <span
            className="absolute inset-3 rounded-full border-2 border-pink-400/40 animate-ping"
            style={{ animationDelay: '0.5s' }}
          ></span>

          {/* Rotating gradient spinner */}
          <span className="absolute inset-6 rounded-full border-4 border-transparent border-t-purple-400 border-r-pink-400 animate-spin"></span>

          {/* Center logo/dot */}
          <span className="relative flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 shadow-2xl shadow-purple-500/50">
            <span className="w-3 h-3 rounded-full bg-white animate-pulse"></span>
          </span>
        </div>

        {/* Loading Text */}
        <div className="text-center">
          <p className="text-white text-xl font-semibold tracking-wide drop-shadow-md">
            {message}
          </p>
          <div className="flex items-center justify-center gap-1 mt-3">
            <span
              className="w-1.5 h-1.5 rounded-full bg-white/70 animate-bounce"
              style={{ animationDelay: '0s' }}
            ></span>
            <span
              className="w-1.5 h-1.5 rounded-full bg-white/70 animate-bounce"
              style={{ animationDelay: '0.15s' }}
            ></span>
            <span
              className="w-1.5 h-1.5 rounded-full bg-white/70 animate-bounce"
              style={{ animationDelay: '0.3s' }}
            ></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingPage;