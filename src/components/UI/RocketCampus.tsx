import React, { useState, useEffect, useRef } from "react";
import { EventBus } from "../../game/EventBus";
import { isApproaching } from "../../utils/isApproaching";

export const RocketCampus: React.FC = () => {
  const [acceleration, setAcceleration] = useState(0);
  const [direction, setDirection] = useState({ x: 0, y: 0 });
  const prevDistances = useRef({ earth: Infinity, mars: Infinity });

  const rocketPosition = useRef({ x: 0, y: 0 });
  const rocketPath = useRef<Array<{ x: number; y: number }>>([]);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const handlePadMove = (dir: { x: number; y: number }) => {
      setDirection(dir);
    };

    const handleAcceleration = ({ acceleration }: { acceleration: number }) => {
      setAcceleration(acceleration);
    };

    EventBus.on("padMove", handlePadMove);
    EventBus.on("acceleration", handleAcceleration);

    return () => {
      EventBus.off("padMove", handlePadMove);
      EventBus.off("acceleration", handleAcceleration);
    };
  }, []);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;

    let animationFrameId: number;
    const maxSpeed = 20000; // km/hr

    const drawScene = () => {
      ctx.clearRect(0, 0, width, height);

      // Green Circle (Campus boundary)
      ctx.beginPath();
      ctx.arc(centerX, centerY, width / 2, 0, 2 * Math.PI);
      ctx.strokeStyle = "#868e96";
      ctx.lineWidth = 2;
      ctx.stroke();

      // Perpendicular Lines
      ctx.beginPath();
      ctx.moveTo(centerX, 0);
      ctx.lineTo(centerX, height);
      ctx.moveTo(0, centerY);
      ctx.lineTo(width, centerY);
      ctx.strokeStyle = "#868e96";
      ctx.stroke();

      // Sun
      const sunRadius = 20;
      ctx.beginPath();
      ctx.arc(centerX, centerY, sunRadius, 0, 2 * Math.PI);
      ctx.fillStyle = "#FFD700";
      ctx.fill();

      // Earth and Orbit
      const earthRadius = 10;
      const earthOrbitRadiusX = width / 4;
      const earthOrbitRadiusY = height / 6;

      const earthRotationSpeed = (2 * Math.PI) / 720000; // Radians per millisecond
      const earthAngle = Date.now() * earthRotationSpeed;
      const earthX = centerX + earthOrbitRadiusX * Math.cos(earthAngle);
      const earthY = centerY + earthOrbitRadiusY * Math.sin(earthAngle);

      ctx.beginPath();
      ctx.ellipse(
        centerX,
        centerY,
        earthOrbitRadiusX,
        earthOrbitRadiusY,
        0,
        0,
        2 * Math.PI
      );
      ctx.strokeStyle = "#1E90FF";
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(earthX, earthY, earthRadius, 0, 2 * Math.PI);
      ctx.fillStyle = "#1E90FF";
      ctx.fill();

      // Mars and Orbit (around the Sun)
      const marsRadius = 8;
      const marsOrbitRadiusX = width / 2.2;
      const marsOrbitRadiusY = height / 3.5;

      const marsRotationSpeed = (2 * Math.PI) / 1368000; // Radians per millisecond (Mars takes ~1.88 times longer than Earth)
      const marsAngle = Date.now() * marsRotationSpeed;
      const marsX = centerX + marsOrbitRadiusX * Math.cos(marsAngle);
      const marsY = centerY + marsOrbitRadiusY * Math.sin(marsAngle);

      ctx.beginPath();
      ctx.ellipse(
        centerX,
        centerY,
        marsOrbitRadiusX,
        marsOrbitRadiusY,
        0,
        0,
        2 * Math.PI
      );
      ctx.strokeStyle = "#B7410E";
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(marsX, marsY, marsRadius, 0, 2 * Math.PI);
      ctx.fillStyle = "#B7410E";
      ctx.fill();

      // Projected Path (Now from Earth to Mars)
      ctx.beginPath();
      ctx.moveTo(earthX, earthY);
      ctx.lineTo(marsX, marsY);
      ctx.strokeStyle = "green";
      ctx.setLineDash([5, 5]);
      ctx.stroke();
      ctx.setLineDash([]);

      // Calculate speed and velocity
      const speedKmH = (acceleration / 100) * maxSpeed;
      const pixelsPerFrame = (speedKmH / 3600) * 0.005; // 0.005 pixels per second

      EventBus.emit("rocketSpeed", { speed: speedKmH });

      // Normalize direction to unit vector
      const magnitude = Math.sqrt(direction.x ** 2 + direction.y ** 2);
      const unitDirection =
        magnitude === 0
          ? { x: 0, y: 0 }
          : { x: direction.x / magnitude, y: direction.y / magnitude };

      // Update rocket position (no re-render)
      rocketPosition.current.x += unitDirection.x * pixelsPerFrame;
      rocketPosition.current.y += unitDirection.y * pixelsPerFrame;

      // Save rocket path (no re-render)
      rocketPath.current.push({
        x: centerX + rocketPosition.current.x,
        y: centerY + rocketPosition.current.y,
      });
      if (rocketPath.current.length > 50) rocketPath.current.shift();

      // Draw Rocket Path
      if (rocketPath.current.length > 0) {
        ctx.beginPath();
        ctx.moveTo(rocketPath.current[0].x, rocketPath.current[0].y);
        for (let i = 1; i < rocketPath.current.length; i++) {
          ctx.lineTo(rocketPath.current[i].x, rocketPath.current[i].y);
        }
        ctx.strokeStyle = "blue";
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      // Rocket Indicator
      const rocketX = centerX + rocketPosition.current.x;
      const rocketY = centerY + rocketPosition.current.y;

      ctx.beginPath();
      ctx.moveTo(rocketX, rocketY - 10 / 2);
      ctx.lineTo(rocketX + 10 / 2, rocketY + 10 / 2);
      ctx.lineTo(rocketX - 10 / 2, rocketY + 10 / 2);
      ctx.closePath();
      ctx.fillStyle = "#37b24d";
      ctx.fill();

      // const pixelsToKm = 1 / 500; // 1 km = 500 pixels
      const planetToPlanetScaler = 100; // 1 km = 500 pixels
      const rocketPlanetScaler = 10;

      const rocketPositionX = rocketPosition.current.x;
      const rocketPositionY = -rocketPosition.current.y;

      const earthPositionX = earthX - centerX;
      const earthPositionY = centerY - earthY; // Invert Y

      const marsPositionX = marsX - centerX;
      const marsPositionY = centerY - marsY; // Invert Y

      EventBus.emit("planetPosition", {
        earthPositionX: earthX - centerX,
        earthPositionY: earthY - centerY,
        marsPositionX: marsX - centerX,
        marsPositionY: marsY - centerY,
        rocketPositionX: rocketPosition.current.x,
        rocketPositionY: rocketPosition.current.y,
      });

      const distanceToEarthKm =
        Math.sqrt(
          Math.pow(rocketPositionX - earthPositionX, 2) +
            Math.pow(rocketPositionY - earthPositionY, 2)
        ) * rocketPlanetScaler;

      const distanceToMarsKm =
        Math.sqrt(
          Math.pow(rocketPositionX - marsPositionX, 2) +
            Math.pow(rocketPositionY - marsPositionY, 2)
        ) * rocketPlanetScaler;

      const distanceFromEarthToMarsKm =
        Math.sqrt(
          Math.pow(earthPositionX - marsPositionX, 2) +
            Math.pow(earthPositionY - marsPositionY, 2)
        ) * planetToPlanetScaler;

      const approachingEarth = isApproaching(
        prevDistances.current.earth,
        distanceToEarthKm
      );
      const approachingMars = isApproaching(
        prevDistances.current.mars,
        distanceToMarsKm
      );

      const isEarthAtmosphere: boolean = distanceToEarthKm <= 250;
      const isMarsAtmosphere: boolean = distanceToMarsKm <= 180;

      if (isEarthAtmosphere) {
        EventBus.emit("rocketLocation", {
          location: "Earth",
          isApproachingEarth: approachingEarth,
          isApproachingMars: approachingMars,
          distanceToEarthKm: distanceToEarthKm,
          distanceToMarsKm: distanceToMarsKm,
          distanceFromEarthToMarsKm: distanceFromEarthToMarsKm,
        });
      } else if (isMarsAtmosphere) {
        EventBus.emit("rocketLocation", {
          location: "Mars",
          isApproachingEarth: approachingEarth,
          isApproachingMars: approachingMars,
          distanceToEarthKm: distanceToEarthKm,
          distanceToMarsKm: distanceToMarsKm,
          distanceFromEarthToMarsKm: distanceFromEarthToMarsKm,
        });
      } else {
        EventBus.emit("rocketLocation", {
          location: "Space",
          isApproachingEarth: approachingEarth,
          isApproachingMars: approachingMars,
          distanceToEarthKm: distanceToEarthKm,
          distanceToMarsKm: distanceToMarsKm,
          distanceFromEarthToMarsKm: distanceFromEarthToMarsKm,
        });
      }

      // Update previous distances
      prevDistances.current.earth = distanceToEarthKm;
      prevDistances.current.mars = distanceToMarsKm;

      animationFrameId = requestAnimationFrame(drawScene);
    };

    drawScene();
    return () => cancelAnimationFrame(animationFrameId);
  }, [direction, acceleration]);

  return (
    <div
      className="w-72 h-72 p-4 rounded-full bg-slate-800/60 
       flex items-center justify-center"
    >
      <canvas ref={canvasRef} width={268} height={268} />
    </div>
  );
};
