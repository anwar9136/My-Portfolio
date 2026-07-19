import React from "react";
import { useState, useEffect, useRef } from "react";

const EDGE_MARGIN = 15; // vw units past the edge, so it enters/exits smoothly
const VERTICAL_DRIFT_RANGE = 15; // max vertical drift, in vh, across a flight

// ADDED: approximate navbar height in px (covers both the py-5 "top of page"
// state and the py-3 "scrolled" state, plus a little buffer) — flying
// objects are kept below this line so they never pass behind the navbar's
// backdrop-blur, which was blurring them as they crossed underneath it.
const NAVBAR_SAFE_HEIGHT_PX = 100;

// both objects can appear anywhere across nearly the full screen height,
// EXCEPT the reserved strip at the top for the navbar
const FULL_RANGE = { min: 8, max: 92 };

// ADDED: converts the fixed navbar pixel height into a vh percentage based
// on the CURRENT viewport, so this works correctly on any screen size
// (a 100px navbar is a much bigger percentage of a short phone screen than
// a tall desktop one).
const getSafeMinY = () => {
  const navPercent = (NAVBAR_SAFE_HEIGHT_PX / window.innerHeight) * 100;
  return Math.max(FULL_RANGE.min, navPercent);
};

const randomFlightPath = (direction) => {
  const safeMin = getSafeMinY(); // ADDED: never start/drift above the navbar
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

// each flyer's own config (direction, facing angle, speed, image, size)
const FLYERS = {
  astronaut: {
    direction: "ltr",
    baseAngle: -38,
    minDuration: 14,
    maxDuration: 24,
    src: "/icons/a1.png",
    width: 80,
  },
  rocket: {
    direction: "rtl",
    baseAngle: -173,
    minDuration: 7,
    maxDuration: 12,
    src: "/icons/a7.png",
    width: 130, // CHANGED: bumped up from 70px — was too small
  },
};

export const StarBackground = () => {
  const [stars, setStars] = useState([]);
  const resizeTimeout = useRef(null);

  // CHANGED: single flight state instead of two independent ones — only
  // one object is ever on screen at a time now, alternating between them
  const [current, setCurrent] = useState("astronaut");
  const [flight, setFlight] = useState({
    x: -EDGE_MARGIN,
    y: 50,
    angle: 0,
    opacity: 0,
    posDuration: 0,
  });
  const timeoutsRef = useRef([]);

  useEffect(() => {
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

  // CHANGED: this now drives ONE flight at a time, then explicitly hands
  // off to the other flyer only after the current one has fully faded out
  // — this is what guarantees they never appear together.
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

      // CHANGED: after this one fully fades out (+ a pause), switch to the
      // OTHER flyer — this alternation is what keeps them from overlapping
      const t3 = setTimeout(() => {
        const next = type === "astronaut" ? "rocket" : "astronaut";
        runFlight(next);
      }, duration * 1000 + 50 + 900 + 600 + Math.random() * 1000);

      timeoutsRef.current = [t1, t2, t3];
    };

    runFlight("astronaut");
    return clearAll;
  }, []);

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

  const config = FLYERS[current];

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

      {/* CHANGED: single img element, its src swaps depending on which
          flyer is currently active — only one is ever rendered/visible */}
      <img
        src={config.src}
        alt=""
        style={{
          position: "absolute",
          left: flight.x + "%",
          top: flight.y + "%",
          width: config.width + "px",
          height: "auto",
          opacity: flight.opacity,
          transform: `translate(-50%, -50%) rotate(${flight.angle}deg)`,
          transition: `left ${flight.posDuration}s linear, top ${flight.posDuration}s linear, opacity 0.9s ease`,
        }}
      />
    </div>
  );
};