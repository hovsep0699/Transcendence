import React from "react";
import Layout from "./Layout";

const LayoutProvider = ({children, auth = true, scrollable = false, zIndex = 1}) => {
    return (
        <Layout auth={auth} scrollable={true}>
            <div className="relative flex flex-col h-full justify-center">
                {/* <img className="absolute w-full h-full object-cover mix-blend-overlay" src={photo} alt="" /> */}
                <img className="absolute w-full h-full object-cover" style={{opacity: "0.5"}}   src="https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/129325364/original/afaddcb9d7dfaaf5bff7ef04101935814665ac16/design-an-attractive-background-for-your-website.png" alt="" />
                <div className="flex flex-col justify-center items-center h-full" style={{zIndex: zIndex}}>
                {children}
                </div>
            </div>
        </Layout>
    )
};

export default LayoutProvider;