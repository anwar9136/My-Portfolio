import React, { useState, useEffect, useRef } from "react";

const EDGE_MARGIN = 15;
const VERTICAL_DRIFT_RANGE = 15;
const NAVBAR_SAFE_HEIGHT_PX = 100;

const FULL_RANGE = { min: 8, max: 92 };

const getSafeMinY = () => {
  const navPercent = (NAVBAR_SAFE_HEIGHT_PX / window.innerHeight) * 100;
  return Math.max(FULL_RANGE.min, navPercent);
};

const randomFlightPath = (direction) => {
  const safeMin = getSafeMinY();
  const startY = Math.random() * (FULL_RANGE.max - safeMin) + safeMin;
  const drift = Math.random() * VERTICAL_DRIFT_RANGE * 2 - VERTICAL_DRIFT_RANGE;
  const endY = Math.min(FULL_RANGE.max, Math.max(safeMin, startY + drift));

  if (direction === "rtl") {
    return {
      start: { x: 100 + EDGE_MARGIN, y: startY },
      end: { x: -EDGE_MARGIN, y: endY },
    };
  }
  return {
    start: { x: -EDGE_MARGIN, y: startY },
    end: { x: 100 + EDGE_MARGIN, y: endY },
  };
};

const FLYERS = {
  astronaut: {
    direction: "ltr",
    baseAngle: -38,
    minDuration: 14,
    maxDuration: 24,
    src: "/icons/a1.png",
    width: 80,        // Desktop
    mobileWidth: 48,  // Mobile
  },
  rocket: {
    direction: "rtl",
    baseAngle: -173,
    minDuration: 7,
    maxDuration: 12,
    src: "/icons/a7.png",
    width: 130,       // Desktop
    mobileWidth: 72,  // Mobile - adjust if needed
  },
};

export const StarBackground = () => {
  const [stars, setStars] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const [current, setCurrent] = useState("astronaut");
  const [flight, setFlight] = useState({
    x: -EDGE_MARGIN,
    y: 50,
    angle: 0,
    opacity: 0,
    posDuration: 0,
  });

  const resizeTimeout = useRef(null);
  const timeoutsRef = useRef([]);

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Generate stars
  useEffect(() => {
    const generateStars = () => {
      const numberOfStars = Math.floor(
        (window.innerWidth * window.innerHeight) / 10000
      );

      const newStars = [];
      for (let i = 0; i < numberOfStars; i++) {
        newStars.push({
          id: i,
          size: Math.random() * 3 + 1,
          x: Math.random() * 100,
          y: Math.random() * 100,
          opacity: Math.random() * 0.5 + 0.5,
          animationDuration: Math.random() * 4 + 2,
        });
      }
      setStars(newStars);
    };

    generateStars();

    const handleResize = () => {
      clearTimeout(resizeTimeout.current);
      resizeTimeout.current = setTimeout(generateStars, 300);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimeout.current);
    };
  }, []);

  // Flight logic
  useEffect(() => {
    const clearAll = () => timeoutsRef.current.forEach(clearTimeout);

    const runFlight = (type) => {
      const config = FLYERS[type];
      const { start, end } = randomFlightPath(config.direction);

      const travelAngle =
        (Math.atan2(end.y - start.y, end.x - start.x) * 180) / Math.PI;
      const rotation = travelAngle - config.baseAngle;

      const duration =
        Math.random() * (config.maxDuration - config.minDuration) + config.minDuration;

      setCurrent(type);
      setFlight({ x: start.x, y: start.y, angle: rotation, opacity: 0, posDuration: 0 });

      const t1 = setTimeout(() => {
        setFlight({ x: end.x, y: end.y, angle: rotation, opacity: 0.9, posDuration: duration });
      }, 50);

      const t2 = setTimeout(() => {
        setFlight((prev) => ({ ...prev, opacity: 0 }));
      }, duration * 1000 + 50);

      const t3 = setTimeout(() => {
        const next = type === "astronaut" ? "rocket" : "astronaut";
        runFlight(next);
      }, duration * 1000 + 50 + 900 + 600 + Math.random() * 1000);

      timeoutsRef.current = [t1, t2, t3];
    };

    runFlight("astronaut");
    return clearAll;
  }, []);

  const config = FLYERS[current];
  const currentWidth = isMobile ? config.mobileWidth : config.width;

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {stars.map((star) => (
        <div
          key={star.id}
          className="star animate-pulse-subtle"
          style={{
            width: star.size + "px",
            height: star.size + "px",
            left: star.x + "%",
            top: star.y + "%",
            opacity: star.opacity,
            animationDuration: star.animationDuration + "s",
          }}
        />
      ))}

      {/* Flying Object */}
      <img
        src={config.src}
        alt=""
        style={{
          position: "absolute",
          left: flight.x + "%",
          top: flight.y + "%",
          width: currentWidth + "px",
          height: "auto",
          opacity: flight.opacity,
          transform: `translate(-50%, -50%) rotate(${flight.angle}deg)`,
          transition: `left ${flight.posDuration}s linear, top ${flight.posDuration}s linear, opacity 0.9s ease`,
        }}
      />
    </div>
  );
};