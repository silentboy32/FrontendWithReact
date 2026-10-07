

const BorderAnimation = ({ children, className = "" }) => {
  return (
    <div className={`relative z-10 ${className}`}>
      {/* Rotating Gradient Layer (behind the card) */}
      <div className="absolute rounded-2xl overflow-hidden">
        <div 
          className="absolute animate-spin-slow"
          style={{
            background: `conic-gradient(
              from 0deg,
              transparent 0deg,
              #a855f7 90deg,
              #ec4899 180deg,
              #8b5cf6 270deg,
              transparent 360deg
            )`,
          }}
        />
      </div>

      {/* Solid background to hide the center of the gradient */}
      <div className="absolute  rounded-2xl bg-purple-900/40 backdrop-blur-md" />

      {/* The actual card content */}
      <div className="relative rounded-2xl">
        {children}
      </div>
    </div>
  );
};

export default BorderAnimation;