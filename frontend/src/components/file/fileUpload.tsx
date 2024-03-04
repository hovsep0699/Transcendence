import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux";
import Modal from "../Chat/Modal";
import { ip } from "../utils/ip";

function FileUploadForm({ open, onClose }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const user = useSelector((state: AppState) => state.user);
  const dispatch = useDispatch();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewUrl(null);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (selectedFile) {
      const formData = new FormData();
      formData.append("image", selectedFile);
      formData.append("userid", user.id);

      fetch(`${ip}:7000/users/avatar`, {
        method: "POST",
        body: formData,
      })
        .then((response) => {
          if (response.ok) return response.json();
          throw new Error("file upload failed");
        })
        .then((data) => {
          // Handle the response from the server
          dispatch(setUser({ ...user, avatarurl: data.avatarUrl }));
          console.log(data.avatarUrl, "lllllllllllllllll", user);
          closeModal();
        })
        .catch((error) => {
          // Handle any error that occurred
          console.error(error);
        });
    }
  };

  const closeModal = () => {
    onClose();
    setSelectedFile(null);
    setPreviewUrl(null);
  };
  useEffect(() => {}, [selectedFile]);
  return (
    <Modal
      open={open}
      onClose={closeModal}
      contentClassName={
        "bg-gray-800 rounded p-8 max-w-md border-4 border-red-500 animate-pulse shadow-lg h-30 w-30"
      }
    >
      <h2 className="text-3xl mb-6 text-white">Upload a File</h2>
      {selectedFile ? (
        <div className="mb-6">
          <h3 className="text-xl mb-4 text-white">Selected File:</h3>
          {previewUrl ? (
            <img
              src={previewUrl}
              alt="Selected File"
              className="mb-4 max-h-60"
            />
          ) : null}
          <div className="bg-gray-700 p-4 rounded">
            <span className="font-bold text-white">{selectedFile.name}</span>
            <span className="text-gray-500"> ({selectedFile.size} bytes)</span>
          </div>
        </div>
      ) : (
        <div className="mb-6">
          <input
            type="file"
            onChange={handleFileChange}
            className="mb-2 bg-gray-700 text-white py-2 px-4 rounded"
          />
          <p className="text-gray-500">No file selected</p>
        </div>
      )}

      <div className="flex justify-end">
        <button
          type="button"
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mr-2"
          onClick={closeModal}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          onClick={handleSubmit}
          disabled={!selectedFile}
        >
          Upload
        </button>
      </div>
    </Modal>
  );
}

export default FileUploadForm;
