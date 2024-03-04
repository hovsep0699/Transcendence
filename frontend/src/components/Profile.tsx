import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import profile from "@SRC_DIR/assets/images/profile.svg";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser, store } from "./redux";
import { ip } from "./utils/ip";
import LayoutProvider from "./LayoutProvider";
import FileUploadForm from "./file/fileUpload";
import Nick from "./nickname/nickname";

const get_game_info = async (param: object) => {
  let res = await fetch(`${ip}:7000/game/user/${param.id}`);
  console.log(res);

  return res;
};

const Profile = () => {
  const user = useSelector((state: AppState) => state.user);
  const userByID = user;
  const [TFA, setTFA] = useState(user.istwofactorenabled);
  const [TFAEmail, setTFAEmail] = useState(user.twofactoremail);
  const [modal, setmodal] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [nick, setNick] = useState(false);
  let games = [];
  const fetchTFA = () => {
    if (!user) {
      navigate("/", { replace: true });
      return;
    }
    if (TFA) {
      const params = {
        userid: user.id,
        email: TFAEmail,
      };
      console.log(JSON.stringify(params));

      fetch(`${ip}:7000/twofactor/enable`, {
        method: "POST",
        // mode:'no-cors',
        body: JSON.stringify(params),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          console.log("enabled?");
          console.log(response);
          if (!response.ok) return;
        })
        .then((data) => {
          dispatch(
            setUser({
              ...user,
              istwofactorenabled: true,
            })
          );
          console.log("enabled?");
          console.log(data);
          console.log("user: ", user);
        })
        .catch((error) => {
          console.log("error: ", error);

          // Handle any errors that occur during the request
          console.log(error);
        });
    } else {
      const params = {
        userid: user.id,
      };
      fetch(`${ip}:7000/twofactor/disable`, {
        method: "POST",
        // mode:'no-cors',
        body: JSON.stringify(params),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          console.log("enabled?");
          console.log(response);

          if (!response.ok) return;
        })
        .then((data) => {
          console.log("disabled?");
          console.log(data);
          console.log("user: ", user);
          dispatch(
            setUser({
              ...user,
              istwofactorenabled: false,
            })
          );
        })
        .catch((error) => {
          console.log("error: ", error);

          // Handle any errors that occur during the request
          console.log(error);
        });
    }
  };
  let scores = {
    ScoreWins: 10,
    ScoreLoses: 5,
  };
  // fetch(`${ip}:7000/game/${user.id}/scores`, {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify(scores),
  // })
  // .then((response) => {
  //   if (!response.ok) {
  //     throw new Error("Request failed");
  //   }
  //   return response.json(); // assuming the server returns JSON data
  // })
  // .then((data) => {
  //   scores = data;
  // })
  // .catch((error) => {
  //   console.log(error);
  // });

  useEffect(() => {
    console.log("TFA: ", TFA);
    console.log("modddalll", modal);
  }, [modal, nick]);
  useEffect(() => {
    fetchTFA();
  }, [TFA]);
  // useEffect(()=>{
  //     if(user == null)
  //     {
  //         navigate("/",{replace:true})
  //         //return null
  //     }
  //     else{

  //         fetch(`${ip}:7000/game/user/${user.id}`)
  //         .then(response => {
  //             if (!response.ok) {
  //               throw new Error('Request failed');
  //             }
  //             return response.json(); // assuming the server returns JSON data
  //           })
  //           .then(data => {
  //             // Process the response data
  //             games = data.data
  //             console.log(games,Object.keys(games).length);

  //             //console.log(data);
  //           })
  //           .catch(error => {
  //             // Handle any errors
  //             console.log(error);
  //           });
  //     }
  //     /*  const  game_info = get_game_info(user);
  //     console.log("game info",game_info); */
  // },[])
  // console.log("useerrrrprofile",store.getState());
  const handleModalOpen = () => {
    setmodal(true);
  };
  return (
    <LayoutProvider>
      <div className="flex flex-col">
        <div className="flex flex-row justify-center items-center" style={{ width: "100%"}}>
          <div
            className="flex flex-col items-center"
            style={{ width: "30%", height: "100%" }}
          >
            <div className="mt-2">
              <button
                className=" w-10 m-0 bottom-0 right-0 bg-gray-200 rounded-full p-2 hover:bg-gray-300"
                onClick={() => setmodal(true)}
              >
              ✎
              </button>
              <img
                src={user.avatarurl}
                className="object-cover border-4 border-white rounded-full"
                style={{ width: "90%", height: "80%" }}
              />
            </div>
            <p className="text-2xl text-center">{user.displayname}</p>
            <button
                className=" w-10 m-0 bottom-0 right-0 bg-gray-200 rounded-full p-0 hover:bg-gray-300"
                onClick={() => setNick(!nick)}
              >
              ✎
              </button>
          </div>
          <FileUploadForm open={modal} onClose={() => setmodal(false)} />
          <Nick open={nick} onClose={() => setNick(false)} />
          <div className="flex flex-col">
            <div
              className="flex p-2 items-center hover:cursor-pointer"
              style={{ width: "40%" }}
              onClick={() => setTFA(prev => !prev)}
            >
              <div className="flex flex-col justify-center items-center self-start py-3">
                <span className="text-lg font-bold p-3">TFA: </span>
              </div>
              <div className="flex items-center relative w-max cursor-pointer select-none justify-end">
                <input
                  type="checkbox"
                  checked={TFA}
                  onChange={(e) => {
                    setTFA(e.target.value == "on");
                  }}
                  className="appearance-none transition-colors m-0 cursor-pointer outline-none w-14 rounded-full focus:outline-none  bg-red-500 checked:bg-green-600"
                />
                <span className="absolute font-medium text-xs uppercase right-1 text-white">
                  {" "}
                  OFF{" "}
                </span>
                <span className="absolute font-medium text-xs uppercase right-8 text-white">
                  {" "}
                  ON{" "}
                </span>
                <span
                  className={`w-7 h-7 ${
                    TFA ? "right-0" : "right-[1.8rem]"
                  } top-[0.1rem] absolute rounded-full transform transition-transform bg-gray-200 `}
                />
              </div>
            </div>

            {/* {TFA ? ( */}
            <div className="" style={{ width: "80%", height: "50%" }}>
              <div className="flex flex-col justify-center items-center">
                Two Factor Email
              </div>

              <div className="flex flex-col">
                <form>
                  <input
                    type="email"
                    onChange={(e) => {
                      setTFAEmail(e.target.value);
                    }}
                    name="email"
                    id=""
                    value={TFAEmail}
                    placeholder="TFA Email"
                    className="bg-[#212121] border-2 border-transparent hover:border-2 outline-none hover:border-[#313131] text-[#aaaaaa] rounded-xl"
                    required
                  />
                  <button
                    // type="submit"
                    className="m-2 py-2 text-sm bg-[#212121] hover:bg-[#313131] rounded-xl text-[#aaaaaa]"
                    style={{ width: "50%" }}
                    onClick={() => setTFA((prevstate) => !prevstate)}
                  >
                    Save changes
                  </button>
                </form>
              </div>
            </div>
            {/* ) : (<></>)} */}
          </div>
        </div>
      </div>

      <div
        className="grid grid-flow-col text-xs md:text-sm bg-[#8a828236] backdrop-blur border-2 border-[#585858] rounded-t-lg shadow-xl  mt-10"
        style={{ maxHeight: "40vh", minWidth: "20%" }}
      >

        <div className="flex flex-col">
          <div className="p-8">
            <h4 className="text-xs md:text-lg text-white font-bold">
              Game Info
            </h4>
            <ul className="mt-2 text-gray-400">
              <li className="flex border-b py-2">
                <span className="font-bold w-24">Total:</span>
                <span className="text-gray-300">{`${
                  user.wins + user.losses
                }`}</span>
              </li>
              <li className="flex border-b py-2">
                <span className="font-bold w-24">Wins:</span>
                <span className="text-gray-300">{user.wins}</span>
              </li>
              <li className="flex border-b py-2">
                <span className="font-bold w-24">Loses:</span>
                <span className="text-gray-300">{user.losses}</span>
              </li>
              <li className="flex border-b py-2">
                <span className="font-bold w-24">Win Ratio:</span>
                <span className="text-gray-300">
                  {(user.wins + user.losses) ? (
                    Math.round(
                      (user.wins /
                        (user.wins + user.losses)) *
                        100
                    )
                  ) : (
                    0
                  )}
                  %
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </LayoutProvider>
  );
};

export default Profile;
