import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import { ip } from "../utils/ip";

const ModalSearch = ({channel, user}) => {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  
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
  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query === "") {
      setSuggestions([]);
      return;
    }

    const regex = new RegExp(".*" + e.target.value + ".*", "i");

    setSuggestions(
      allUsers.filter((obj) => {
        return regex.test(obj.displayname);
      })
    );
  };
  const addUser = (other)=>{
    const values = {
        callinguserid: user.id,
        channelid: channel.id,
        userid: other.id
    };
    console.log("val: ", other);
    
    fetch(`${ip}:7000/channelusers`, {
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
            alert("User already is in channel")
          // console.log(error);
        });
  }
  useEffect(() => {}, [open, searchQuery]);
  useEffect(() => {
    fetchAllUsers();
  }, []);
  useEffect(()=>{
    
  }, [suggestions])
  return (
    <>
      <div
        className="flex flex-row jutify-end rounded-xl p-2 hover:cursor-pointer hover:bg-[#36323270]"
        onClick={() => setOpen(true)}
      >
        +
      </div>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        className={"backdrop-blur"}
        contentClassName={"p-2 backdrop-blur bg-transparent max-h-[50%] w-[30%]"}
      >
        <div className="flex flex-col w-full">
          <div className="flex flex-col w-full">
            <input
              className="w-full rounded-xl outline-none border-2 border-transparent hover:border-[#585858]"
              placeholder="Add User"
              type="text"
              name="search-user"
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
          {searchQuery && searchQuery.length != 0 ? (
            <>
              <div
                className="flex flex-col overflow-y-scroll p-4"
                style={{ maxHeight: "30vh" }}
              >
                {suggestions &&
                  suggestions.map((elem, key) => (
                    <div
                      className="flex flex-row py-4 px-4 justify-center items-center hover:cursor-pointer hover:bg-[#36323270] hover:rounded-xl"
                      key={key}
                    >
                      <div
                        className="flex w-full  justify-start"
                        onClick={() => {
                            addUser(elem);
                          console.log("okkkkkk");
                        }}
                      >
                        <div className="w-1/4">
                          <img
                            src={elem.avatarurl}
                            alt=""
                            srcSet=""
                            className="object-cover h-12 w-12 rounded-full"
                          />
                        </div>
                        <div className="flex flex-row">
                          <div className="ml-3 text-lg font-semibold">
                            {elem.displayname}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
              <div className="flex flex-col w-full h-full">
                <div className="flex flex-row h-full justify-center py-2 items-center">
                  <button className="m-0 flex justify-center items-center bg-[#212121] hover:bg-[#313131] py-3 px-10 w-10">
                    ADD
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
            <div
              className="flex flex-col overflow-y-scroll p-4"
              style={{ maxHeight: "30vh" }}
            >
              {allUsers &&
                allUsers.map((elem, key) => (
                  <div
                    className="flex flex-row py-4 px-4 justify-center items-center hover:cursor-pointer hover:bg-[#36323270] hover:rounded-xl"
                    key={key}
                  >
                    <div
                      className="flex w-full  justify-start"
                      onClick={() => {
                        addUser(elem);
                        // setSearchQuery("");
                        // setOpen(false);
                        console.log("okkkkkk");
                      }}
                    >
                      <div className="w-1/4">
                        <img
                          src={elem.avatarurl}
                          alt=""
                          srcSet=""
                          className="object-cover h-12 w-12 rounded-full"
                        />
                      </div>
                      <div className="flex flex-row">
                        <div className="ml-3 text-lg font-semibold">
                          {elem.displayname}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </>
          )}
        </div>
      </Modal>
    </>
  );
};

export default ModalSearch;
