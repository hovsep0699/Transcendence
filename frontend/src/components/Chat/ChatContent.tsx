import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import { ip } from '../utils/ip';

function ChatContent({selectedUser,socket}) {
    const user = useSelector((state: AppState) => state.user);
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedUserName, setSelectedUserName] = useState("");
  const [messages, setMessages] = useState([]);
  const [dmMessage, setDMMessage] = useState("");
 const [sended, setSended] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);

  
      useEffect(()=>{
    //console.log("[[[[[[[[[[[[]]]]]]]]]]]]]]]]");
        if(socket)
          return;
        //socket.connect()
        socket.on("connection",(data)=>{
          console.log("conectionnnnn");
        })
        return()=>{
          socket.close();
          //socket.disconnect();
        }
      },[socket])
  
       // Update the server URL and namespace
      //  let width  =600;
      //  let height = 300;
      //  let paddleHeight = ((200 * height) / 1080) /2;
    //const [room, setRoom] = useState(null);
    const [inputValue, setInputValue] = useState('');
    const [isStart,setIsStart] = useState(false);
    // const [pos,setPos] = useState("");
    // const [chat,setChat] = useState([]);
    // const [end,setEnd] = useState(false);
    // const [players,setPlayers] = useState([]);
    const [player1,setPlayer1] = useState("player1");
    const [player2,setPlayer2] = useState("player2");
    const [winner,setWinner]  =useState({});
  
  
  
    // useEffect(()=>{
  
    //   console.log("wiinnn");
      
    // },[winner])
  
    const [num,setNum] = useState(0);
    const [newmess,setNewmess] = useState([]);
    let i = 0
  
  useEffect(()=>{
  
    //console.log("[[[[[[[[[[[[]]]]]]]]]]]]]]]]");
    socket.connect()
  
      socket.on("connection",(data)=>{
        console.log("conectionnnnn");
      })
      socket.on('info', (data) => {
        console.log("infoo");
        
        console.log("info",data);
        
        
    });
    socket.on(`chat/${user.id}`,(data)=>{
      
      // setSelectedUser(selectedUser);
      if(selectedUser.id !== data.senderid)return;
      console.log("ddddddddddddddddddddddddddddddddddddddddddddddddd");
        const obj = {senderid:data.senderid, msg:data.msg,publishdate:Date()}
     //fetchMessages();
        setNewmess(prev => [...prev,obj]);
        //setMessages(prev => [...prev,obj])
        
        
      console.log(data);
      
      // if(Object.keys(selectedUser).length == 0) return
      // if(selectedUser.id != data.sender.id)return
     // console.log(data);
    //  let arr = newmess;
    //  arr.pop()
    //  arr.push(obj)
    //  setNewmess(prev => [...prev,arr]);
     console.log(newmess);
      
      //senderid: 40, message: 'barev', publishdate: '2023-07-07T07:14:37.655Z'
      
      
    })
    
    return () => {
      console.log("socket closed");
      socket.off('room')
      socket.off(`chat/${user.id}`);
      socket.off('info')
      //socket.close()
      socket.disconnect();
      //socket.off();
       //socket.disconnect();
     };
  },[selectedUser])
  
  useEffect(() => {
    console.log("----------------------------");
  
    // setSelectedUser(selectedUser)
    //socket.emit('chat',{userid:user.id ,msg:"lorem ipsum"})
    
      // socket.onopen = function(event) {
      //     // console.log('Connected to the server');
          
      //     // Send data to the server
      //     const data = user;
      //     socket.send(data);
      //   };
      // socket.on('connect', () => {
      //    console.log('Connected to server');
      // });
  
  
  
      socket.on('playerinfo',(data,data1)=>{
        
        console.log("sddsddsdsdsdsd",data,data1);
        setPlayer1(data.displayname);
        setPlayer2(data1.displayname);
        
      });
      //  console.log(";;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;");
      //  console.log(selectedUser.id);
      //  let idd = selectedUser.id
      // const recv = selectedUser;
      // setId(selectedUser.id ?? 0);
      // console.log(idd);
      //  console.log(";;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;");
      //console.log("iiiiiiiiiii",i++);
     
  
      socket.on('room', (code) => {
          
          console.log("room sdgddfdggrs");
          //console.log("ssssssssssssssssssss",data);
  
          // if(data == user.id)
          //   setPos("left");
          // else
          //   setPos("right");
          if(!isStart)
          {
            socket.emit('start');
            setIsStart(true);
            
          }
      });
  
      socket.on('stop', (data)=>{
        console.log("stop=>",data);
        setWinner(data);
        setIsStart(false);
        setEnd(true);
       // window.location.reload();
        socket.close();
        
        
      });
      socket.on('disconnect', (data)=>{
        console.log("disconnect=>",data);
        socket.close();
        
      });
      return () => {
       console.log("socket closed");
       socket.off('room')
       //socket.off('info')
       //socket.off(`chat/${user.id}`);
       //socket.disconnect();
       socket.close()
       //socket.off();
        //socket.disconnect();
      };
    }, [selectedUser]);
  
    const joinQueue = () => {;
      console.log("dddafswfwf",user);
      
      socket.emit('queue',{data:user});
    };
  
    const joinRoom = () => {
      socket.emit('room', inputValue);
    };
  
    const ready = () => {
      socket.emit('ready', {});
    };
  
    const startGame = () => {
      console.log("havayiiiiiiiiiiiiiiiiiiiii");
      
     // socket.emit('start');
    };
  
      // useEffect(() => {
      //     const onConnect = () => {
      //         console.log("CONNECTED")
      //     }
  
      //     const onOnline = (p) => {
      //         console.log("ONLINE", p)
      //     }
  
      //     socket.on("connect", onConnect);        
      //     socket.on("online", onOnline);
  
      //     socket.emit("online", { msg: "Hello, world!!!" })
      //     return () => {
      //         socket.off("connect", onConnect);
      //         socket.off("online", onOnline);
      //         //socket.off('chat');
      //     }
      // }, []);
  
    //   useEffect(() => {
  
    //       if (user == null) 
    //           navigate("/", { replace: true });
    //       else {
    //         fetch(`${ip}:7000/friends/${user.id}`)
    //           .then((response) => {
    //             if (!response.ok) {
    //               throw new Error("Request failed");
    //             }
    //             return response.json(); // assuming the server returns JSON data
    //           })
    //           .then((data) => {
    //             setContacts(data);
    //           })
    //           .catch((error) => {
    //             console.log(error);
    //           });
    //       }
    //     }, []);

  return (
      <>
      {newmess && newmess.map((elem)=>( 
          <p className="ml-2 py-3 max-w-[480px] break-all px-4 bg-[#1b1a10] rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white">{elem.msg}</p>
          ))}
    </>
  )
}

export default ChatContent