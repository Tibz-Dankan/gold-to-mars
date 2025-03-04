import { useState, useRef, useEffect } from "react";
import { EventBus } from "../../game/EventBus";

export const RocketAccelerator: React.FC = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(0); // Position in percentage

  const handleDrag = (e: React.MouseEvent | React.TouchEvent) => {
    if (!trackRef.current) return;

    const track = trackRef.current;
    const trackRect = track.getBoundingClientRect();

    let clientX = 0;
    if ("touches" in e) {
      clientX = e.touches[0].clientX;
    } else {
      clientX = e.clientX;
    }

    let newPosition = ((clientX - trackRect.left) / trackRect.width) * 100;
    newPosition = Math.max(0, Math.min(100, newPosition)); // Clamp between 0 and 100

    EventBus.emit("acceleration", { acceleration: newPosition });
    setPosition(() => newPosition);
  };

  useEffect(() => {
    const handleTakeOff = ({ takeOff }: { takeOff: boolean }) => {
      if (takeOff) {
        let start = position;
        let end = 100;
        let duration = 500;
        let startTime = performance.now();

        const animate = (currentTime: number) => {
          let elapsed = currentTime - startTime;
          let progress = Math.min(elapsed / duration, 1); // Ensure it doesn't exceed 100%

          let newPosition = start + (end - start) * progress;
          setPosition(newPosition);
          EventBus.emit("acceleration", { acceleration: newPosition });

          if (progress < 1) {
            requestAnimationFrame(animate);
          }
        };

        requestAnimationFrame(animate);
      } else {
        setPosition(0);
        EventBus.emit("acceleration", { acceleration: 0 });
      }
    };

    EventBus.on("takeOff", handleTakeOff);
    return () => {
      EventBus.off("takeOff", handleTakeOff);
    };
  }, [position]);

  return (
    <div className="w-full flex justify-center py-8 bg-slate-700/60 rounded-lgs rounded-sms px-4">
      <div
        ref={trackRef}
        className="relative w-40s w-36 h-4 bg-gray-400"
        onMouseDown={(e) => handleDrag(e)}
        onTouchStart={(e) => handleDrag(e)}
        onMouseMove={(e) => e.buttons === 1 && handleDrag(e)}
        onTouchMove={(e) => handleDrag(e)}
      >
        {/* Accelerator label */}
        <label className="absolute -top-8 left-0 text-gray-300 text-[12px] font-light">
          Accelerator
        </label>
        {/* Accelerator knob */}
        <div
          className="absolute w-6 h-5 bg-blue-500 rounded-sm top-1/2 -translate-y-1/2 cursor-pointer transition-all duration-500"
          style={{ left: `${position}%`, transform: "translate(-50%, -50%)" }}
        />
        {/* Accelerator Stats */}
        <div className="absolute -bottom-6 left-0 text-gray-300 text-[10px] flex items-center justify-between gap-2 w-full">
          <span className="text-[12px]s text-gray-300">MIN</span>
          <span className="text-[12px]s text-gray-300">
            {position.toFixed(2)}%
          </span>
          <span className="text-[12px]s text-gray-300">MAX</span>
        </div>
      </div>
    </div>
  );
};
