export const StarfieldBackground = () => {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Moving Starfield */}
        <div className="absolute inset-0 animate-starfield"></div>
  
        {/* Subtle Cosmic Glow */}
        <div className="absolute inset-0 bg-radial-gradient opacity-40 blur-3xl"></div>
  
        {/* Gradient Overlay for Depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-50"></div>
      </div>
    );
  };
  