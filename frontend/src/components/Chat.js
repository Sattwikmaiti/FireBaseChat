import React,{useContext} from 'react'
import "./styles.css"

import Messages from "./Messages.js";
import { ChatContext } from "../Context/ChatContext";
import Input from "./Input";
const Chat = () => {
  const { data } = useContext(ChatContext);
  console.log(data)
  return (
    <div className="chat">
      <div className="chathead">
        <div className="chaticon">
         <img src= {data.user?.photoURL} style={{height:'2rem',width:'2rem'}} />
        </div>
        <div className="chaticon">
          {data.user?.displayName}
        </div>
      </div>
      
        <Messages />
     
    
      <Input />
    </div>
  )
}

export default Chat
