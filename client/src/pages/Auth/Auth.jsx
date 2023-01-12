import React, { useEffect } from 'react'
import { useState } from 'react'
import Logo from '../../img/logo.png'
import './Auth.css'
import {useDispatch, useSelector} from 'react-redux';
import { logIn, signUp } from '../../actions/AuthAction';

const Auth = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state)=>state.authReducer.loading);

  const [isSignUp, setIsSignUp] = useState(true);
  const [error, setError] = useState("");
  const [ready, setReady] = useState(false);

  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    username: "",
    password: "",
    confirmpassword: "",
    profilePicture: "https://res.cloudinary.com/princedhameliya/image/upload/v1669662212/Default/defaultProfile_tvonuv.png",
    coverPicture: "http://res.cloudinary.com/princedhameliya/image/upload/v1669663981/SocialMedia/oeqbfkgzegpktmccs3ei.jpg",
  });

  useEffect(() => {
    if(isSignUp && data.firstname!=="" && data.lastname!=="" && data.username!=="" && data.password!=="" && data.confirmpassword!==""){
      setReady(true);
    }
    else if(!isSignUp && data.username!=="" && data.password!==""){
      setReady(true);
    }
    else{
      setReady(false);
    }
  },[data,isSignUp])

  const handleChange = (e) => {
    setData({...data, [e.target.name]: e.target.value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(isSignUp){
        if(data.password === data.confirmpassword){
          const res = await dispatch(signUp(data))
          setError(res?.response?.data?.message);
        } else{
          setError("Confirm Password Is Not Same");
        }
    }
    else{ 
        const res = await dispatch(logIn(data))
        setError(res?.response?.data?.message);
    }
  }

  const resetForm = () => {
    setError("");
    setData({
        firstname: "",
        lastname: "",
        username: "",
        password: "",
        confirmpassword: "",
        profilePicture: "https://res.cloudinary.com/princedhameliya/image/upload/v1669662212/Default/defaultProfile_tvonuv.png",
        coverPicture: "http://res.cloudinary.com/princedhameliya/image/upload/v1669663981/SocialMedia/oeqbfkgzegpktmccs3ei.jpg",
    });
  }
  
  return (
    <div className="Auth">
        {/* left side */}
        <div className="AuthLeft">
            <img src={Logo} alt="" />
            <div className="WebName">
                <h1>My App</h1>
                <h6>Explore the ideas throughout the world</h6>
            </div>
        </div>

        {/* right side */}
        <div className="AuthRight">
            <form className="InfoForm AuthForm" onSubmit={handleSubmit} >
                <h3>{isSignUp ? "Sign Up" : "Log In"}</h3>

                {isSignUp && (
                    <div>
                        <input type="text" name="firstname" value={data.firstname} placeholder="First Name" className="InfoInput" onChange={handleChange} />
                        <input type="text" name="lastname" value={data.lastname} placeholder="Last Name" className="InfoInput" onChange={handleChange} />
                    </div>
                )}

                <div>
                    <input type="text" name="username" autoComplete='username' value={data.username} placeholder="Username" className="InfoInput" onChange={handleChange} />
                </div>

                <div>
                    <input type="password" name="password" autoComplete='new-password' value={data.password} placeholder="Password" className="InfoInput" onChange={handleChange} />
                    { isSignUp && <input type="password" autoComplete='current-password' value={data.confirmpassword} name="confirmpassword" placeholder="Confirm Password" className="InfoInput" onChange={handleChange} /> }
                </div>

                <span style={{display: (error==="") ? "none" : "block", color: "red", fontSize: "12px", alignSelf: "flex-end", marginRight: "5px"}}>
                    * {error}
                </span>

                <div className="SwitchAuth">
                    <span style={{fontSize: "12px", cursor: "pointer"}} onClick={()=>{setIsSignUp((prev)=>!prev); resetForm()}}  >{isSignUp ? "Already have an account. Login!" : "Don't have an account? SignUp!"}</span>
                    <button className="button InfoButton" type="submit" disabled={(!ready || loading)}>{loading ? "Loading..." : (isSignUp ? "Sign Up" : "Log In")}</button>
                </div>
            </form>
        </div>

    </div>
  )
};

export default Auth