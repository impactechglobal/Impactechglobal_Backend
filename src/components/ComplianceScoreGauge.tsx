import { useState, useEffect } from "react";

interface ComplianceScoreGaugeProps {
  score: number;
  title?: string;
  className?: string;
}

export function ComplianceScoreGauge({ 
  score, 
  title = "Compliance Score", 
  className = "" 
}: ComplianceScoreGaugeProps) {
  const [animatedScore, setAnimatedScore] = useState(0);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedScore(score);
    }, 500);
    return () => clearTimeout(timer);
  }, [score]);

  const radius = 90;
  const strokeWidth = 12;
  const normalizedRadius = radius - strokeWidth * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDasharray = `${circumference} ${circumference}`;
  const strokeDashoffset = circumference - (animatedScore / 100) * circumference;

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-success";
    if (score >= 70) return "text-accent-yellow";
    if (score >= 50) return "text-warning";
    return "text-destructive";
  };

  const getGradientColor = (score: number) => {
    if (score >= 90) return "from-success to-success/70";
    if (score >= 70) return "from-accent-yellow to-accent-orange";
    if (score >= 50) return "from-warning to-warning/70";
    return "from-destructive to-destructive/70";
  };

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div className="relative w-48 h-48">
        <svg
          height={radius * 2}
          width={radius * 2}
          className="transform -rotate-90"
        >
          <defs>
            <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" className="stop-accent-orange" />
              <stop offset="100%" className="stop-accent-yellow" />
            </linearGradient>
          </defs>
          
          {/* Background circle */}
          <circle
            stroke="hsl(var(--border))"
            fill="transparent"
            strokeWidth={strokeWidth}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
          
          {/* Progress circle */}
          <circle
            stroke="url(#scoreGradient)"
            fill="transparent"
            strokeWidth={strokeWidth}
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            r={normalizedRadius}
            cx={radius}
            cy={radius}
            className="transition-all duration-1000 ease-out drop-shadow-lg"
            style={{
              filter: "drop-shadow(0 0 8px hsl(var(--accent-orange) / 0.4))"
            }}
          />
        </svg>
        
        {/* Score display */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`text-4xl font-bold ${getScoreColor(animatedScore)}`}>
            {Math.round(animatedScore)}%
          </span>
          <span className="text-sm text-muted-foreground font-medium mt-1">
            {title}
          </span>
        </div>
      </div>
      
      {/* Score description */}
      <div className="mt-4 text-center">
        <p className={`text-lg font-semibold bg-gradient-to-r ${getGradientColor(score)} bg-clip-text text-transparent`}>
          {score >= 90 ? "Excellent" : 
           score >= 70 ? "Good" : 
           score >= 50 ? "Needs Improvement" : "Critical"}
        </p>
      </div>
    </div>
  );
}