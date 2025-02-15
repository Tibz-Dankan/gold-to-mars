import React, { useRef, useState, useCallback } from "react";
import { EventBus } from "../../game/EventBus";

export const ControlPad = () => {
  const padRef = useRef<HTMLDivElement>(null);
  const ballRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const handleDragStart = (event: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    handleDrag(event);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const handleDrag = useCallback(
    (event: React.MouseEvent | React.TouchEvent) => {
      event.preventDefault();
      const rect = padRef.current?.getBoundingClientRect();
      if (!rect) return;

      let clientX, clientY;
      if ("touches" in event) {
        clientX = event.touches[0].clientX;
        clientY = event.touches[0].clientY;
      } else {
        clientX = event.clientX;
        clientY = event.clientY;
      }

      // Calculate relative position within bounds
      let x = clientX - rect.left - rect.width / 2;
      let y = clientY - rect.top - rect.height / 2;

      // Constrain movement within the pad boundaries
      const maxDistance = rect.width / 2 - 15;
      const distance = Math.sqrt(x * x + y * y);
      if (distance > maxDistance) {
        const angle = Math.atan2(y, x);
        x = Math.cos(angle) * maxDistance;
        y = Math.sin(angle) * maxDistance;
      }

      setPosition({ x, y });
      EventBus.emit("padMove", { x, y });
    },
    [] // Using an empty array ensures that the function is not recreated on every render
  );

  const debouncedHandleDrag = useCallback(
    (event: React.MouseEvent | React.TouchEvent) => {
      if (isDragging) {
        requestAnimationFrame(() => handleDrag(event));
      }
    },
    [isDragging, handleDrag]
  );

  return (
    <div
      ref={padRef}
      style={{
        width: 100,
        height: 100,
        background: "gray",
        position: "relative",
        borderRadius: "10px",
      }}
      onMouseDown={handleDragStart}
      onTouchStart={handleDragStart}
      onMouseUp={handleDragEnd}
      onTouchEnd={handleDragEnd}
      onMouseMove={debouncedHandleDrag}
      onTouchMove={debouncedHandleDrag}
    >
      <div
        ref={ballRef}
        style={{
          width: 30,
          height: 30,
          background: "blue",
          borderRadius: "50%",
          position: "absolute",
          top: `calc(50% + ${position.y}px)`,
          left: `calc(50% + ${position.x}px)`,
          transform: "translate(-50%, -50%)",
        }}
      />
    </div>
  );
};
