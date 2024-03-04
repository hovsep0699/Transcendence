import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ip } from "./utils/ip";
import LayoutProvider from "./LayoutProvider";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import Modal from "./Chat/Modal";
import "./styles/signin.css"
import { setUser } from "./redux";
import { SetStatus } from "./Ft_Auth";

const TwoFactorProvider = ({user}) => {
  console.log(user, "===================================");
  
  const currentUser = useSelector((state: AppState) => state.user);
  const dispatch = useDispatch();
  const [otpPin, setOtpPin] = useState("");
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [verified, setVerified] = useState(false);
  const [errMSG, setErrMSG] = useState("");
  // const [open, setOpen] = useState(false);

  const checkTwoFactor = async() => {
    if (!user) return;
    const params = {
      userid: user.id,
      pin: otpPin,
    };
    await SetStatus(user.id,1);
    fetch(`${ip}:7000/twofactor/check`, {
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

        return response.json();
      })
      .then((data) => {
        if (data.verify)
        {
          //SetStatus(user.id,0);
          dispatch(setUser(null));
          dispatch(setUser(user));
          navigate("/home", {replace: true});
        }
        setVerified(data.verify);
        if (!data.verify) setErrMSG("One time password is wrong. Try again.");
        console.log("enabled?");
        console.log(data);
      })
      .catch((error) => {
        console.log("TWOFACTORERR");

        // Handle any errors that occur during the request
        console.log(error);
      });
  };
  const generateOtp = () => {
    if (!user) return;
    const params = {
      userid: user.id,
    };
    fetch(`${ip}:7000/otp/generate`, {
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

        return response.json();
      })
      .then((data) => {
        console.log("enabled?");
        console.log(data);
      })
      .catch((error) => {
        console.log("TWOFACTORERR");

        // Handle any errors that occur during the request
        console.log(error);
      });
  };
  const sendOTPRequest = () => {
    generateOtp();
    setOpen(true);
  };
  const handleSubmit = () => {
    checkTwoFactor();
    setOtpPin("");
  };
  useEffect(() => {
    console.log("eqa string", user);
    
    if (currentUser || verified)
    {
      navigate("/home", { replace: true });
    }
    // console.log("tfo", user);
  });
  return (
    <LayoutProvider auth={false} zIndex={4}>
      {/* <Modal
            className={"backdrop-blur-md"}
            contentClassName={"bg-transparent"}
            open={true}
        > */}
    <div className=" eye shape-1 text-slate-700 text-3xl flex justify-center items-center">
    </div>
    <div className="eye shape-2 text-slate-800 text-3xl flex justify-center items-center">
    </div>
    <div className=" eye shape-3 text-slate-700 text-3xl flex justify-center items-center">
    </div>
    <div className="eye shape-4 text-slate-800 text-3xl flex justify-center items-center">
    </div>
      <div
        className={`fixed top-[30%] border-2 shadow rounded-xl border-[#181818] left-[30%] max-h-xl max-w-xl ${
          open ? "h-[50%]" : "h-1/4"
        } w-1/2 flex flex-col backdrop-blur-md  pt-10 w-50`}
      >
        <div className="flex flex-col h-full">
          <div className="flex self-center min-h-[10%] text-red-900">
            {!verified ? <>{errMSG} </> : <></>}
          </div>
          <div className="flex pt-5 px-5">
            Two-Factor authentication switched on for {user.twofactoremail}{" "}
            account. Please generate one time password.
          </div>
          <div
            className={`flex flex-col  px-5 absolute bottom-8 ${
              open ? "self-center" : ""
            }`}
          >
            <button
              onClick={sendOTPRequest}
              className={`flex w-32 p-2 bg-[#212121] self-center items-center justify-center border-2 border-transparent hover:bg-[#313131] hover:border-[#313131] rounded-xl text-white hover:cursor-pointer ${
                open ? "hidden" : ""
              }`}
            >
              Get Code
            </button>
            {open ? (
              <div className="flex flex-col w-full">
                <div className="flex self-center py-4">
                  OTP Code sent to {user.twofactoremail}. Please check your
                  email.
                </div>
                <div className="flex self-start">
                  <input
                    type="text"
                    name="pin"
                    id=""
                    value={otpPin}
                    placeholder="OTP Code"
                    className="bg-[#212121] border-2 border-transparent hover:bg-[#313131] hover:border-[#313131] rounded-xl text-white p-2"
                    onChange={(e) => {
                      const re = /^[0-9\b]+$/;

                      if (
                        (e.target.value === "" || re.test(e.target.value)) &&
                        e.target.value.length <= 6
                      )
                        setOtpPin(e.target.value);
                    }}
                  />
                </div>
                <div className="flex self-end">
                  <button
                    onClick={handleSubmit}
                    className={`flex w-32 p-2 bg-[#212121] justify-center items-center border-2 border-transparent hover:bg-[#313131] hover:border-[#313131] rounded-xl text-white hover:cursor-pointer`}
                  >
                    Send
                  </button>
                </div>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
      {/* </Modal> */}
    </LayoutProvider>
  );
};

export default TwoFactorProvider;
