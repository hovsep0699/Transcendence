import React from "react";
import { useRef } from "react";

const Modal = ({open, onClose = null, contentClassName = null, className = null, children}) =>{
    const modalRef = useRef();

    const handleOutsideClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        if (onClose)
            onClose();
      }
    };
  
    // const handleEscapeKey = (event) => {
    //   if (event.keyCode === 27) {
    //     onClose();
    //   }
    // };
  
    // const handleModalClick = () => {
    //   onClose();
    // };
    return (
        open ? (
        <div 
            className={`fixed flex justify-center items-center flex-col h-screen w-screen top-0 left-0 ${className ? className :  "bg-[rgba(0,0,0,0.3)]"}`} style={{zIndex: 200}}
            onClick={handleOutsideClick}
        >
            <div 
            className={`flex flex-col min-w-[2%] min-h-[20%] rounded-xl items-center shadow-[#212121] shadow ${contentClassName ? contentClassName : "bg-white"}`}
            ref={modalRef}
            >
                {children}
            </div>
        </div>

        ) : (<></>)
    )
}

export default Modal;