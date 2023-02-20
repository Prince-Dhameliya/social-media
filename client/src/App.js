import "./App.css"
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Auth from './pages/Auth/Auth'
import Profile from "./pages/Profile/Profile";
import { useEffect, useState } from "react";
import {io} from "socket.io-client";
import AppleBootupScreen from "./Prince/AppleBootupScreen/AppleBootupScreen";
const ENDPOINT = 'https://socket-server-r0w0.onrender.com';

const socket = io(ENDPOINT);
function App() {
  const user = useSelector((state)=>state.authReducer.authData);
  const [isLoad, setIsLoad] = useState(true);

  useEffect(()=>{
      setInterval(()=>{
        setIsLoad(false);
      },500)
  })

  return (
    <>
        {isLoad && <AppleBootupScreen/>}

        {!isLoad && <div id="App" className="App tap-Highlight">
            {/* <div className="blur" style={{top: '-12%', right: '0'}}></div>
            <div className="blur" style={{top: '36%', left: '-8rem'}}></div> */}
            <Routes>
              <Route path="/" element={user ? <Profile location="home" socket={socket} /> : <Navigate to = "../auth" />} />
              <Route path="/auth" element={user ? <Navigate to = "../" /> : <Auth socket={socket} />} />
              <Route path="/messages" element={user ? <Profile location="messages" socket={socket} /> : <Navigate to = "../auth" />} />
              <Route path="/messages/:id" element={user ? <Profile location="messages" socket={socket} /> : <Navigate to = "../auth" />} />
              <Route path="/explore" element={user ? <Profile location="allposts" socket={socket} /> : <Navigate to = "../auth" />} />
              <Route path="/explore/search" element={user ? <Profile location="search" socket={socket} /> : <Navigate to = "../auth" />} />
              <Route path="/activity" element={user ? <Profile location="activity" socket={socket} /> : <Navigate to = "../auth" />} />
              <Route path="/:id" element={user ? <Profile location="profile" socket={socket} /> : <Navigate to = "../auth" />} />
              <Route path="/:id/saved" element={user ? <Profile location="saved" socket={socket} /> : <Navigate to = "../auth" />} />
              <Route path="*" element={user ? <Navigate to = "/"/> : <Navigate to = "/auth"/>} />
            </Routes>
        </div>}
    </>
  );
}

export default App;
