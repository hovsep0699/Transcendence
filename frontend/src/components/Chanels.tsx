import React from "react"
import  Layout  from "./Layout";
import profile from '@SRC_DIR/assets/images/profile.svg';
import { useState } from "react"
import ChatMsg from "./ChatMsg";
import { IMassage } from "./utils/index";
import { socket } from "./Socket";

const generateRandomString = (length=6) => Math.random().toString(20).substr(2, length);

let username  : string | null = "";
username = generateRandomString(8);

// read room in querystring
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const room = urlParams.get('room'); // /?room=white

window.onload = function () {
    socket.emit('room', room);
};

const Chanels = () => {

    const [textMessages, setTextMessages] = useState<IMassage[] | undefined>(undefined);
    const [message, setMessage] = useState("");

    const sendMessage = async (event) => {
        event.preventDefault();

            let msg = message;
            msg =  msg.replace(/(<([^>]+)>)/gi, "");
            console.log("sending msg: " + msg + " from " + username);
            socket.emit('channels', {"msg" : msg, "username" : username, "room": room});
            
        setMessage("");
    }

    socket.on('channels', function (obj) {
        if (obj.msg !== '') {
            setTextMessages([...(textMessages || []), 
                {msg: obj.username + ": " + obj.msg, username: obj.username}])
        };
        console.log(obj.username + ": " + obj.msg);
    });

    socket.on('participants', function(count) {
        console.log("online :" + count);
    });

    return (
        <Layout>
            <div className="mt-8 container mx-auto shadow-lg rounded-lg">
                <div className="px-5 py-5 flex justify-between items-center bg-white border-b-2">
                <div className="mt-8 font-semibold text-2xl">Channels List</div>
                <div className="mt-8 font-semibold text-2xl">Members List</div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 flex flex-row justify-between bg-white">

                <div style={{ height: '600px' }}
                    className="flex flex-col border-r-2 overflow-y-auto">

                    <div className="border-b-2 py-4 px-2">
                    <input
                        type="text"
                        placeholder="search channel"
                        className="py-2 px-2 border-2 border-gray-200 rounded-2xl w-full"
                    />
                    </div>

                    <div className="flex flex-row py-4 px-2 items-center border-b-2">

                    <div className="flex w-full justify-center items-center">
                        <div className="w-1/2 py-4 px-2">
                        <input
                            type="text"
                            placeholder="channel name"
                            className="py-2 border-2 border-gray-200 rounded-2xl "
                        />
                        </div>
                        <div className="w-1/2 text-lg font-semibold ml-14">
                            <button className="bg-white hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                            Add
                            </button>
                        </div>
                    </div>
                    </div>

                    <div className="flex flex-row py-4 px-2 justify-center items-center border-b-2">

                    <div className="w-full">
                        <div className="text-xl font-semibold">C++ group</div>
                    </div>
                    </div>
                    <div className="flex flex-row py-4 px-2 items-center border-b-2 border-l-4 border-blue-400">

                    <div className="w-full">
                        <div className="text-lg font-semibold">About Our Game</div>
                    </div>
                    </div>
                    <div className="flex flex-row py-4 px-2 items-center border-b-2">

                    <div className="w-full">
                        <div className="text-lg font-semibold">DevOps</div>
                    </div>
                    </div>
                    <div className="flex flex-row py-4 px-2 items-center border-b-2">

                    <div className="w-full">
                        <div className="text-lg font-semibold">Questions</div>
                    </div>
                    </div>

                </div>

                <div  className="col-span-2 px-5 flex flex-col justify-between">
                    <div style={{ height: '500px' }} className="overflow-y-auto flex flex-col mt-5">
                        {textMessages && textMessages.map((buff) => (
                            <ChatMsg
                                massage = {buff.msg}
                                user = {buff.username == username}
                            />
                        ))}
                    </div>
                    <div className="py-5">
                        <form onSubmit={(event) => sendMessage(event)}>
                            <input 
                                className="w-10/12  bg-gray-300 py-5 px-3 rounded-xl"
                                type="text" 
                                placeholder="your message..." 
                                aria-label="your message..." 
                                aria-describedby="basic-addon2" 
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                id="msg" required
                            />
                            <button 
                                id="sendMsg" 
                                type="submit"
                                className="w-2/12 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-5 px-4 rounded-xl">
                                Send
                            </button>
                        </form>
                    </div>
                </div>


                <div  style={{ height: '600px' }}
                    className="overflow-y-auto border-l-2 px-5">

                    <div className="flex w-full border-b-2 justify-center items-center">
                        <div className="w-1/2 py-4 px-2">
                        <input
                            type="text"
                            placeholder="search members"
                            className="py-2 border-2 border-gray-200 rounded-2xl "
                        />
                        </div>
                        <div className="w-1/2 text-lg font-semibold ml-24">
                            <button className="bg-white hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                            Invite
                            </button>
                        </div>
                    </div>

                        <div className="flex flex-row py-4 px-2 justify-center items-center border-b-2">
                            <div className="w-1/5 ml-1">
                                <img
                                src="https://source.unsplash.com/_7LbC5J-jw4/600x600"
                                className="object-cover h-12 w-12 rounded-full"
                                alt=""
                                />
                            </div>
                            <div className="w-5/12 ml-2 mr-7">
                                <div className="text-lg font-semibold">Arno Baboomian</div>
                                <div className="text-gray-500">arbaboom</div>
                            </div>
                            <div className="w-1/5 ml-2 text-lg font-semibold"> 
                            <button className="bg-white hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                                Kick
                            </button>
                             </div>
                        </div>

                        <div className="flex flex-row py-4 px-2 justify-center items-center border-b-2">
                        <div className="w-1/5 ml-1">
                            <img
                            src="https://source.unsplash.com/otT2199XwI8/600x600"
                            className="object-cover h-12 w-12 rounded-full"
                            alt=""
                            />
                        </div>
                        <div className="w-5/12 ml-2 mr-7">
                            <div className="text-lg font-semibold">Arman Kazaryan</div>
                            <div className="text-gray-500">armanarut</div>
                        </div>
                        <div className="w-1/5 ml-2 text-lg font-semibold"> 
                            <button className="bg-white hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                                Kick
                            </button>
                        </div>
                        </div>

                        <div className="flex flex-row py-4 px-2 justify-center items-center border-b-2">
                        <div className="w-1/5 ml-1">
                            <img
                            src="https://source.unsplash.com/L2cxSuKWbpo/600x600"
                            className="object-cover h-12 w-12 rounded-full"
                            alt=""
                            />
                        </div>
                        <div className="w-5/12 ml-2 mr-7">
                            <div className="text-lg font-semibold">Gevorg Amirjanyan</div>
                            <div className="text-gray-500">gamirjan</div>
                        </div>
                        <div className="w-1/5 ml-2 text-lg font-semibold"> 
                            <button className="bg-white hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                                Kick
                            </button>
                        </div>
                        </div>

                        <div className="flex flex-row py-4 px-2 justify-center items-center border-b-2">
                        <div className="w-1/3">
                            <img
                            src={profile}
                            className="object-cover h-12 w-12 rounded-full"
                            alt=""
                            />
                        </div>
                        <div className="w-5/12 ml-2 mr-7">
                            <div className="text-lg font-semibold">Mikhayil Arzumanyan</div>
                            <div className="text-gray-500">miarzuma</div>
                        </div>
                        <div className="w-1/5 ml-2 text-lg font-semibold"> 
                            <button className="bg-white hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                                Kick
                            </button>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Chanels;