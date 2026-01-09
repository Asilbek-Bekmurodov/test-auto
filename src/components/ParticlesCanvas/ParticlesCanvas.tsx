import { useEffect, useRef } from "react";

type Vector2 = [number, number];

type Dot = {
  position: Vector2;
  velocity: Vector2;
};

type Mouse = {
  position: Vector2;
};

const CONFIG = {
  DOT_COUNT: 200,
  DOT_RADIUS: 0.4,
  DOT_SPEED: 0.2,
  LINK_DISTANCE_CAP: 200,
  LINK_THICKNESS: 0.2,
  BACKGROUND_COLOR: "#ffffff",
  DOT_COLOR: "#16149a",
  LINK_COLOR: "#16149a",
} as const;

const TAU = Math.PI * 2;

const ParticlesCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const dotsRef = useRef<Dot[]>([]);
  const mouseRef = useRef<Mouse>({ position: [0, 0] });
  const animationRef = useRef<number | null>(null);

  const randomPosition = (w: number, h: number): Vector2 => [
    Math.random() * w,
    Math.random() * h,
  ];

  const randomVelocity = (): Vector2 => {
    const theta = Math.random() * TAU;
    return [
      Math.cos(theta) * CONFIG.DOT_SPEED,
      Math.sin(theta) * CONFIG.DOT_SPEED,
    ];
  };

  const regenerateDots = (w: number, h: number): void => {
    dotsRef.current = Array.from({ length: CONFIG.DOT_COUNT }, () => ({
      position: randomPosition(w, h),
      velocity: randomVelocity(),
    }));
  };

  const connectDots = (
    ctx: CanvasRenderingContext2D,
    a: { position: Vector2 },
    b: { position: Vector2 }
  ): void => {
    const d = Math.hypot(
      a.position[0] - b.position[0],
      a.position[1] - b.position[1]
    );

    if (d <= CONFIG.LINK_DISTANCE_CAP) {
      const c = (CONFIG.LINK_DISTANCE_CAP - d) / CONFIG.LINK_DISTANCE_CAP;

      ctx.strokeStyle = CONFIG.LINK_COLOR;
      ctx.lineWidth = c * CONFIG.LINK_THICKNESS;
      ctx.beginPath();
      ctx.moveTo(a.position[0], a.position[1]);
      ctx.lineTo(b.position[0], b.position[1]);
      ctx.stroke();
    }
  };

  const renderDot = (ctx: CanvasRenderingContext2D, dot: Dot): void => {
    ctx.fillStyle = CONFIG.DOT_COLOR;
    ctx.beginPath();
    ctx.arc(dot.position[0], dot.position[1], CONFIG.DOT_RADIUS, 0, TAU);
    ctx.fill();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctxRef.current = ctx;

    const resize = (): void => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      regenerateDots(canvas.width, canvas.height);
    };

    const render = (): void => {
      ctx.fillStyle = CONFIG.BACKGROUND_COLOR;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      dotsRef.current.forEach((dot, i) => {
        for (let j = i + 1; j < dotsRef.current.length; j++) {
          connectDots(ctx, dot, dotsRef.current[j]);
        }
        connectDots(ctx, dot, mouseRef.current);
      });

      dotsRef.current.forEach((dot) => {
        dot.position[0] =
          (dot.position[0] + dot.velocity[0] + canvas.width) % canvas.width;

        dot.position[1] =
          (dot.position[1] + dot.velocity[1] + canvas.height) % canvas.height;

        renderDot(ctx, dot);
      });

      animationRef.current = requestAnimationFrame(render);
    };

    const handleMouseMove = (e: MouseEvent): void => {
      mouseRef.current.position = [e.clientX, e.clientY];
    };

    resize();
    render();

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        width: "100vw",
        height: "100vh",
        right: 0,
        mixBlendMode: "lighten",
        zIndex: -10,
      }}
    />
  );
};

export default ParticlesCanvas;
