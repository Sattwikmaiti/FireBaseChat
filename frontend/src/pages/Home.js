import React from 'react'
import "./styles.css"
import Chat from '../components/Chat'
import Sidebar from '../components/Sidebar'

const Home = () => {
 
  return (
    <div>
      
       <div className='home'>
      <div className="container">
        <Sidebar />
        <Chat />
      </div>
    </div>
    </div>
  )
}

export default Home
