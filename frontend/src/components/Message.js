import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../Context/AuthContext";
import { ChatContext } from "../Context/ChatContext";

import "./styles.css"
import person5 from "../images/person5.jpg";
import person6 from "../images/person6.jpg";
const Message = ({prop}) => {
  const { currentuser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
//console.log(prop.senderId === currentuser.uid)
  return (
    <div className="message "  id={`${prop.senderId === currentuser.uid && "owner"}`}>
      <div className="messageimage">
        <img  src={
            prop.senderId === currentuser.uid
              ? currentuser.photoURL
              : data.user.photoURL
          }
          alt="" style={{height:'3rem',width:'3rem',borderRadius:'40px'}} />
      </div>
      <div className="content">
        {prop.text &&  <div className="messagecontent">
        {prop.text}
      </div>}
     
   <div className="imagemessage">
    {prop.img &&  <img src={prop.img} style={{height:'10rem',width:'8rem',borderRadius:'10px'}}/>}
   </div>
      </div>
     
      

      
    </div>
  )
}

export default Message
