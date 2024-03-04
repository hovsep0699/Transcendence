 import "./Chat.css";
import io from "socket.io-client";
import { useEffect, useState } from "react";
import MainChat from "./mainChat";
import React from "react";
import { ip } from "../utils/ip";
import { useSelector } from "react-redux";



function ChatService() {
    console.log("renderr");
    
  const user = useSelector((state: AppState) => state.user);

    /////////////////////////////socket consections/////////////////////
    const [isSocket, setIsSoket] = useState(false);
    const [socket, setSocket] = useState(io());
    if (isSocket == false) {
      setSocket(
        io(`${ip}:4001/ping`, {
          closeOnBeforeunload: true,
          protocols: "ws",
          secure: true,
          randomizationFactor: 0.8,
          transports: ["websocket"],
          autoConnect: false,
          auth: {
            headers: {
              USER: JSON.stringify({ user }),
            },
          },
        })
      );
      setIsSoket(true);
    }

    ////////////////////////////socket connections////////////////////
    
    
    ////////////////////////////socket listeners /////////////////////
    
      useEffect(() => {
        socket.connect()
        socket.onopen = function (event) {
          // console.log('Connected to the server');
    
          // Send data to the server
          const data = user;
          socket.send(data);
        };
        socket.on("connect", () => {
          console.log("Connected to server");
        });
    
        socket.on("info", (data) => {
          console.log("infoo");
    
          console.log("info", data);
        });
    
        // socket.on("playerinfo", (data, data1) => {
        //   console.log("sddsddsdsdsdsd", data, data1);
        //   setPlayer1(data.displayname);
        //   setPlayer2(data1.displayname);
        // });
    
        // socket.on("room", (code) => {
        //   console.log("room sdgddfdggrs");
        //   console.log("ssssssssssssssssssss",data);
    
        //   if(data == user.id)
        //     setPos("left");
        //   else
        //     setPos("right");
        //   if (!isStart) {
        //     socket.emit("start");
        //     setIsStart(true);
        //   }
        // });
    
        // socket.on("stop", (data) => {
        //   console.log("stop=>", data);
        //   setWinner(data);
        //   setIsStart(false);
        //   setEnd(true);
        //   // window.location.reload();
        //   //socket.close();
        // });
        socket.on("disconnect", (data) => {
          console.log("disconnect=>", data);
          socket.close();
        });
        socket.on("chat", (data) => {
          console.log("chatt", data);
        });
    
        return () => {
          console.log("socket closed");
          socket.off("room");
          socket.disconnect();
          socket.close();
          //socket.off();
          //socket.disconnect();
        };
      }, [socket]);
    
    ////////////////////////////socket listeners /////////////////////
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };

  return (
    <div className="chat">
      {!showChat ? (
        <div className="joinChatContainer">
          <h3>Join A Chat</h3>
          <input
            type="text"
            placeholder="John..."
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Room ID..."
            onChange={(event) => {
              setRoom(event.target.value);
            }}
          />
          <button onClick={joinRoom}>Join A Room</button>
        </div>
      ) : (
        <MainChat socket={socket} username={username} room={room} />
      )}
    </div>
  );
}

export default ChatService;