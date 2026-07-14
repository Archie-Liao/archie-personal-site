import type { CSSProperties } from "react";

/** /galaxy 背景：低存在感柔光球 + 星点缓动（无流星） */

const WARM = ["#C4735A", "#D4926A", "#CC785C", "#B85C42"] as const;
const COOL = ["#5E8FA8", "#6A9A96", "#7289A6", "#4F7F8C"] as const;

type SoftOrb = {
  left: string;
  top: string;
  sizeRem: number;
  warm: boolean;
  opacity: number;
  duration: number;
  delay: number;
  drift: [number, number][];
};

type StarPin = {
  left: string;
  top: string;
  size: number;
  warm: boolean;
  opacity: number;
  duration: number;
  delay: number;
  drift: [number, number][];
  breath: number;
};

const SOFT_ORBS: SoftOrb[] = [
  { left: "6%", top: "12%", sizeRem: 9, warm: false, opacity: 0.09, duration: 42, delay: 0, drift: [[16, -10], [-10, 14], [12, 8]] },
  { left: "70%", top: "6%", sizeRem: 7.5, warm: true, opacity: 0.08, duration: 38, delay: 4, drift: [[-14, 12], [10, -10], [-6, 12]] },
  { left: "14%", top: "64%", sizeRem: 6.5, warm: true, opacity: 0.07, duration: 44, delay: 2, drift: [[10, 10], [-12, -6], [8, 12]] },
  { left: "76%", top: "60%", sizeRem: 8, warm: false, opacity: 0.085, duration: 40, delay: 6, drift: [[-16, 8], [10, 14], [-10, -8]] },
  { left: "42%", top: "80%", sizeRem: 5.5, warm: true, opacity: 0.065, duration: 36, delay: 1, drift: [[8, -12], [-10, 6], [6, 10]] },
];

const STAR_PINS: StarPin[] = [
  { left: "8%", top: "14%", size: 7, warm: false, opacity: 0.82, duration: 28, delay: 0, drift: [[12, -10], [-8, 14], [10, 8]], breath: 3.2 },
  { left: "22%", top: "8%", size: 8, warm: true, opacity: 0.78, duration: 32, delay: 1.2, drift: [[-14, 12], [16, -8], [-10, 12]], breath: 2.8 },
  { left: "38%", top: "18%", size: 6.5, warm: false, opacity: 0.8, duration: 30, delay: 2.4, drift: [[10, 14], [-12, -10], [8, 12]], breath: 3.6 },
  { left: "52%", top: "6%", size: 7.5, warm: true, opacity: 0.76, duration: 34, delay: 0.6, drift: [[-10, 16], [14, -12], [-8, 10]], breath: 3.0 },
  { left: "71%", top: "11%", size: 8, warm: false, opacity: 0.84, duration: 29, delay: 3.1, drift: [[16, -12], [-10, 16], [12, 10]], breath: 2.6 },
  { left: "88%", top: "20%", size: 6.5, warm: true, opacity: 0.74, duration: 31, delay: 1.8, drift: [[-12, 10], [10, -14], [-8, 12]], breath: 3.4 },
  { left: "5%", top: "38%", size: 7, warm: true, opacity: 0.8, duration: 36, delay: 2.8, drift: [[14, 12], [-16, 8], [10, -12]], breath: 3.8 },
  { left: "18%", top: "52%", size: 8.5, warm: false, opacity: 0.82, duration: 33, delay: 0.4, drift: [[-10, -14], [12, 10], [-8, 16]], breath: 2.9 },
  { left: "33%", top: "72%", size: 7, warm: true, opacity: 0.75, duration: 35, delay: 4.2, drift: [[12, -16], [-14, 10], [8, 14]], breath: 3.5 },
  { left: "48%", top: "84%", size: 6.5, warm: false, opacity: 0.83, duration: 30, delay: 1.5, drift: [[-12, 12], [16, -10], [-10, -12]], breath: 3.1 },
  { left: "62%", top: "76%", size: 8, warm: true, opacity: 0.79, duration: 37, delay: 2.2, drift: [[10, 14], [-12, -12], [14, 8]], breath: 3.3 },
  { left: "78%", top: "62%", size: 7.5, warm: false, opacity: 0.81, duration: 32, delay: 3.6, drift: [[-14, 10], [12, 16], [-10, -10]], breath: 3.7 },
  { left: "92%", top: "48%", size: 6.5, warm: true, opacity: 0.77, duration: 31, delay: 0.9, drift: [[12, -12], [-10, 14], [8, 10]], breath: 2.7 },
  { left: "56%", top: "32%", size: 7, warm: true, opacity: 0.73, duration: 33, delay: 1.1, drift: [[14, 10], [-12, -14], [10, 12]], breath: 3.2 },
];

function pickColor(warm: boolean, i: number) {
  const pool = warm ? WARM : COOL;
  return pool[i % pool.length];
}

function driftVars(drift: [number, number][]) {
  const [d1, d2, d3] = drift;
  return {
    "--d1x": `${d1[0]}px`,
    "--d1y": `${d1[1]}px`,
    "--d2x": `${d2[0]}px`,
    "--d2y": `${d2[1]}px`,
    "--d3x": `${d3[0]}px`,
    "--d3y": `${d3[1]}px`,
  };
}

export function GalaxyStarfield() {
  return (
    <div className="galaxy-starfield" aria-hidden="true">
      {SOFT_ORBS.map((orb, i) => {
        const color = pickColor(orb.warm, i);
        return (
          <span
            key={`orb-${i}`}
            className="galaxy-starfield__orb-wrap"
            style={
              {
                left: orb.left,
                top: orb.top,
                width: `${orb.sizeRem}rem`,
                height: `${orb.sizeRem}rem`,
                animationDuration: `${orb.duration}s`,
                animationDelay: `${orb.delay}s`,
                ...driftVars(orb.drift),
              } as CSSProperties
            }
          >
            <span
              className="galaxy-starfield__orb"
              style={
                {
                  background: color,
                  opacity: orb.opacity,
                  "--orb-color": color,
                } as CSSProperties
              }
            />
          </span>
        );
      })}

      {STAR_PINS.map((star, i) => (
        <span
          key={`pin-${i}`}
          className="galaxy-starfield__pin-wrap"
          style={
            {
              left: star.left,
              top: star.top,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animationDuration: `${star.duration}s`,
              animationDelay: `${star.delay}s`,
              "--breath-dur": `${star.breath}s`,
              ...driftVars(star.drift),
            } as CSSProperties
          }
        >
          <span
            className="galaxy-starfield__pin"
            style={
              {
                color: pickColor(star.warm, i),
                opacity: star.opacity,
              } as CSSProperties
            }
          />
        </span>
      ))}
    </div>
  );
}
