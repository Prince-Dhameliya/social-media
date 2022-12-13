import "./App.css"
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Home from './pages/Home/Home'
import Auth from './pages/Auth/Auth'
import Profile from "./pages/Profile/Profile";
import { useEffect, useState } from "react";
import AppleBootupScreen from "./Prince/AppleBootupScreen/AppleBootupScreen";

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

        {!isLoad && <div className="App">
            <div className="blur" style={{top: '-12%', right: '0'}}></div>
            <div className="blur" style={{top: '36%', left: '-8rem'}}></div>
            <Routes>
              <Route path="/" element={user ? <Navigate to = "home" /> : <Navigate to = "auth" />} />
              <Route path="/home" element={user ? <Home /> : <Navigate to = "../auth" />} />
              <Route path="/auth" element={user ? <Navigate to = "../home" /> : <Auth />} />
              <Route path="/profile/:id" element={user ? <Profile /> : <Navigate to = "../auth" />} />
            </Routes>
        </div>}
    </>
  );
}

export default App;
