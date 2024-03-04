import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux";
import Modal from "../Chat/Modal";
import { ip } from "../utils/ip";

function Nick({ open, onClose }) {
  const [inputValue, setInputValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const user = useSelector((state: AppState) => state.user);
  const dispatch = useDispatch();

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

   const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage("");
    if(inputValue.length < 3 || inputValue.length > 20 || inputValue.trim() == "")
    {
      setErrorMessage("Nickname must be between 3 and 20 characters");
      return;
    }
    try {
      const response = await fetch(`${ip}:7000/users/nickname`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userid: user.id, nickname: inputValue}),
      });
        console.log(response.status != 200);
        if(response.status != 200)
        {
          setErrorMessage("this nickname is already taken");
          return;
        }
        dispatch(setUser({ ...user, displayname: inputValue }));
        onClose();
    
    } catch (error) {
      console.error("================>", error);
      setErrorMessage("An error occurred =>" + error);
    }
  };

  const handleCancel = () => {
    onClose();
  };

  if (!open) {
    return null; // Don't render the modal if modalOpen is false
  }

  return (
    // <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75">
    <Modal contentClassName={"bg-black w-full max-w-md mx-4 px-8 py-6 rounded-lg border-2 border-[#585858]"} open={open} onClose={onClose}>

        <h2 className="text-2xl text-white mb-4">Modal Title</h2>
        {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
        <form onSubmit={handleSubmit}>
          <div className="relative mb-4">
            <input
              type="text"
              className="bg-gray-800 text-white py-2 px-4 w-full rounded-lg focus:outline-none  focus:ring-2 focus:ring-green-500"
              placeholder="Enter a value"
              value={inputValue}
              onChange={handleChange}
            />
            <div className="absolute inset-0 border-2 border-transparent rounded-lg animate-pulse pointer-events-none"></div>
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg w-full mr-2"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg w-full"
            >
              Submit
            </button>
          </div>
        </form>
    </Modal>
  );
}

export default Nick;
