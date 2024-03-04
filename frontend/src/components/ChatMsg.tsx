import React, { Component } from "react"
import { useSelector } from "react-redux";

//const user = useSelector((state: AppState) => state.user);
class ChatMsg extends React.Component<any, any> {
    render() {
   /*  console.log("useerrrr",user);
    if(user == null)
    {
        return null
    } */

    if (this.props.user)
        return(
            <div className="flex justify-end mb-4">
                <div
                className="mr-2 py-3 px-4 bg-gray-200 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-black"
                >
                {this.props.massage}
                </div>
                <img
                src={this.props.user.avatarurl}
                className="object-cover h-8 w-8 rounded-full"
                alt=""
                />
            </div>
        )
    else
        return(
            <div className="flex justify-start mb-4">
                <img
                src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
                className="object-cover h-8 w-8 rounded-full"
                alt=""
                />
                <div
                className="ml-2 py-3 px-4 bg-gray-400 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white"
                >
                {this.props.massage}
                </div>
            </div>
        )
}}

export default ChatMsg;