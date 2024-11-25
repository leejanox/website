import React, { useRef, useEffect } from "react";

const StarsBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const stars: { x: number; y: number; radius: number; dx: number; dy: number }[] = [];
    const createStars = (count: number) => {
      for (let i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 1.5 + 0.5, // 별 크기
          dx: (Math.random() - 0.5) * 0.5, // x 이동 속도
          dy: (Math.random() - 0.5) * 0.5, // y 이동 속도
        });
      }
    };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      stars.length = 0; // 기존 별 초기화
      createStars(500); // 새로운 별 생성
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach((star) => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = "white";
        ctx.fill();
        star.x += star.dx;
        star.y += star.dy;

        // 별이 화면 밖으로 나가면 다시 초기화
        if (star.x < 0 || star.x > canvas.width) star.dx = -star.dx;
        if (star.y < 0 || star.y > canvas.height) star.dy = -star.dy;
      });
      requestAnimationFrame(animate);
    };

    resizeCanvas();
    animate();

    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full z-[1] bg-transparent"
    />
  );
};

export default StarsBackground;
