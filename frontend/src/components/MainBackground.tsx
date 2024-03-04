import React from "react"
import photo from '@SRC_DIR/assets/images/pong.jpg';

const MainBackground = () => {
    return (
        <div>
            <div className="mt-8 relative w-full h-screen">
                <img className="absolute w-full h-full object-cover mix-blend-overlay" src={photo} alt="/" />

            </div>
        </div>
    )
}

export default MainBackground;
