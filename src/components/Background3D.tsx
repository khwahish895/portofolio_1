import React, { useEffect, useMemo, useRef } from "react";
import { motion, MotionValue, useMotionValue, useSpring, useTransform } from "motion/react";

interface Background3DProps {
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
}

export default function Background3D({ mouseX, mouseY }: Background3DProps) {
  // Smooth spring animation for mouse movement
  const springConfig = { damping: 30, stiffness: 200 };
  const mouseXSpring = useSpring(mouseX, springConfig);
  const mouseYSpring = useSpring(mouseY, springConfig);

  // Faster response for cursor-reactive dots
  const fastSpringConfig = { damping: 18, stiffness: 900 };
  const mouseXFast = useSpring(mouseX, fastSpringConfig);
  const mouseYFast = useSpring(mouseY, fastSpringConfig);

  // Intensity toggles to 1 while cursor is moving, back to 0 shortly after stop.
  const intensityRaw = useMotionValue(0);
  const intensity = useSpring(intensityRaw, { damping: 20, stiffness: 1300 });
  const stopTimerRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const bump = () => {
      intensityRaw.set(1);
      if (stopTimerRef.current) window.clearTimeout(stopTimerRef.current);
      stopTimerRef.current = window.setTimeout(() => intensityRaw.set(0), 90);
    };

    const unsubX = mouseX.on("change", bump);
    const unsubY = mouseY.on("change", bump);

    return () => {
      unsubX();
      unsubY();
      if (stopTimerRef.current) window.clearTimeout(stopTimerRef.current);
    };
  }, [intensityRaw, mouseX, mouseY]);

  // Parallax transforms for glowing orbs
  const layer1X = useTransform(mouseXSpring, [-0.5, 0.5], ["-10%", "10%"]);
  const layer1Y = useTransform(mouseYSpring, [-0.5, 0.5], ["-10%", "10%"]);

  const layer2X = useTransform(mouseXSpring, [-0.5, 0.5], ["10%", "-10%"]);
  const layer2Y = useTransform(mouseYSpring, [-0.5, 0.5], ["10%", "-10%"]);

  const layer3X = useTransform(mouseXSpring, [-0.5, 0.5], ["-5%", "5%"]);
  const layer3Y = useTransform(mouseYSpring, [-0.5, 0.5], ["-5%", "5%"]);

  // Perspective Grid Transforms
  const gridRotateX = useTransform(mouseYSpring, [-0.5, 0.5], [60, 50]);
  const gridRotateZ = useTransform(mouseXSpring, [-0.5, 0.5], [-10, 10]);
  const gridY = useTransform(mouseYSpring, [-0.5, 0.5], ["0%", "5%"]);

  const dots = useMemo(() => {
    const count = 220;
    return Array.from({ length: count }, (_, i) => {
      const size = Math.random() * 1.8 + 0.8; // px
      const depth = Math.random() * 1.6 + 0.4; // multiplier
      const opacity = Math.random() * 0.35 + 0.12;
      return {
        id: `dot-${i}`,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size,
        depth,
        opacity,
        isStar: Math.random() > 0.75,
      };
    });
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#0a0212]">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <motion.img
          src="https://img.pikbest.com/wp/202346/void-abstract-black-a-3d-rendered-empty-background_9724863.jpg!sw800"
          alt=""
          className="w-full h-full object-cover opacity-80"
          animate={{
            scale: [1, 1.08, 1],
            x: ["0%", "2%", "0%"],
            y: ["0%", "-2%", "0%"],
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Base Gradient - Deep Space */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-black opacity-70" />

      {/* Cursor-reactive Dot Field */}
      <div className="absolute inset-0">
        {dots.map((dot) => (
          <CursorDot
            key={dot.id}
            dot={dot}
            mouseX={mouseXFast}
            mouseY={mouseYFast}
            intensity={intensity}
          />
        ))}
      </div>

      {/* 3D Perspective Grid */}
      <div className="absolute inset-0 flex items-center justify-center [perspective:1000px]">
        <motion.div
          style={{
            rotateX: gridRotateX,
            rotateZ: gridRotateZ,
            y: gridY,
          }}
          className="relative h-[200%] w-[200%] opacity-10"
        >
          <div
            className="h-full w-full"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px',
              maskImage: 'radial-gradient(ellipse at center, black, transparent 80%)'
            }}
          />
        </motion.div>
      </div>

      {/* 3D Parallax Nebula Blobs */}

      {/* Top Left - Black Glow */}
      <motion.div
        style={{ x: layer1X, y: layer1Y, scale: useTransform(mouseXSpring, [-0.5, 0.5], [1, 1.2]) }}
        className="absolute top-[-20%] left-[-10%] h-[80vh] w-[80vw] rounded-full bg-black/30 blur-[130px] mix-blend-screen"
      />

      {/* Middle Right - Black Glow */}
      <motion.div
        style={{ x: layer2X, y: layer2Y, scale: useTransform(mouseYSpring, [-0.5, 0.5], [1.2, 1]) }}
        className="absolute top-[10%] right-[-15%] h-[70vh] w-[70vw] rounded-full bg-black/20 blur-[120px] mix-blend-screen"
      />

      {/* Bottom Left - Black Glow */}
      <motion.div
        style={{ x: layer3X, y: layer3Y }}
        className="absolute bottom-[-15%] left-[-10%] h-[60vh] w-[60vw] rounded-full bg-black/15 blur-[100px] mix-blend-screen"
      />

      {/* Scanline Effect */}
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.1)_50%)] bg-[length:100%_4px] pointer-events-none opacity-20" />

      {/* Noise Overlay */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-15 mix-blend-overlay" />
    </div>
  );
}

const CursorDot = React.memo(function CursorDot({
  dot,
  mouseX,
  mouseY,
  intensity,
}: {
  dot: {
    left: number;
    top: number;
    size: number;
    depth: number;
    opacity: number;
    isStar: boolean;
  };
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
  intensity: MotionValue<number>;
}) {
  const x = useTransform([mouseX, intensity], ([mx, i]: any) => mx * 70 * dot.depth * i);
  const y = useTransform([mouseY, intensity], ([my, i]: any) => my * 70 * dot.depth * i);
  const scale = useTransform(intensity, [0, 1], [1, dot.isStar ? 1.25 : 1.12]);
  const opacity = useTransform(intensity, [0, 1], [dot.opacity, Math.min(1, dot.opacity + 0.25)]);

  return (
    <motion.div
      className={dot.isStar ? "absolute rounded-full bg-white" : "absolute rounded-full bg-white"}
      style={{
        left: `${dot.left}%`,
        top: `${dot.top}%`,
        width: dot.size,
        height: dot.size,
        opacity,
        x,
        y,
        scale,
        boxShadow: dot.isStar ? "0 0 10px rgba(255,255,255,0.35)" : "none",
      }}
    />
  );
});
