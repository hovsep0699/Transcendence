import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import photo from "@SRC_DIR/assets/images/pong.jpg";
import Layout from "./Layout";
import { useSelector } from "react-redux";
import { store } from "./redux";
import LayoutProvider from "./LayoutProvider";
import { ip } from "./utils/ip";



const Home = () => {
  const user = useSelector((state: AppState) => state.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (user == null) {
      navigate("/", { replace: true });
      //return null
    }
  }, []);
  console.log("useerrrr", store.getState());


  return (
    <LayoutProvider zIndex={4}>
      <div className=" eye shape-1 text-slate-700 text-3xl flex justify-center items-center"></div>
      <div className="eye shape-2 text-slate-800 text-3xl flex justify-center items-center"></div>
      <div className=" eye shape-3 text-slate-700 text-3xl flex justify-center items-center"></div>
      <div className="eye shape-4 text-slate-800 text-3xl flex justify-center items-center"></div>
      <Link
        to="/gg"
        className="relative bg-[#212121] hover:bg-[#181818] text-[#aaaaaa] font-bold py-5 px-16 rounded-2xl"
      >
        The Game Play
      </Link>
    </LayoutProvider>
  );
};

export default Home;
