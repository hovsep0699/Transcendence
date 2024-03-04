import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import profile from "@SRC_DIR/assets/images/profile.svg";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ip } from "./utils/ip";
import LayoutProvider from "./LayoutProvider";
import Modal from "./Chat/Modal";

const Contacts = () => {
  const user = useSelector((state: AppState) => state.user);
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [allUsers, setAllUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const fetchAllUsers = () => {
    fetch(`${ip}:7000/users`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Request failed");
        }
        return response.json(); // assuming the server returns JSON data
      })
      .then((data) => {
        console.log(data);

        setAllUsers(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    fetchAllUsers();
  }, []);
  useEffect(() => {
    if (user == null) navigate("/", { replace: true });
    else {
      fetch(`${ip}:7000/friends/${user.id}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Request failed");
          }
          return response.json(); // assuming the server returns JSON data
        })
        .then((data) => {
          setContacts(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query === "") {
      setSuggestions([]);
      return;
    }

    fetch(`${ip}:7000/users`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Request failed");
        }
        return response.json();
      })
      .then((data) => {
        //  console.log(data);

        const regex = new RegExp(".*" + e.target.value + ".*", "i");

        setSuggestions(
          data.filter((obj) => {
            return regex.test(obj.displayname);
          })
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const filteredContacts = contacts.filter((elem) =>
    elem.user.displayname.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const addFriend = () => {
    if (!selectedUser) return;
    const values = {
      userid: user.id,
      friendid: selectedUser.id,
    };

    fetch(`${ip}:7000/friends`, {
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
        // console.log(data);
      })
      .catch((error) => {
        console.log(error);
        alert("The user is already in your friend list just refresh the page");
        window.location.reload();
      });
  };

  const removeFriend = () => {
    if (!selectedUser) return;
    console.log(filteredContacts);

    // console.log("friendif: ", selectedUser);

    // console.log(selectedUser.id);
    // console.log(user.id);

    fetch(`${ip}:7000/friends/${user.id}/${selectedUser.id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Request failed");
        }
        console.log(response);
        return; // assuming the server returns JSON data
      })
      .then((data) => {
        // console.log(data);
        // window.location.reload();
        // console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <LayoutProvider scrollable={true}>
      <div className="flex flex-col h-full p-5 w-full">
        <div className="relative flex w-full flex-col">
          <h1 className="text-2xl font-bold ">Contacts</h1>
        </div>
        <div className="flex flex-col justify-center items-center w-full px-5">
          <input
            type="text"
            className="border-2 border-transparent outline-none rounded px-4 py-2 w-1/2 hover:border-[#585858] bg-[#46464636] backdrop-blur rounded-xl"
            placeholder="Search contacts"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
            <div className="mt-5 flex flex-col w-full p-5 bg-[#46464636] justify-center shadow items-center backdrop-blur rounded-xl overflow-y-scroll">
              <div className="flex flex-col text-3xl">Contacts</div>
              <div
                className="flex flex-row flex-wrap h-full justify-start items-start w-full p-5"
                style={{ maxHeight: "70vh" }}
              >
                { filteredContacts.length ? filteredContacts.map((elem, key) => (
                  <div
                    key={key}
                    className="flex p-3 w-1/3 justify-center rounded-xl items-center hover:cursor-pointer hover:bg-[#46464636]"
                    onClick={() => {
                      setSelectedUser(elem.user);
                      setOpen(true);
                    }}
                  >
                    <div key={elem.user.id} className="flex flex-col">
                      <div className="flex flex-col justify-center items-center mb-2">
                        <img
                          src={elem.user.avatarurl}
                          alt="Avatar"
                          className="object-cover w-32 h-32 rounded-full"
                        />
                      </div>
                      <div className="flex flex-col">
                        <div className="flex flex-row justify-center text-lg font-bold  break-all text-center">
                          {elem.user.status==0 ? 
                          <p className="text-red-500 text-2xl">•</p>
                          : elem.user.status==1 ?
                          <p className="text-green-500 text-2xl">•</p>
                          : elem.user.status==2 ?
                          <p className="text-yellow-500 text-2xl">•</p>:<></>
                          }
                          <p className="ml-3">{elem.user.displayname}</p>
                        </div>
                        <p className="text-gray-400  break-all text-center">
                          {elem.user.email ? elem.user.email : "Hidden"}
                        </p>
                      </div>
                    </div>
                  </div>
                )) : (<></>)}
                <div className="flex flex-col w-full justify-center items-center py-5 text-3xl">
                  Suggestions
                </div>
                {suggestions.length ? (
                  <>
                    {suggestions.map((elem, key) => (
                      <div
                        key={key}
                        className="flex p-3 w-1/3 justify-center rounded-xl items-center hover:cursor-pointer hover:bg-[#46464636]"
                        onClick={() => {
                          setSelectedUser(elem);
                          setOpen(true);
                        }}
                      >
                        <div key={elem.id} className="flex flex-col">
                          <div className="flex flex-col justify-center items-center mb-2">
                            <img
                              src={elem.avatarurl}
                              alt="Avatar"
                              className="object-cover w-32 h-32 rounded-full"
                            />
                          </div>
                          <div className="flex flex-col">
                            <div className="text-lg font-bold  break-all text-center">
                              {elem.displayname}
                            </div>
                            <p className="text-gray-400  break-all text-center">
                              {elem.email ? elem.email : "Hidden"}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </>
                ) : (
                  <>
                    {allUsers.map((elem, key) => (
                      <div
                        key={key}
                        className="flex p-3 w-1/3 justify-center rounded-xl items-center hover:cursor-pointer hover:bg-[#46464636]"
                        onClick={() => {
                          setSelectedUser(elem);
                          setOpen(true);
                        }}
                      >
                        <div key={elem.id} className="flex flex-col">
                          <div className="flex flex-col justify-center items-center mb-2">
                            <img
                              src={elem.avatarurl}
                              alt="Avatar"
                              className="object-cover w-32 h-32 rounded-full"
                            />
                          </div>
                          <div className="flex flex-col">
                            <div className="text-lg font-bold  break-all text-center">
                              {elem.displayname}
                            </div>
                            <p className="text-gray-400  break-all text-center">
                              {elem.email ? elem.email : "Hidden"}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </>
                )}
              </div>
            </div>
        {selectedUser ? (
          <Modal
            open={open}
            onClose={() => setOpen(false)}
            contentClassName={"bg-[#46464636] backdrop-blur h-[50%]"}
          >
            <div className="flex flex-row p-5 justify-between items-center rounded-xl">
              <div key={selectedUser.id} className="flex flex-col">
                <div className="flex justify-center items-center p-5">
                  <img
                    src={selectedUser.avatarurl}
                    alt="Avatar"
                    className="object-cover w-32 h-32 rounded-full"
                  />
                </div>
                <div className="flex flex-col">
                  <p className="text-lg font-bold  break-all text-center">
                    {selectedUser.displayname}
                  </p>
                  <p className="text-gray-400  break-all text-center">
                    {selectedUser.email ? selectedUser.email : "Hidden"}
                  </p>

                  <div className="self-center h-full">
                    <div className="flex flex-col w-full ">
                      {!(selectedUser &&
                      filteredContacts.find(
                        (obj) => obj.user.id == selectedUser.id)
                      ) ? (
                        <button
                          className="mt-5 flex justify-end items-center m-0 px-10 py-3 bg-green-900"
                          onClick={addFriend}
                        >
                          Add Friend
                        </button>
                      ) : (
                        <button
                          className="mt-5 flex justify-end m-0 items-center px-10 py-3 bg-red-900"
                          onClick={removeFriend}
                        >
                          Remove Friend
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col p-5">
                <div className="p-1">
                  <h4 className="text-xs md:text-lg text-white font-bold">
                    Game Info
                  </h4>
                  <ul className="mt-2 text-gray-400">
                    <li className="flex border-b py-2">
                      <span className="font-bold w-24">Total:</span>
                      <span className="text-gray-300">{`${
                        selectedUser.wins + selectedUser.losses
                      }`}</span>
                    </li>
                    <li className="flex border-b py-2">
                      <span className="font-bold w-24">Wins:</span>
                      <span className="text-gray-300">{selectedUser.wins}</span>
                    </li>
                    <li className="flex border-b py-2">
                      <span className="font-bold w-24">Loses:</span>
                      <span className="text-gray-300">{selectedUser.losses}</span>
                    </li>
                    <li className="flex border-b py-2">
                      <span className="font-bold w-24">Win Ratio:</span>
                      <span className="text-gray-300">
                        {(selectedUser.wins + selectedUser.losses) ? (
                          Math.round(
                            (selectedUser.wins /
                              (selectedUser.wins + selectedUser.losses)) *
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
          </Modal>
        ) : (
          <></>
        )}
      </div>
    </LayoutProvider>
  );
};

export default Contacts;
