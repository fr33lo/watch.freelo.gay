"use client";
import React from "react";

type MarqueeProps = {
  children: React.ReactNode;
  className?: string;
  speed?: number;
};

export default function Marquee({ children, className, speed = 12 }: MarqueeProps) {
  return (
    <div
      className={`whitespace-nowrap overflow-hidden relative font-terminal ${className}`}
    >
      <div
        className="inline-block relative will-change-transform"
        style={{
          animation: `marquee ${speed}s linear infinite`,
        }}
      >
        {children}
      </div>
      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
      `}</style>
    </div>
  );
}