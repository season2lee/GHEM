import React, { useState, useRef, useEffect } from "react";
import { css } from "@emotion/react";

type Bullet = {
  x: number;
  y: number;
};

function ShootingGameTwo() {
  const [bullets, setBullets] = useState<Bullet[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current as HTMLCanvasElement;
    const context = canvas.getContext("2d") as CanvasRenderingContext2D;

    const animate = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.fillStyle = "white";

      bullets.forEach((bullet) => {
        context.beginPath();
        context.arc(bullet.x, bullet.y, 5, 0, Math.PI * 2);
        context.fill();
        bullet.y -= 5;
      });

      requestAnimationFrame(animate);
    };

    animate();
  }, [bullets]);

  const handleClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current as HTMLElement;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    setBullets([...bullets, { x, y }]);
  };

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={400}
        height={400}
        onClick={handleClick}
        css={canvasStyles}
      />
    </div>
  );
}

const canvasStyles = css`
  border: 1px solid #fff;
  color: #fff;
  box-shadow: 0 0 0.1rem #fff, 0 0 1px #ffc4c4, 0 0 2px #faedff, 0 0 3px #f0cbff,
    0 0 2.5px #e7aaff, inset 0 0 2.8px #e9b2ff;
`;

export default ShootingGameTwo;
