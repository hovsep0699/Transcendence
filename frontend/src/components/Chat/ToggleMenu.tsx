import React, { useEffect, useState } from "react";
import ChatInfo from "./ChatInfo";
import Modal from "./Modal";
import { ip } from "../utils/ip";

const ToggleMenu = ({ className = null, role, user, other, otherMuted, setOtherMuted, getRole, channel }) => {
  const [open, setOpen] = useState(false);
  const [muted, setMuted] = useState(false)

  useEffect(() => {
    console.log("user: ", user);
    console.log("other: ", other);
    console.log("toggle: ", open);
  }, [open]);
  const removeAdmin = () => {
    // const values = {
    //     userid: other.user.id,
    //     channelid: channel.id,
    //     callinguserid: user.id
    // };
    fetch(`${ip}:7000/channeladmins/${user.id}/${channel.id}/${other.user.id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Request failed");
          }
          
          return; // assuming the server returns JSON data
        })
        .then((data) => {
            window.location.reload();
        //   setUpdateAdmin(!updateAdmin);
          // console.log(data);
        })
        .catch((error) => {
          // console.log(error);
        });
  };

  const fetchMuted = ()=>{
    if (!other.user) return;
    if (!channel) return;

    // console.log("oooooo: ", other);
    fetch(`${ip}:7000/mutelist/${channel.id}/${other.user.id}`, {
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Request failed");
        }
        return response.json(); // assuming the server returns JSON data
      })
      .then((data) => {
        console.log("mutedOth: ", data);
        
        setMuted(data.muted);
        // setSended(!sended);
        // console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  const setToAdmin = () => {
    console.log(other);
    
    const values = {
        userid: user.id,
        channelid: channel.id,
        adminid: other.user.id
    };
    fetch(`${ip}:7000/channeladmins`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Request failed");
          }
          
          return response.json(); // assuming the server returns JSON data
        })
        .then((data) => {
            window.location.reload();
        //   setUpdateAdmin(!updateAdmin);
          // console.log(data);
        })
        .catch((error) => {
          // console.log(error);
        });
  };
  const kickUser = () => {
    fetch(`${ip}:7000/channelusers/${user.id}/${channel.id}/${other.user.id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Request failed");
          }
          
          return; // assuming the server returns JSON data
        })
        .then((data) => {
            window.location.reload();
        //   setUpdateAdmin(!updateAdmin);
          // console.log(data);
        })
        .catch((error) => {
          // console.log(error);
        });
        removeAdmin();
  };
  useEffect(()=>{
    fetchMuted();
  })


  const muteUser = () => {
    const values = {
        userid: other.user.id,
        channelid: channel.id,
        callinguserid: user.id
    };
    fetch(`${ip}:7000/mutelist/mute`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values)
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Request failed");
          }
          
          return; // assuming the server returns JSON data
        })
        .then((data) => {
            window.location.reload();
        //   setUpdateAdmin(!updateAdmin);
          // console.log(data);
        })
        .catch((error) => {
          // console.log(error);
        });
  };
  const unMuteUser = () => {
    const values = {
        userid: other.user.id,
        channelid: channel.id,
        callinguserid: user.id
    };
    console.log("val: ", values);
    
    fetch(`${ip}:7000/mutelist/unmute`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values)
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Request failed");
          }
          
          return; // assuming the server returns JSON data
        })
        .then((data) => {
            // console.log("dtaa: ", data);
            
            window.location.reload();
        //   setUpdateAdmin(!updateAdmin);
          // console.log(data);
        })
        .catch((error) => {
          // console.log(error);
        });
  };
  const leave = () => {
    console.log(other);
    
    const values = {
        userid: user.id,
        channelid: channel.id,
    };
    fetch(`${ip}:7000/channels/leave`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Request failed");
          }
          
          return; // assuming the server returns JSON data
        })
        .then((data) => {
            window.location.reload();
        //   setUpdateAdmin(!updateAdmin);
          // console.log(data);
        })
        .catch((error) => {
          // console.log(error);
        });
  };

  return (
    <div className="flex">
      {(user && other) && ((role != "owner" && getRole(other.role) == "owner") ||
      (role == "user" && other.user && user.id != other.user.id) || (role == 'admin' && getRole(other.role) == 'admin' && other.user && user.id != other.user.id)) ? (
        <></>
      ) : (
        <>
          {user && other && other.user && user.id == other.user.id ? (
            <div
              className="bg-red-900 p-2 w-full rounded-xl border-2 border-transparent hover:border-[#585858]"
              onClick={leave}
            >
              Leave
            </div>
          ) : (
            <>
              <ChatInfo
                isSelectedUser={true}
                selectChat={() => setOpen(!open)}
              />
              <Modal
                contentClassName={"backdrop-blur bg-transparent"}
                open={open}
                onClose={() => setOpen(false)}
              >
                <div className="flex flex-col">
                  <div className="flex flex-col w-full py-3">
                    <div
                      className="flex flex-row py-4 px-4 w-full justify-center items-center"
                      style={{ width: "500px" }}
                    >
                      {/* {console.log(elem.channel)} */}
                      <div className="flex flex-row w-full  justify-start">
                        <div className="w-1/4">
                          {other.user && other.user.avatarurl ? (
                            <img
                              src={other.user.avatarurl}
                              alt=""
                              srcSet=""
                              className="object-cover h-12 w-12 rounded-full"
                            />
                          ) : (
                            <div className="object-cover h-12 w-12 justify-center flex items-center rounded-full bg-gray-800">
                              {other.user ? other.user.displayname.charAt(0).toUpperCase() : ''}
                            </div>
                          )}
                        </div>
                        <div className="ml-2 flex flex-row w-full">
                          <div className="text-lg break-all font-semibold">
                            {other.user ? other.user.displayname : ''}
                          </div>
                        </div>
                        <div className="flex justify-center items-center">
                          {getRole(other.role)}
                        </div>
                      </div>
                    </div>
                  </div>
                  <ul className="flex flex-col justify-center items-center p-5">
                    {role == "owner" || role == "admin" ? (
                      <>
                        {role == "owner" ? (
                          <>
                            {getRole(other.role) == "admin" ? (
                              <li
                                className="mt-2 bg-red-900 p-2 w-full rounded-xl border-2 border-transparent hover:border-[#585858]"
                                onClick={removeAdmin}
                              >
                                Remove Admin
                              </li>
                            ) : (
                              <li
                                className="mt-2 bg-red-900 p-2 w-full rounded-xl border-2 border-transparent hover:border-[#585858]"
                                onClick={setToAdmin}
                              >
                                Set To Admin
                              </li>
                            )}
                          </>
                        ) : (
                          <></>
                        )}
                        {}
                        <li
                          className="mt-2 bg-red-900 p-2 w-full rounded-xl border-2 border-transparent hover:border-[#585858]"
                          onClick={kickUser}
                        >
                          Kick User
                        </li>
                        {!muted ? (
                        <li
                          className="mt-2 bg-red-900 p-2 w-full rounded-xl border-2 border-transparent hover:border-[#585858]"
                          onClick={muteUser}
                        >
                          Mute User
                        </li>

                        ) : (

                        <li
                          className="mt-2 bg-red-900 p-2 w-full rounded-xl border-2 border-transparent hover:border-[#585858]"
                          onClick={unMuteUser}
                        >
                          Unmute User
                        </li>
                        )}

                      </>
                    ) : (
                      <></>
                    )}
                  </ul>
                </div>
              </Modal>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default ToggleMenu;
