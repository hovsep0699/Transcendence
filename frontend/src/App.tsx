import React from "react";
import "./App.css";
import Home from "./components/Home";
import Profile from "./components/Profile";
import Contacts from "./components/Contacts";
import TheGame from "./components/TheGame";
import Chanels from "./components/Chanels";
import SignIn from "./components/SignIn";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Auth from "./components/Auth";
import Ft_Auth from "./components/Ft_Auth";
import { Provider, useSelector } from "react-redux";
import store from "./components/redux";
import Out from "./components/Out";
import ChannelComponent from "./components/Channels";
import PingPongGame from "./components/Pingpong";
import ChatComponent from "./components/ChatComponent";
import Chat from "./components/Chat/Chat";
import GameComponent from "./components/game/Game";
import GameOne from "./components/game/OneVOne";
import Pong from "./components/game/OneVOne";
import PingPong from "./components/game/OneVOne";
import CollapsibleMenu from "./components/Chat/CollapsibleMenu";

import { Link } from "react-router-dom";
import TwoFactorProvider from "./components/TwoFactorProvider";

import Pin from "./components/2Fa/Pin";
import Game from "./components/game/gametest";
import MatchmakingGame from "./components/game/match";
import GameMatch from "./components/game/Pong";
import { Store } from "redux";
import { io } from "socket.io-client";
import { ip } from "./components/utils/ip";
import FileUploadForm from "./components/file/fileUpload";
import Nick from "./components/nickname/nickname";
import ChatComponent1 from "./components/Chat/testChat";
import ChatMsg from "./components/ChatMsg";
import Chat4 from "./components/Chat";
import Test from "./components/Chat/testChat";
import NotFound from "./components/NotFound";
import ChatService from "./components/Chat/ChatService";

function App() {
  const user = useSelector((state: AppState) => state.user);
  console.log("Dsddsdsdds");
  const socket = io(`${ip}:4000/pong`, {
    auth: {
      headers: {
        USER: JSON.stringify({ user }),
      },
    },
  });

  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/home" element={<Home />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/channels" element={<ChannelComponent />} />
        <Route path="/profile" element={<Profile />} />
        {/* <Route path="/landing" element={<LandingPage />} /> */}
        <Route path="/auth" element={<Auth />} />
        <Route path="/twofactor" element={<TwoFactorProvider user={user} />} />
        <Route path="/ft_auth" element={<Ft_Auth />} />
        <Route path="/out" element={<Out />} />
        <Route path="/pin" element={<Pin />} />
        <Route path="/gg" element={<MatchmakingGame />} />
        {/* <Route path="/test" element={<FileUploadForm  />} />
        <Route path="/test2" element={<Nick />} /> */}
        <Route path="*" element={<NotFound/>}/>
        <Route path="chattest" element={<ChatService/>}/>
        {/* <Route path="/aa" element={<GameMatch/>}/> */}
      </Routes>
    </Router>
  );
}

export default App;
