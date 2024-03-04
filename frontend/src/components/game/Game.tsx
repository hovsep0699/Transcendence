import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import io, { Socket } from 'socket.io-client';
import { ip } from '../utils/ip';
import { useNavigate } from 'react-router-dom';
import './style.css';
import {store} from "../redux"


function Game({socket,name1,name2}) {
    
    const [width,setWidth] = useState((window.innerWidth / 2));
    const [height,setheight] = useState((window.innerHeight /2));
    const[paddleHeight,setPaddleHeight] = useState(((200 * height) / (1080 * 1.5)))
    // let paddleHeight = ((200 * height) / 1080);
 const [room, setRoom] = useState(null);
 const [gameStarted, setGameStarted] = useState(false);
 const [gameDetails, setGameDetails] = useState(null);
 const [inputValue, setInputValue] = useState('');
 const [isStart,setIsStart] = useState(false)
 const [ballX,setBallX] = useState( width / 2);
 const [ballY,setBallY] = useState( height / 2);
 const [gameScore,setGameScore] = useState({player1:{},player2:{}})
 const [paddleLeftY,setpaddleLeftY] = useState(height / 2 - paddleHeight / 2)
 const [paddleRightY,setpaddleRightY] = useState(height / 2 - paddleHeight / 2)
 const [who,setWho]  = useState("0 : 0")
 const [pos,setPos] = useState("");
 const [trayy,setTrayy] = useState(0.500)
 const [chat,setChat] = useState([]);
 const [end,setEnd] = useState(false);

    const user = useSelector((state: any) => state.user);

    const navigate = useNavigate();
  
    const canvasRef = useRef<HTMLCanvasElement>(null);
    
    let animationFrameId: number;
    let paddleSpeed = 8;
    let ballSpeed = 4;
    let paddleWidth = 20;
    let ballRadius = 10;
  
    let ballDeltaX = ballSpeed;
    let ballDeltaY = ballSpeed;
    const [player,setPlayer] = useState(0);
  
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
    const handleMouseMove = (event) => {
      setTimeout(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const y = event.pageY;
      const rect = canvas.getBoundingClientRect();
      const scrollY = window.scrollY || window.pageYOffset;
      const top = rect.top + scrollY;
      const bottom = rect.bottom + scrollY;
      
      if (y < top || y > (bottom - (paddleHeight))) return;
      
      const tray = (y - top) / canvas.clientHeight;
      // console.log(tray);
        
        socket.emit('tray', tray);
      }, 40);
      };
  
      const movePaddle = (deltaY: number) => {
        if (pos === 'left') {
          const newPaddleLeftY = paddleLeftY + 1  / 1080;
            socket.emit('tray',0.25 );
        } else {
          const newPaddleRightY = paddleRightY + 1 / 1080;
          
            socket.emit('tray',0.25);
            //paddleRightY = newPaddleRightY;
        }
      };
      function handleKeyDown(event) {
        if (event.key === 'w') {
          calculateTray('up');
          // console.log(trayy);
          socket.emit('tray', calculateTray('up'));
        } else if (event.key === 's') {
          calculateTray('down');
          // console.log(trayy);
          socket.emit('tray', calculateTray('down'));
        }
      }
      
      function handleKeyUp(event) {
        if (event.key === 'w' || event.key === 's') {
          //setTrayy(0);
          socket.emit('tray', trayy);
        }
      }
      
      function calculateTray(direction) {
        const trayIncrement = 0.1;
        const trayMax = 1;
        const trayMin = 0;
        let tray = 0;
        if (direction === 'up') {
         tray =  Math.max(trayMin, trayy - trayIncrement);
        } else if (direction === 'down') {
          tray =  Math.min(trayMax, tray + trayIncrement);
        }
      // console.log("call=>",tray);
      
        return tray;
      }
  
  useEffect(()=>{
    setTimeout(() => {
      
      //console.log(ballX,ballY);
      
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
      drawPaddle(ctx, 0 + 10, paddleLeftY);
      drawPaddle(ctx, (width - paddleWidth) - 10, paddleRightY);
    
      // Draw ball
      drawBall(ctx, ballX, ballY);
    },50);
  
  },[ballX,ballY,paddleLeftY,paddleRightY,trayy,width,height,paddleHeight]);
    useEffect(() => {
        socket.onopen = function(event) {
          // console.log('Connected to the server');
          
          // Send data to the server
          const data = user;
          socket.send(data);
        };
        socket.on('connect', () => {
           console.log('Connected to server');
        });
    
        socket.on('info', (data) => {
            console.log("info",data);
            
          //setUser(data.user);
        });
    
            // Set up keyboard listeners
            window.addEventListener('resize',()=>{
              setWidth((window.innerWidth / 2));
              setheight((window.innerHeight / 2));
            })
            document.addEventListener('keydown', handleKeyDown);
            document.addEventListener('keyup', handleKeyUp);
            document.addEventListener('mousemove',handleMouseMove);
            // document.addEventListener('mousedown',handleMouseMove);
            document.addEventListener('touchmove',handleMouseMove);
            document.addEventListener('mouseleave',handleMouseMove);
            socket.on('ball', (data)=>{
                setBallX(((data.x * width)/1920))
                setBallY(((data.y * height)/1080))
                socket.timeout(100);
                socket.volatile;
          
        });
        socket.on('score', (data)=>{
          // console.log("score=>",data);
          setGameScore(data)
            setWho( data.player1.score + " : " + data.player2.score);
          
          
        });
        socket.on('tray', (pos,id, tray)=>{
          //console.log("trey=>",id, pos,tray);
          socket.timeout(100)
          setTrayy(tray);
          if(pos === "left")
            setpaddleLeftY(tray * height);
          else
            setpaddleRightY(tray * height);
          // if(user.id == id)
          //setPlayer(data);
    
          
        });
        socket.on('disconnect', (data)=>{
          console.log("disconnect=>",data);
          socket.close();
          
        });
        socket.on('chat',(data)=>{
          console.log("chatt",data);
          
        })
    
        return () => {
         //rs
         document.removeEventListener('mousemove',handleMouseMove)
         document.removeEventListener('keydown', handleKeyDown);
         document.removeEventListener('keyup', handleKeyUp);
        document.removeEventListener('mouseleave',handleMouseMove);
         console.log("socket closed");
         socket.off('room')
         socket.off('ball')
         socket.disconnect();
         socket.close()
         //socket.off();
          //socket.disconnect();
        };
      }, []);

      const colors = [
        { name: 'Gray', value: 'bg-gray-800' },
        { name: 'Red', value: 'bg-red-500' },
        { name: 'Blue', value: 'bg-blue-500' },
        { name: 'Green', value: 'bg-green-500' },
        // Add more color options as needed
      ];
      
        const [selectedColor, setSelectedColor] = useState(colors[0].value); // Set initial color
      
        const handleColorChange = (event) => {
          setSelectedColor(event.target.value);
        };
      
  return (
    <>
    <div className={`flex flex-col items-center ${selectedColor}`}>
     <select
        className="w-[10%] justify-start self-start text-white text-lg mt-4 bg-gray-800 border-2 border-white rounded p-2 focus:outline-none"
        value={selectedColor}
        onChange={handleColorChange}
      >
        {colors.map((color) => (
          <option key={color.value} value={color.value}>{color.name}</option>
        ))}
      </select>
    <h2 className="text-white text-3xl py-4">Score: {who}</h2>
    <h3 className="text-white text-2xl py-2">{name1} vs {name2}</h3> 
    <div className="flex justify-center items-center h-screen">
      <canvas
        ref={canvasRef}
        className="border-2 border-white"
        width={width}
        height={height}
      />
    </div>
  </div>
  </>

  )
}

export default Game