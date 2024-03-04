import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ip } from "./utils/ip";

const ChatComponent = () => {
  const [chatList, setChatList] = useState([]);

  const [selectedChat, setSelectedChat] = useState(null);
  const [isCreatingChat, setIsCreatingChat] = useState(false);
  const [friendList, setFriendList] = useState([]);
  const [selectedFriends, setSelectedFriends] = useState([]);
  const user = useSelector((state: AppState) => state.user);

  const handleChatClick = (chat) => {
    setSelectedChat(chat);
  };

  const handleNewChatClick = () => {
    setIsCreatingChat(true);
  };

  const handleFriendSelect = (friend) => {
    setSelectedFriends([friend]);
    setIsCreatingChat(false);
    const newChat = {
      id: chatList.length + 1,
      name: friend.user.displayname,
    };
    setChatList([...chatList, newChat]);
    setSelectedChat(newChat);
  };

  useEffect(() => {
    const fetchFriends = async () => {
        fetch(`${ip}:7000/friends/${user.id}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Request failed");
          }
          return response.json(); // assuming the server returns JSON data
        })
        .then((data) => {
          setFriendList(data);
          console.log("dddddd",data);
          
        })
        .catch((error) => {
          console.log(error);
        });
    };

    if (isCreatingChat) {
      fetchFriends();
    }
    console.log("frrrr",friendList);
    
  }, [isCreatingChat]);
console.log(friendList);

return (
  <div className="flex h-screen bg-gray-100">
    <div className="w-1/5 bg-purple-900 text-white">
      <div className="flex items-center justify-between px-4 py-2 border-b border-purple-800">
        <h2 className="text-lg font-bold">Chat List</h2>
        <button
          className="w-8 h-8 bg-purple-700 text-white rounded-full flex items-center justify-center"
          onClick={handleNewChatClick}
        >
          +
        </button>
      </div>
      <div className="py-4">
        {chatList.map((chat) => (
          <div
            key={chat.id}
            className={`flex items-center px-4 py-2 cursor-pointer ${
              selectedChat?.id === chat.id ? "bg-purple-800" : ""
            }`}
            onClick={() => handleChatClick(chat)}
          >
            <div className="w-4 h-4 bg-white rounded-full mr-2"></div>
            <div className="text-sm">{chat.name}</div>
          </div>
        ))}
      </div>
    </div>
    <div className="flex-1 bg-white flex items-center justify-center">
      {selectedChat ? (
        <div className="text-purple-900">Chat with {selectedChat.name}</div>
      ) : (
        <div className="text-purple-900">No chat selected</div>
      )}
    </div>
    {isCreatingChat && (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
        <div className="bg-white w-1/2 p-4">
          <h2 className="text-lg font-bold mb-2">Select Friends</h2>
          <ul>
            {friendList.map((friend) => (
              <li
                key={friend.id}
                className={`flex items-center px-4 py-2 cursor-pointer ${
                  selectedFriends.some((selectedFriend) => selectedFriend.id === friend.id)
                    ? "bg-purple-200"
                    : ""
                }`}
                onClick={() => handleFriendSelect(friend)}
              >
                <div className="w-4 h-4 bg-purple-900 rounded-full mr-2"></div>
                <div>{friend.user.displayname}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )}
  </div>
);

};

export default ChatComponent;
