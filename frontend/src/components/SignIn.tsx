import React, { useEffect, useState } from "react";
import photo from "@SRC_DIR/assets/images/pong.jpg";
import { Link, useNavigate } from "react-router-dom";
import "./styles/signin.css"; // Import the CSS file for styling
import { ip } from "./utils/ip";
import { useSelector } from "react-redux";

/*import React from 'react';

const LoginPage = () => {
  const handleGoogleSignIn = () => {
    // Implement the logic for Google sign-in here
  };

  const handle42SignIn = () => {
    // Implement the logic for 42 sign-in here
  };

  return (
    <div className="parallax-container">
      <div className="parallax-content">
        <h1>Welcome to the Login Page!</h1>
        <button onClick={handleGoogleSignIn>Sign in with Google</button>
        <button onClick={handle42SignIn}>Sign in with 42</button>
      </div>
    </div>
  );
};

export default LoginPage; 



*/

function getUrl() {
  console.log("havayiiiiii", process.env.CLIENT_ID);

  const rootUrl = "https://accounts.google.com/o/oauth2/v2/auth";
  const option = {
    redirect_uri: process.env.GOOGLE_REDIRECT_URI as string,
    client_id: process.env.CLIENT_ID as string,
    access_type: "offline",
    response_type: "code",
    prompt: "consent",
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ].join(" "),
  };
  const qs = new URLSearchParams(option);
  return `${rootUrl}?${qs.toString()}`;
}

const SignIn = () => {
  const [stopGoogle, setStopGoogle] = useState(false)
  const [stopft, setStopFt] = useState(false)
  const user = useSelector(state=>state.user)
  const navigate = useNavigate();
  const defaultGooglePos = {
    top: 50,
    left: 50
  }
  const defaultFtPos = {
    top: 60,
    left: 20
  }
  const [ftStyle, setFtStyle] = useState(defaultFtPos)
  const [googleStyle, setGoogleStyle] = useState(defaultGooglePos)
  const handleGoogleSignIn = () => {
    // if (user) navigate("/home", {replace: true});
    // Implement the logic for Google sign-in here
  };

  // const handle42SignIn = () => {
  //   if (user) navigate("/twofactor", {replace: true});
  //   // Implement the logic for 42 sign-in here
  // };
  function getRandom(min, max) {
    return Math.random() * (max - min) + min;
  }
  
  const runAway42 = ()=> {
    
    if (stopft)
    {
      // setFtStyle(defaultFtPos)
      return ;
    }
    console.log('42 runs');
    let left =  getRandom(-500, 500) + ftStyle.top;
    let top = getRandom(-500, 500) + ftStyle.left;
    top = (top - ftStyle.top) < 200 ? top + 100 : top;
    left = (left - ftStyle.left) < 200 ? left + 100 : left;

    top = (top < 0) ? 0 : top;
    top = (top > 500) ? 500 : top;
    left = (left < 0) ? 0 : left;
    left = (left > 500) ? 500 : left;
    const newStyle = {
      top: top,
      left: left
    }
    setFtStyle(newStyle);
  }
  const runAwayGoogle = ()=> {
    
    
    if (stopGoogle)
    {
      return;

    }

    console.log('Google runs');
    let left =  getRandom(-500, 500) + ftStyle.top;
    let top = getRandom(-500, 500) + ftStyle.left;
    top = (top - ftStyle.top) < 200 ? top + 100 : top;
    left = (left - ftStyle.left) < 200 ? left + 100 : left;

    top = (top < 0) ? 0 : top;
    top = (top > 500) ? 500 : top;
    left = (left < 0) ? 0 : left;
    left = (left > 500) ? 500 : left;
    const newStyle = {
      top: top,
      left: left
    }

    setGoogleStyle(newStyle);
  }
  useEffect(()=>{
    window.addEventListener("keydown", ()=>{
      setStopGoogle(true);
      setStopFt(true);
    })
  })
 useEffect(()=>{
  if (user) navigate("/home", {replace: true});
  console.log("StGoo: ", stopGoogle);
  console.log("stdpp: ", stopft);
  

 }, [ftStyle, stopGoogle, stopft])
  const ft_link =
    process.env.redirect_link ??
    "https://api.intra.42.fr/oauth/authorize?client_id=u-s4t2ud-ba3aea4480c6fd2f33eb1c38078b70eb56bfc32316df9eed3ce24c731b6b48c1&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fft_auth&response_type=code";

  return (
    <>
      <div className="flex flex-col h-full overflow-hidden min-h-full max-h-full text-[#aaaaaa] bg-[#181818] w-full">
        <div className="flex flex-row sticky shadow bg-[#212121] top-0 z-[2] border-2 border-[#0f0f0f] justify-around py-3"></div>
        <div className="flex flex-col h-full">
          <div className="relative flex flex-col h-full justify-center">
            {/* <img className="absolute w-full h-full object-cover mix-blend-overlay" src={photo} alt="" /> */}
            <img
              className="absolute w-full h-full object-cover mix-blend-overlay"
              style={{ opacity: "0.5" }}
              src="https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/129325364/original/afaddcb9d7dfaaf5bff7ef04101935814665ac16/design-an-attractive-background-for-your-website.png"
              alt=""
            />
            <div className="grid place-items-center inline-flax">
              <div className="signin">
                <div className="background">
                  <form onSubmit={handleGoogleSignIn}>
                    <div className="shape" style={{top: googleStyle.top + 'px', left: googleStyle.left + 'px'}}
                      onMouseEnter={runAwayGoogle}
                    >
                      <Link
                        to={getUrl()}
                        >
                        {" "}
                        <img
                          src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                          alt=""
                          srcSet=""
                        />{" "}
                      </Link>
                    </div>
                    <div className="eye shape-2 text-slate-500 text-3xl flex justify-center items-center">
                      Login
                    </div>
                    <div className="eye shape-1 text-slate-500 text-3xl flex justify-center items-center">
                      Here
                    </div>
                    <div className="shape"
                        style={{top: ftStyle.top + 'px', left: ftStyle.left + "px"}}
                        onMouseEnter={runAway42}
                    >
                      <Link
                        to={ft_link}
                      >
                        <img
                          src="https://upload.wikimedia.org/wikipedia/commons/8/8d/42_Logo.svg"
                          alt=""
                          srcSet=""
                        />{" "}
                      </Link>
                    </div>
                  </form>
                </div>

                {/* <h3>Login Here</h3>
                    <div className="social">
                      <div className="go rounded-full">
                      <Link to={getUrl()}> <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="" srcSet="" /> </Link>
                      </div>
                      <div className="fb">
                      <Link to={ft_link}><img src="https://upload.wikimedia.org/wikipedia/commons/8/8d/42_Logo.svg" alt="" srcSet="" /> </Link>
                      </div>
                    </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
