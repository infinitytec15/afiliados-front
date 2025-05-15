"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface CountdownTimerProps {
  deadline: Date;
  compact?: boolean;
}

export default function CountdownTimer({
  deadline,
  compact = false,
}: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +deadline - +new Date();

      if (difference > 0) {
        setTimeLeft({
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [deadline]);

  if (compact) {
    return (
      <span className="font-medium">
        {timeLeft.hours.toString().padStart(2, "0")}:
        {timeLeft.minutes.toString().padStart(2, "0")}:
        {timeLeft.seconds.toString().padStart(2, "0")}
      </span>
    );
  }

  return (
    <div className="flex items-center space-x-2">
      {["hours", "minutes", "seconds"].map((unit) => (
        <div key={unit} className="flex items-center">
          <div className="relative">
            <motion.div
              key={timeLeft[unit as keyof typeof timeLeft]}
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 10, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="bg-card border border-border rounded px-2 py-1 min-w-[2.5rem] text-center"
            >
              <span className="font-mono font-medium">
                {timeLeft[unit as keyof typeof timeLeft]
                  .toString()
                  .padStart(2, "0")}
              </span>
            </motion.div>
          </div>

          {unit !== "seconds" && (
            <span className="text-muted-foreground">:</span>
          )}
        </div>
      ))}
    </div>
  );
}
