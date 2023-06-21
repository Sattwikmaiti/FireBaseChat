import React,{useState,useEffect,useContext} from 'react'
import "./styles.css"
import person1 from "../images/person1.jpg";
import person2 from "../images/person2.jpg";
import person3 from "../images/person3.jpg";
import person4 from "../images/person4.jpg";
import person5 from "../images/person5.jpg";
import person6 from "../images/person6.jpg";
import { AuthContext } from "../Context/AuthContext";
import { doc, onSnapshot } from "firebase/firestore";
import { ChatContext } from '../Context/ChatContext';
import Moment from 'react-moment';
import moment from 'moment'

import {db } from "../Firebase"
const Chats = () => {
  Moment.globalFormat = 'D MMM YYYY';
  const { currentuser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);
const data=[
 /* {
    id:1,
    img:person1,
    name:"person1",
    lastmsg:"HEllo person1" ,
    lastmsgtime:'yesterday'
  },
  {
    id:2,
    img:person2,
    name:"person1",
    lastmsg:"HEllo person1" ,
    lastmsgtime:'yesterday'
  },
  {
    id:3,
    img:person3,
    name:"person1",
    lastmsg:"HEllo person1" ,
    lastmsgtime:'yesterday'
  },
  {
    id:4,
    img:person4,
    name:"person1",
    lastmsg:"HEllo person1" ,
    lastmsgtime:'yesterday'
  },
  {
    id:5,
    img:person5,
    name:"person1",
    lastmsg:"HEllo person1" ,
    lastmsgtime:'yesterday'
  },
  {
    id:6,
    img:person5,
    name:"person1",
    lastmsg:"HEllo person1" ,
    lastmsgtime:'yesterday'
  },
  {
    id:7,
    img:person5,
    name:"person1",
    lastmsg:"HEllo person1" ,
    lastmsgtime:'yesterday'
  },
  */
]
  const [chats,setchats]=useState([])
  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentuser.uid), (doc) => {
        setchats(doc.data());
      });

      return () => {
        unsub();
      };
    };

    currentuser.uid && getChats();
  }, [currentuser.uid]);
  const handleSelect = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u });
  };
console.log(Object.entries(chats))
  return (
    <div>

      <div className="chats">
        {
          Object.entries(chats).map((e)=>
          {
console.log(e)
            return (
              <div className="chatshort" key={e[0]} onClick={() => handleSelect(e[1].userInfo)}>
                      <div className="msgpart">
                        <div className="msgimg">
                   <img src={e[1].userInfo.photoURL} alt=""/>
                        </div>
                        <div className="msgdetails">
                          <div className="toppart">
                            <div className="msgdetailsname">
                                    {e[1].userInfo.displayName}
                            </div>
                            <div className="displaytime">
                            {/*<Moment unix>{e[1].date}</Moment>*/}
                            {moment.unix(e[1].date).format('MM-DD HH:mm:ss')}
                            </div>
                           
                          </div>
                          <div className="downpart">
                            {e[1].lastMessage?.text} 
                            
                            
                           
                          </div>
                        </div>
                      </div>


                </div>
            )

          })
        }
      </div>
      
    </div>
  )
}

export default Chats
