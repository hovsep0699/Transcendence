import React, { useRef, useEffect } from 'react';

const Pin= () => {
  const canvasRef = useRef(null);
  const paddleWidth = 10;
  const paddleHeight = 80;
  let leftPaddleY = 0;
  let rightPaddleY = 0;
  const paddleSpeed = 5;

  let ballX = 0;
  let ballY = 0;
  let ballSpeedX = 5;
  let ballSpeedY = 5;
  const ballRadius = 10;

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    const handleMouseMove = (event) => {
      const mousePos = calculateMousePos(event);
      leftPaddleY = mousePos.y - paddleHeight / 2;
    };

    const calculateMousePos = (event) => {
      const rect = canvas.getBoundingClientRect();
      const root = document.documentElement;
      const mouseX = event.clientX - rect.left - root.scrollLeft;
      const mouseY = event.clientY - rect.top - root.scrollTop;
      return {
        x: mouseX,
        y: mouseY
      };
    };

    const update = () => {
      ballX += ballSpeedX;
      ballY += ballSpeedY;

      if (ballY - ballRadius < 0 || ballY + ballRadius > canvas.height) {
        ballSpeedY *= -1;
      }

      if (ballX - ballRadius < 0) {
        console.log('Right player wins!');
      } else if (ballX + ballRadius > canvas.width) {
        console.log('Left player wins!');
      }

      if (
        ballX - ballRadius < paddleWidth &&
        ballY > leftPaddleY &&
        ballY < leftPaddleY + paddleHeight
      ) {
        ballSpeedX *= -1;
      }

      if (
        ballX + ballRadius > canvas.width - paddleWidth &&
        ballY > rightPaddleY &&
        ballY < rightPaddleY + paddleHeight
      ) {
        ballSpeedX *= -1;
      }
    };

    const draw = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);

      context.fillRect(0, leftPaddleY, paddleWidth, paddleHeight);
      context.fillRect(canvas.width - paddleWidth, rightPaddleY, paddleWidth, paddleHeight);

      context.beginPath();
      context.arc(ballX, ballY, ballRadius, 0, Math.PI * 2, false);
      context.fillStyle = 'red';
      context.fill();
      context.closePath();
    };

    const gameLoop = () => {
      update();
      draw();
      requestAnimationFrame(gameLoop);
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    gameLoop();

    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return <canvas ref={canvasRef} id="gameCanvas" width={600} height={400} />;
};

export default Pin;
