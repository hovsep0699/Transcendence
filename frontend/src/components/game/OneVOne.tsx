import React, { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';

type PaddlePosition = 'left' | 'right';

interface PingPongProps {
  width: number;
  height: number;
}

const PingPong: React.FC<PingPongProps> = ({ width, height }) => {
  const [onlineStatus,setOnlineStatus] = useState(false);
    console.log("ffff");
    useEffect(() => {
      const socket = io('ws://localhost:5500'); // Replace with your server URL
  
      socket.onopen = () => {
        console.log('WebSocket connection establishedddddddddddddddd');
        // Implement any necessary logic for handling the connection
      };
      socket.once('online',()=>{

        socket.emit('online',{data:"ddddd"})
        
      })
      socket.on('online',(e)=>{
        setOnlineStatus(true);
        console.log("eeeeeee",e);
        
      })
      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log("dataaaa",data);
        
        // Implement any necessary logic for handling received messages
      };
      socket.onclose = () => {
        console.log('WebSocket connection closed');
        setOnlineStatus(false)
        // Implement any necessary logic for handling the connection closure
      };
  
      // Clean up on unmount
      return () => {
        socket.close();
      };
    }, []);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  let animationFrameId: number;
  let paddleSpeed = 8;
  let ballSpeed = 4;
  let paddleHeight = 80;
  let paddleWidth = 10;
  let ballRadius = 10;
  let paddleLeftY = height / 2 - paddleHeight / 2;
  let paddleRightY = height / 2 - paddleHeight / 2;
  let ballX = width / 2;
  let ballY = height / 2;
  let ballDeltaX = ballSpeed;
  let ballDeltaY = ballSpeed;
  const [score, setScore] = useState<{ left: number; right: number }>({
    left: 0,
    right: 0,
  });
  const resetGame = () => {
    ballX = width / 2;
    ballY = height / 2;
    ballDeltaX = ballSpeed;
    ballDeltaY = ballSpeed;
  };
  const movePaddle = (position: PaddlePosition, deltaY: number) => {
    if (position === 'left') {
      const newPaddleLeftY = paddleLeftY + deltaY;
      if (newPaddleLeftY >= 0 && newPaddleLeftY + paddleHeight <= height) {
        paddleLeftY = newPaddleLeftY;
      }
    } else {
      const newPaddleRightY = paddleRightY + deltaY;
      if (newPaddleRightY >= 0 && newPaddleRightY + paddleHeight <= height) {
        paddleRightY = newPaddleRightY;
      }
    }
  };

  const drawPaddle = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
    ctx.fillRect(x, y, paddleWidth, paddleHeight);
  };

  const drawBall = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
    ctx.fillStyle = 'white'
  };

  const update = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
  
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
  
    // Draw border
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 2;
    ctx.strokeRect(0, 0, width, height);
  
    // Draw paddles
    drawPaddle(ctx, 0, paddleLeftY);
    drawPaddle(ctx, width - paddleWidth, paddleRightY);
  
    // Draw ball
    drawBall(ctx, ballX, ballY);
  
    // Move ball
    ballX += ballDeltaX;
    ballY += ballDeltaY;
  
    // Check ball collision with paddles
    if (
      ballY + ballRadius > paddleLeftY &&
      ballY - ballRadius < paddleLeftY + paddleHeight &&
      ballX - ballRadius < paddleWidth
    ) {
      ballDeltaX = -ballDeltaX;
    }
    if (
      ballY + ballRadius > paddleRightY &&
      ballY - ballRadius < paddleRightY + paddleHeight &&
      ballX + ballRadius > width - paddleWidth
    ) {
      ballDeltaX = -ballDeltaX;
    }
  
    // Check ball collision with walls (top and bottom boundaries)
    if (ballY - ballRadius < 0 || ballY + ballRadius > height) {
      ballDeltaY = -ballDeltaY;
    }
  
    // Check ball misses and update scores
    if (ballX + ballRadius < 0) {
      // Ball missed by the left paddle
      setScore((prevScore) => ({
        ...prevScore,
        right: prevScore.right + 1,
      }));
      resetGame();
    } else if (ballX - ballRadius > width) {
      // Ball missed by the right paddle
      setScore((prevScore) => ({
        ...prevScore,
        left: prevScore.left + 1,
      }));
      resetGame();
    }
  
    // Request next frame
    animationFrameId = requestAnimationFrame(update);
  };
  
  

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set up keyboard listeners
    window.addEventListener('keydown', (e) => {
      console.log("dsdsdsdsdsd",e.code);
      
      switch (e.code) {
        case 'ArrowUp':
          movePaddle('right', -paddleSpeed);
          break;
        case 'ArrowDown':
          movePaddle('right', paddleSpeed);
          break;
        case 'KeyW':
          movePaddle('left', -paddleSpeed);
          break;
        case 'KeyS':
          movePaddle('left', paddleSpeed);
          break;
        default:
          break;
      }
    });

    window.addEventListener('keyup', (e) => {
      switch (e.code) {
        case 'ArrowUp':
        case 'ArrowDown':
          movePaddle('right', 0);
          break;
        case 'KeyW':
        case 'KeyS':
          movePaddle('left', 0);
          break;
        default:
          break;
      }
    });

    // Start the game loop
    animationFrameId = requestAnimationFrame(update);

    // Clean up on unmount
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return  (
    <div className="flex justify-center items-center h-screen bg-gray-800">
      <canvas
        ref={canvasRef}
        className="border-2 border-white"
        width={width}
        height={height}
      />
    </div>
  );
};

export default PingPong;
