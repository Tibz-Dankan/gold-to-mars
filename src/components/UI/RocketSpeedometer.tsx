import { motion } from "framer-motion";
import React from "react";

type SpeedometerProps = {
  speed: number;
  maxSpeed?: number;
};

export const RocketSpeedometer: React.FC<SpeedometerProps> = ({
  speed,
  maxSpeed = 200,
}) => {
  const clampedSpeed = Math.min(Math.max(speed, 0), maxSpeed);
  const rotation = (-90 + (clampedSpeed / maxSpeed) * 180).toFixed(2);

  return (
    <div className="relative w-48 h-15 flex items-center justify-center bg-violet-400s">
      {/* Gauge Circle */}
      <svg viewBox="0 0 200 100" className="absolute w-full h-15">
        <path
          d="M10,100 A90,90 0 0,1 190,100"
          fill="none"
          stroke=" #adb5bd"
          strokeWidth="8"
        />
      </svg>
      {/* Needle */}
      <motion.div
        className="absolute origin-bottom w-1  h-16s h-10 bg-red-400 z-10"
        style={{ bottom: "0px" }}
        animate={{ rotate: `${rotation}deg` }}
        transition={{ type: "spring", stiffness: 100, damping: 10 }}
      />
      <label className="absolute bottom-4 text-[12px] text-gray-400 font-light">
        Meter
      </label>
      <div className="absolute w-4 h-4 bg-slate-700 rounded-full -bottom-2" />
    </div>
  );
};
