

export const DottedLine = ({ dashLength = 20, color = '#888888',size= 1, className = '' }) => {
  const lineStyle = {
    backgroundImage: `linear-gradient(to right, ${color} 50%, transparent 50%)`,
    backgroundSize: `${dashLength}px ${size}px`,
    backgroundRepeat: 'repeat-x'
  };

  return (
    <div 
      className={`w-full h-0.5 ${className}`}
      style={lineStyle}
    />
  );
};


export const DottedBorder = ({ 
  dashLength = 20,
  gapLength = 10,
  color = '#888888', 
  size = 1,
  borderRadius = 0,
  className = '',
  children 
}) => {
  const totalLength = dashLength + gapLength;
  
  // For rounded corners, we need to use a different approach
  if (borderRadius > 0) {
    return (
      <div className={`relative ${className}`}>
        {/* Create SVG for proper rounded dotted border */}
        <svg 
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ borderRadius: `${borderRadius}px` }}
        >
          <rect
            x={size / 2}
            y={size / 2}
            width={`calc(100% - ${size}px)`}
            height={`calc(100% - ${size}px)`}
            rx={Math.max(0, borderRadius - size / 2)}
            ry={Math.max(0, borderRadius - size / 2)}
            fill="none"
            stroke={color}
            strokeWidth={size}
            strokeDasharray={`${dashLength} ${gapLength}`}
            strokeLinecap="round"
          />
        </svg>
        
        <div 
          className="w-full h-full relative z-10" 
          style={{ 
            padding: `${size + 2}px`,
            borderRadius: `${borderRadius}px`
          }}
        >
          {children}
        </div>
      </div>
    );
  }
}



