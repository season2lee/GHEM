import { css, keyframes } from "@emotion/react";
import React, { useState, useEffect } from "react";

type TargetPosition = {
  x: number;
  y: number;
};

const ShootingGame = () => {
  const [score, setScore] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [targetPosition, setTargetPosition] = useState<TargetPosition>({
    x: 0,
    y: 0,
  });
  const [bulletPosition, setBulletPosition] = useState<TargetPosition>({
    x: 0,
    y: 0,
  });
  const [gameInterval, setGameInterval] =
    useState<ReturnType<typeof setInterval>>();

  useEffect(() => {
    if (isPlaying) {
      setGameInterval(
        setInterval(() => {
          const x = Math.floor(Math.random() * 500);
          const y = Math.floor(Math.random() * 500);
          setTargetPosition({ x, y });
        }, 1000)
      );
    } else {
      clearInterval(gameInterval);
    }

    return () => clearInterval(gameInterval);
  }, [isPlaying]);

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    const check = e.target as HTMLElement;
    const rect = check.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setBulletPosition({ x, y });

    const distance = Math.sqrt(
      (x - targetPosition.x) ** 2 + (y - targetPosition.y) ** 2
    );
    if (distance < 50) {
      setScore(score + 1);
    }
  };

  return (
    <div css={shootingGame} style={{ width: "100vw", height: "100vh" }}>
      <h1>Shooting Game</h1>
      <p>Score: {score}</p>
      {!isPlaying && (
        <button onClick={() => setIsPlaying(true)}>Start Game</button>
      )}
      {isPlaying && (
        <div css={gameArea} onClick={handleClick}>
          <div
            css={target}
            style={{ left: targetPosition.x, top: targetPosition.y }}
          />
          {bulletPosition.x !== 0 && bulletPosition.y !== 0 && (
            <div
              css={bullet}
              style={{ left: bulletPosition.x, top: bulletPosition.y }}
            />
          )}
        </div>
      )}
    </div>
  );
};

const shootingGame = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const gameArea = css`
  position: relative;
  width: 500px;
  height: 500px;
  background-color: #ddd;
  cursor: crosshair;
`;

const target = css`
  position: absolute;
  width: 50px;
  height: 50px;
  background-color: red;
  border-radius: 50%;
`;

const moveBullet = keyframes`
  from {     
      transform: translate(-50%, -50%);
    }
  to {
    transform: translate(calc(var(--x) - 50%), calc(var(--y) - 50%));
  }
  `;

const bullet = css`
  position: absolute;
  width: 10px;
  height: 10px;
  background-color: black;
  border-radius: 50%;
  animation: ${moveBullet} 0.5s linear;
`;
export default ShootingGame;
