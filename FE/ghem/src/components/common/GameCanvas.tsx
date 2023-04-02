import { css } from "@emotion/react";
import React, { useEffect } from "react";

function GameCanvas() {
  useEffect(() => {
    // Canvas 설정
    const gameCanvas = document.getElementById(
      "gameCanvas"
    ) as HTMLCanvasElement;
    var ctx = gameCanvas.getContext("2d") as CanvasRenderingContext2D;

    gameCanvas.width = (window.innerWidth * 7) / 10;
    gameCanvas.height = window.innerHeight;

    window.addEventListener("resize", function () {
      gameCanvas.width = (window.innerWidth * 7) / 10;
      gameCanvas.height = window.innerHeight;

      Planet.prototype.width = gameCanvas.width / 7;
      Planet.prototype.height = gameCanvas.width / 7;
      Planet.prototype.x =
        Math.floor(Math.random() * 7) * (gameCanvas.width / 7);
      Planet.prototype.y = 0;
    });

    // UFO 객체 정의

    type UfoType = {
      x: number;
      y: number;
      width: number;
      height: number;
    };

    const ufo = {
      x: gameCanvas.width - (gameCanvas.width * 4) / 7 - 2,
      y: window.innerHeight - window.innerHeight / 10 + 2, // 수정된 부분
      width: gameCanvas.width / 7, // 수정된 부분
      height: gameCanvas.width / 7 + 2, // 수정된 부분

      draw() {
        ctx.fillStyle = "green";
        ctx.fillRect(this.x, this.y, this.width, this.height);
      },
    };

    ufo.draw();

    // Planet 클래스 정의
    class Planet {
      x: number;
      y: number;
      width: number;
      height: number;
      hp?: number;
      speed?: number;

      constructor() {
        this.x = Math.floor(Math.random() * 7) * (gameCanvas.width / 7);
        this.y = 0; // 수정된 부분
        this.width = gameCanvas.width / 7;
        this.height = gameCanvas.width / 7;
      }

      draw() {
        // ctx.fillStyle = "red";
        ctx.fillRect(this.x, this.y, this.width, this.height);
      }

      getScore() {
        return 0;
      }

      decreaseHP() {
        // 체력 감소 메서드 추가
        if (this.hp && this.speed) {
          this.hp--;
          if (this.hp <= 0) {
            score += this.getScore();
            PlanetArray.splice(PlanetArray.indexOf(this), 1);
          }
        }
      }
    }

    class SmallPlanet extends Planet {
      constructor() {
        super();
        this.hp = 1;
        this.speed = 3;
      }

      draw() {
        ctx.fillStyle = "red"; // 녹색으로 변경
        ctx.fillRect(this.x, this.y, this.width, this.height);
      }

      getScore() {
        return 100;
      }
    }

    class NormalPlanet extends Planet {
      constructor() {
        super();
        this.hp = 5;
        this.speed = 2;
      }

      draw() {
        ctx.fillStyle = "yellow"; // 노란색으로 변경
        ctx.fillRect(this.x, this.y, this.width, this.height);
      }

      getScore() {
        return 200;
      }
    }

    class BigPlanet extends Planet {
      constructor() {
        super();
        this.hp = 10;
        this.speed = 1;
      }

      draw() {
        ctx.fillStyle = "orange"; // 주황색으로 변경
        ctx.fillRect(this.x, this.y, this.width, this.height);
      }

      getScore() {
        return 300;
      }
    }

    // Missle 클래스 정의
    class Missle {
      x: number;
      y: number;
      width: number;
      height: number;
      speed: number;

      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.width = 5;
        this.height = 10;
        this.speed = 10;
      }

      move() {
        this.y -= this.speed;
      }

      draw() {
        ctx.fillStyle = "orange";
        ctx.fillRect(this.x, this.y, this.width, this.height);
      }
    }

    let timer = 0;
    let PlanetArray: Planet[] = [];
    let MissleArray: Missle[] = [];
    let animation: number;

    let score = 0;
    let scoreText = "Score: ";

    let speedMultiplier = 1;
    let PlanetCreationInterval = 400;
    let timerResetInterval = 1000;
    let timeToReset = timerResetInterval;

    let isGameOver = false;

    let lives = 3;
    let livesText = "Lives: ";

    // 점수판 그리기 함수
    function drawScoreBoard() {
      const fontSize = Math.min(gameCanvas.width, gameCanvas.height) / 20;
      ctx.font = `${fontSize}px Arial`;
      ctx.fillStyle = "white";
      const text = scoreText + score;
      const textWidth = ctx.measureText(text).width;
      ctx.fillText(text, gameCanvas.width - textWidth - 10, 30);
    }

    let buttonX: number,
      buttonY: number,
      buttonWidth: number,
      buttonHeight: number;

    // 게임오버 함수
    function drawGameOver() {
      ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height); // 캔버스 지우기 추가

      let fontSize = Math.min(gameCanvas.width, gameCanvas.height) * 0.1; // 폰트 크기를 화면 크기에 비례하게 설정
      ctx.font = fontSize + "px Arial";
      ctx.fillStyle = "white";
      let textWidth = ctx.measureText("Game Over").width;
      let textX = (gameCanvas.width - textWidth) / 2;
      let textY = (gameCanvas.height - fontSize) / 2;
      ctx.fillText("Game Over", textX, textY);

      // 다시하기 버튼 생성
      buttonWidth = textWidth;
      buttonHeight = fontSize * 0.6;
      buttonX = textX;
      buttonY = textY + buttonHeight + 20;
      ctx.fillStyle = "blue";
      ctx.fillRect(buttonX, buttonY - 10, buttonWidth, buttonHeight + 10);
      ctx.fillStyle = "white";
      ctx.font = fontSize * 0.6 + "px Arial";
      ctx.fillText(
        "다시하기",
        buttonX + buttonWidth / 4,
        buttonY + buttonHeight * 0.7
      );
    }

    // 생명 표시 함수
    function drawLives() {
      const rectSize = Math.min(gameCanvas.width, gameCanvas.height) / 20;
      const spacing = rectSize / 5;
      const startX = 10;
      const startY = 10;

      for (let i = 0; i < lives; i++) {
        ctx.fillStyle = "red";
        ctx.fillRect(
          startX + i * (rectSize + spacing),
          startY,
          rectSize,
          rectSize
        );
      }

      for (let i = lives; i < 3; i++) {
        ctx.fillStyle = "gray";
        ctx.fillRect(
          startX + i * (rectSize + spacing),
          startY,
          rectSize,
          rectSize
        );
      }
    }

    function gameLoop() {
      if (lives <= 0) {
        isGameOver = true;
      }

      if (isGameOver) {
        ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
        drawGameOver();
        cancelAnimationFrame(animation);
        return;
      }
      animation = requestAnimationFrame(gameLoop);

      timer++;
      // Canvas 지우기
      ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);

      if (timer % Math.floor(PlanetCreationInterval / speedMultiplier) === 0) {
        let Planet: Planet;
        let randomNum = Math.random();
        if (randomNum < 0.33) {
          Planet = new SmallPlanet();
        } else if (randomNum < 0.66) {
          Planet = new NormalPlanet();
        } else {
          Planet = new BigPlanet();
        }
        PlanetArray.push(Planet);
      }

      // 생명선 그리기
      drawLives();

      // 점수판 그리기
      drawScoreBoard();

      // 시간이 지날수록 속도 증가
      timeToReset--;
      if (timeToReset <= 0) {
        speedMultiplier += 0.1; // 속도 배율을 증가시킵니다.
        timeToReset = timerResetInterval; // 다음 속도 증가까지의 시간을 재설정합니다.
      }

      PlanetArray.forEach((a, i, o) => {
        if (a.y + a.height >= gameCanvas.height) {
          o.splice(i, 1);
          lives--;
        }
        if (a.speed) {
          a.y += a.speed * speedMultiplier;
        }

        checkCollision(ufo, a);

        a.draw();
      });

      ufo.draw();

      // 총알 그리기
      MissleArray.forEach((b: Missle, i, o) => {
        b.move();
        b.draw();

        if (b.x > gameCanvas.width) {
          o.splice(i, 1);
        }

        // 총알과 선인장 충돌 확인
        PlanetArray.forEach((c, j) => {
          if (isColliding(b, c)) {
            c.decreaseHP();
            o.splice(i, 1); // 총알 제거
          }
        });
      });
    }

    requestAnimationFrame(gameLoop);

    // 충돌 확인 함수
    function isColliding(obj1: UfoType, obj2: UfoType) {
      let xOverlap =
        obj1.x + obj1.width > obj2.x && obj1.x < obj2.x + obj2.width;
      let yOverlap =
        obj1.y + obj1.height > obj2.y && obj1.y < obj2.y + obj2.height;

      return xOverlap && yOverlap;
    }

    // 충돌 확인
    function checkCollision(ufo: UfoType, Planet: Planet) {
      let xOverlap =
        ufo.x + ufo.width > Planet.x && ufo.x < Planet.x + Planet.width;
      let yOverlap =
        ufo.y + ufo.height > Planet.y && ufo.y < Planet.y + Planet.height;

      if (xOverlap && yOverlap) {
        // 3. 충돌 발생 시, 게임 오버 상태를 `true`로 변경하고 다시하기 버튼을 표시
        isGameOver = true;
        // lives--;
      }
    }

    // 위 아래 키를 누를 때마다 이동
    document.addEventListener("keyup", function (e) {
      let moveAmount = gameCanvas.width / 7; // 맵 사이즈의 1/5만큼 이동

      if (e.code === "ArrowLeft") {
        if (ufo.x - moveAmount >= 0) {
          // 화면 위쪽 경계를 넘지 않도록 함
          ufo.x -= moveAmount;
        } else {
          ufo.x = 0;
        }
      }
      if (e.code === "ArrowRight") {
        if (ufo.x + ufo.width + moveAmount <= gameCanvas.width) {
          // 화면 아래쪽 경계를 넘지 않도록 함
          ufo.x += moveAmount;
        } else {
          ufo.x = gameCanvas.width - ufo.width;
        }
      }
      if (e.code === "Space") {
        let missle = new Missle(ufo.x + ufo.width / 2, ufo.y);
        MissleArray.push(missle);
      }
    });

    gameCanvas.addEventListener("click", function (e) {
      if (isGameOver) {
        // 전역 변수를 사용하여 클릭 위치 검사
        if (
          e.clientX >= window.innerWidth / 2 - buttonX &&
          e.clientX <= window.innerWidth / 2 + buttonX &&
          e.clientY >= buttonY &&
          e.clientY <= buttonY + buttonHeight
        ) {
          // 변수 및 배열 초기화
          timer = 0;
          lives = 3;
          PlanetArray = [];
          MissleArray = [];
          score = 0;
          speedMultiplier = 1;
          timeToReset = timerResetInterval;
          isGameOver = false;

          // 게임 재시작
          gameLoop();
        }
      }
    });
  }, []);
  return <canvas id="gameCanvas" css={canvasSize} />;
}

const canvasSize = css`
  width: 30vw;
  height: auto;
`;

export default GameCanvas;
