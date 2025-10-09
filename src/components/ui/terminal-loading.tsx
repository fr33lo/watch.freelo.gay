"use client";
import React, { useState, useEffect } from "react";

interface TerminalLoadingProps {
  text?: string;
  className?: string;
}

export default function TerminalLoading({ 
  text = "Loading", 
  className = "" 
}: TerminalLoadingProps) {
  const [dots, setDots] = useState("");
  const [frame, setFrame] = useState(0);

  const spinnerFrames = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => {
        if (prev.length >= 3) {
          return "";
        }
        return prev + ".";
      });
      setFrame(prev => (prev + 1) % spinnerFrames.length);
    }, 300);

    return () => clearInterval(interval);
  }, [spinnerFrames.length]);

  return (
    <div className={`font-terminal text-terminal-accent ${className}`}>
      <div className="flex items-center gap-2">
        <span className="text-terminal-accent-bright text-lg">
          {spinnerFrames[frame]}
        </span>
        <span>
          {text}{dots.padEnd(3, " ")}
        </span>
      </div>
      <div className="mt-2 text-xs text-terminal-text">
        Please wait while we fetch your content...
      </div>
    </div>
  );
}