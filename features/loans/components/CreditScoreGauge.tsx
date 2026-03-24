"use client";

import { motion } from "framer-motion";

interface CreditScoreGaugeProps {
  score: number;
}

export function CreditScoreGauge({ score }: CreditScoreGaugeProps) {
  const radius = 70;
  const stroke = 10;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const arcPercentage = 0.75; // 3/4 circle
  const arcLength = circumference * arcPercentage;
  const strokeDashoffset = arcLength - (score / 100) * arcLength;

  const getColor = (s: number) => {
    if (s >= 70) return "#2d6a4f"; // Primary (Green)
    if (s >= 40) return "#f4a261"; // Accent (Orange)
    return "#ef4444"; // Red
  };

  const getStatus = (s: number) => {
    if (s >= 70) return "Excellent";
    if (s >= 40) return "Good";
    return "Poor";
  };

  return (
    <div className="relative flex flex-col items-center justify-center p-5 bg-white rounded-[24px] shadow-sm border-2 border-border/50">
      <div className="relative h-40 w-40 flex items-center justify-center">
        <svg
          height={radius * 2}
          width={radius * 2}
          className="transform -rotate-[225deg]"
        >
          <circle
            stroke="#f1f5f9"
            fill="transparent"
            strokeWidth={stroke}
            strokeDasharray={`${arcLength} ${circumference}`}
            strokeLinecap="round"
            style={{ strokeDashoffset: 0 }}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
          <motion.circle
            stroke={getColor(score)}
            fill="transparent"
            strokeWidth={stroke}
            strokeDasharray={`${arcLength} ${circumference}`}
            strokeLinecap="round"
            initial={{ strokeDashoffset: arcLength }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center pt-2">
          <motion.span 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-3xl font-black text-foreground"
          >
            {score}
          </motion.span>
          <span className="text-[10px] font-black text-muted uppercase tracking-[0.2em]">Score</span>
        </div>
      </div>

      <div className="mt-2 flex flex-col items-center">
        <div 
          className="px-4 py-1 rounded-full text-[9px] font-black uppercase tracking-widest text-white mb-2 shadow-sm"
          style={{ backgroundColor: getColor(score) }}
        >
          {getStatus(score)}
        </div>
        <p className="text-[10px] text-center font-bold text-muted/60 max-w-[180px] leading-relaxed">
          Based on transaction history & liquidity history.
        </p>
      </div>
    </div>
  );
}
