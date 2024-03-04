import React from "react"
import LayoutProvider from "./LayoutProvider"

const NotFound = ()=>{
    return(
        <LayoutProvider scrollable={false}>
            <div className="flex flex-col justofy-center items-center text-5xl">
                404 Not Found
            </div>
        </LayoutProvider>
    )
}

export default NotFound;